
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
    // Set up auth state listener FIRST -- never do async here!
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Helper function to validate MAC address format
  const isValidMacAddress = (mac: string): boolean => {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(mac);
  };

  // Improved signIn function
  const signIn = async (email: string, password: string, macAddress: string) => {
    if (!isValidMacAddress(macAddress)) {
      return { success: false, message: "Invalid MAC address format" };
    }

    try {
      // Network accessibility check
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        // Network or credentials error
        return { success: false, message: error.message || 'Login failed' };
      }
      if (!data.user) {
        return { success: false, message: "Login failed" };
      }

      // Check mac_addresses table for this user and address
      const { data: macData, error: macError } = await supabase
        .from('mac_addresses')
        .select('*')
        .eq('user_id', data.user.id)
        .eq('address', macAddress);

      if (macError) {
        await supabase.auth.signOut();
        return { success: false, message: "MAC address verification failed: " + macError.message };
      }

      if (!macData || macData.length === 0) {
        await supabase.auth.signOut();
        return { success: false, message: "Unrecognized device. Please use a registered device." };
      }

      if (macData[0].is_blocked) {
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
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || "An unexpected error occurred. Please check your network connection.",
      };
    }
  };

  // Improved signUp function with network and session handling
  const signUp = async (email: string, password: string, userData: { full_name: string; username: string; macAddress: string }) => {
    if (!isValidMacAddress(userData.macAddress)) {
      return { success: false, message: "Invalid MAC address format" };
    }
    try {
      // Must have email redirect URL for Supabase
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: userData.full_name,
            username: userData.username,
          }
        }
      });

      if (error) {
        return { success: false, message: error.message || "Registration failed" };
      }
      if (!data.user) {
        return { success: false, message: "Registration failed" };
      }

      // After signup, sign in to get a valid session to insert MAC address
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        return {
          success: true,
          message: "Registration successful, but could not register device. Please log in to complete setup."
        };
      }

      // Insert MAC for this user with active session now
      const { error: macError } = await supabase.from('mac_addresses').insert({
        user_id: data.user.id,
        address: userData.macAddress,
        label: 'Primary Device',
      });

      if (macError) {
        // Consider registration ok but warn about device
        return {
          success: true,
          message: "Account created, but failed to register device: " + macError.message,
        };
      }

      // Log registration
      await supabase.from('security_logs').insert({
        user_id: data.user.id,
        mac_address: userData.macAddress,
        event_type: 'registration',
        description: 'User registered with new device',
      });

      // Log out so user must log in to verify
      await supabase.auth.signOut();

      return { success: true, message: "Registration successful. Please check your email to confirm your account." };
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || "An unexpected error occurred. Please check your network connection.",
      };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "An unexpected error occurred while signing out.",
        variant: "destructive",
      });
    }
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
