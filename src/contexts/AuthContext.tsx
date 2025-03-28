
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string, macAddress: string) => Promise<{ success: boolean; message: string }>;
  signUp: (email: string, password: string, userData: { full_name: string; username: string; macAddress: string }) => Promise<{ success: boolean; message: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string, macAddress: string) => {
    try {
      // Validate MAC address format
      if (!isValidMacAddress(macAddress)) {
        return { success: false, message: "Invalid MAC address format" };
      }

      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (!data.user) {
        return { success: false, message: "Login failed" };
      }

      // Verify the MAC address is associated with the user
      const { data: macData, error: macError } = await supabase
        .from('mac_addresses')
        .select('*')
        .eq('user_id', data.user.id)
        .eq('address', macAddress);

      if (macError) {
        await supabase.auth.signOut();
        return { success: false, message: "MAC address verification failed" };
      }

      if (!macData || macData.length === 0) {
        // MAC address not found for this user
        await supabase.auth.signOut();
        return { success: false, message: "Unrecognized device. Please use a registered device." };
      }

      if (macData[0].is_blocked) {
        // MAC address is blocked
        await supabase.auth.signOut();
        return { success: false, message: "This device has been blocked. Please contact support." };
      }

      // Log successful login
      await supabase.from('security_logs').insert({
        user_id: data.user.id,
        mac_address: macAddress,
        event_type: 'login',
        description: 'Successful login',
      });

      return { success: true, message: "Login successful" };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "An unexpected error occurred" 
      };
    }
  };

  const signUp = async (email: string, password: string, userData: { full_name: string; username: string; macAddress: string }) => {
    try {
      // Validate MAC address format
      if (!isValidMacAddress(userData.macAddress)) {
        return { success: false, message: "Invalid MAC address format" };
      }

      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            username: userData.username,
          }
        }
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (!data.user) {
        return { success: false, message: "Registration failed" };
      }

      // Register the MAC address for the user
      const { error: macError } = await supabase.from('mac_addresses').insert({
        user_id: data.user.id,
        address: userData.macAddress,
        label: 'Primary Device',
      });

      if (macError) {
        // Clean up if MAC address registration fails
        return { success: false, message: "Failed to register device: " + macError.message };
      }

      // Log successful registration
      await supabase.from('security_logs').insert({
        user_id: data.user.id,
        mac_address: userData.macAddress,
        event_type: 'registration',
        description: 'User registered with new device',
      });

      return { success: true, message: "Registration successful. Please check your email to confirm your account." };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "An unexpected error occurred" 
      };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "An unexpected error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  // Helper function to validate MAC address format
  const isValidMacAddress = (mac: string): boolean => {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(mac);
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
