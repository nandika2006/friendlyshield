
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const validateMacAddress = (mac: string): boolean => {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(mac);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Validate MAC address format first
    if (!validateMacAddress(macAddress)) {
      setFormError('Invalid MAC address format. Please use format XX:XX:XX:XX:XX:XX');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { success, message } = await signIn(email, password, macAddress);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to FriendlyShield!",
        });
        navigate('/dashboard');
      } else {
        let errorMessage = message;
        
        // Provide more specific error messages based on common issues
        if (message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (message.includes('Unrecognized device')) {
          errorMessage = 'This device is not registered with your account. Please use a registered device.';
        } else if (message.includes('blocked')) {
          errorMessage = 'This device has been blocked. Please contact support.';
        }
        
        setFormError(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Card className="w-full max-w-md mx-auto glass-card animate-pop">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <Shield className="h-12 w-12 text-primary animate-float" />
          </div>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Login to access your secure dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formError && (
            <Alert variant="destructive">
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="macAddress">MAC Address</Label>
            <Input
              id="macAddress"
              placeholder="XX:XX:XX:XX:XX:XX"
              value={macAddress}
              onChange={(e) => setMacAddress(e.target.value)}
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            <p className="text-xs text-muted-foreground">
              Format: XX:XX:XX:XX:XX:XX (e.g., 00:1A:2B:3C:4D:5E)
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full btn-glow"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                Logging in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </span>
            )}
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginForm;
