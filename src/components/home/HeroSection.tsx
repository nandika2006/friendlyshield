
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 pointer-events-none" />
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-2 animate-fade-in">
              The lovable security platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Secure Your Digital Space <span className="text-primary">with Ease!</span>
            </h1>
            
            <p className="text-xl text-muted-foreground md:text-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              A friendly security solution that keeps you protected without the complexity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto btn-glow">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto btn-glow">
                  Register
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Animation container with floating security icons */}
              <div className="aspect-square bg-gradient-to-br from-accent/30 to-primary/30 rounded-full p-8 flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="relative w-full h-full">
                  {/* Central shield */}
                  <div className="absolute inset-0 flex items-center justify-center animate-float">
                    <div className="bg-background rounded-full p-6 shadow-lg">
                      <Shield className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  
                  {/* Orbiting elements */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: '0.6s' }}>
                    <Card className="glass-card p-4 shadow-lg">
                      <Lock className="h-8 w-8 text-accent" />
                    </Card>
                  </div>
                  
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: '1.2s' }}>
                    <Card className="glass-card p-4 shadow-lg">
                      <Fingerprint className="h-8 w-8 text-blue-500" />
                    </Card>
                  </div>
                  
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '0.9s' }}>
                    <div className="bg-emerald-500/20 p-3 rounded-full shadow-lg">
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    </div>
                  </div>
                  
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '1.5s' }}>
                    <div className="bg-amber-500/20 p-3 rounded-full shadow-lg">
                      <Activity className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
