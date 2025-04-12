
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, UserPlus, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const RegisterForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    macAddress: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const getPasswordStrength = (password: string) => {
    if (!password) return { text: 'None', color: 'bg-muted-foreground' };
    if (password.length < 6) return { text: 'Weak', color: 'bg-destructive' };
    if (password.length < 10) return { text: 'Medium', color: 'bg-amber-500' };
    return { text: 'Strong', color: 'bg-emerald-500' };
  };

  const validateMacAddress = (mac: string): boolean => {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(mac);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 3) return nextStep();
    
    // Validate MAC address format
    if (!validateMacAddress(formData.macAddress)) {
      setFormError('Invalid MAC address format. Please use format XX:XX:XX:XX:XX:XX');
      return;
    }
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    setFormError('');
    
    try {
      const { success, message } = await signUp(
        formData.email, 
        formData.password, 
        {
          full_name: formData.fullName,
          username: formData.username,
          macAddress: formData.macAddress
        }
      );
      
      if (success) {
        toast({
          title: "Registration successful!",
          description: message || "Your account has been created successfully.",
        });
        navigate('/login');
      } else {
        setFormError(message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
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
              {formData.password && (
                <div className="mt-2">
                  <div className="text-xs flex justify-between mb-1">
                    <span>Password Strength:</span>
                    <span>{passwordStrength.text}</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full ${passwordStrength.color} transition-all duration-300`} style={{ width: formData.password.length < 6 ? '33%' : formData.password.length < 10 ? '66%' : '100%' }}></div>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 ${formData.confirmPassword && !passwordsMatch ? 'border-destructive' : ''}`}
                />
                {formData.confirmPassword && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {passwordsMatch ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <span className="text-sm text-destructive">✗</span>
                    )}
                  </div>
                )}
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <p className="text-xs text-destructive mt-1">Passwords do not match</p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            {formError && (
              <Alert variant="destructive">
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="macAddress">MAC Address</Label>
              <Input
                id="macAddress"
                name="macAddress"
                placeholder="XX:XX:XX:XX:XX:XX"
                value={formData.macAddress}
                onChange={handleChange}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                Format: XX:XX:XX:XX:XX:XX (e.g., 00:1A:2B:3C:4D:5E)
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium mb-2">Why do we need your MAC address?</p>
              <p className="text-muted-foreground">
                Your MAC address is used as an additional security measure to verify your devices. 
                This helps prevent unauthorized access to your account.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email;
      case 2:
        return formData.username && formData.password && formData.confirmPassword && passwordsMatch;
      case 3:
        return formData.macAddress;
      default:
        return false;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-md mx-auto glass-card animate-pop">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <Shield className="h-12 w-12 text-primary animate-float" />
          </div>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Sign up to start using FriendlyShield
          </CardDescription>
          <div className="flex justify-center mt-4 space-x-1">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step ? "w-8 bg-primary" : "w-4 bg-muted"
                } ${s < step ? "bg-primary/70" : ""}`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderStep()}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex w-full gap-2">
            {step > 1 && (
              <Button 
                type="button" 
                variant="outline"
                onClick={prevStep}
                className="flex-1"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <Button 
              type={step === 3 ? "submit" : "button"} 
              className="flex-1 btn-glow"
              onClick={step < 3 ? nextStep : undefined}
              disabled={!isStepValid() || isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                  Registering...
                </span>
              ) : step < 3 ? (
                <span className="flex items-center gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Complete Registration
                </span>
              )}
            </Button>
          </div>
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default RegisterForm;
