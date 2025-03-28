
import React from 'react';
import { Shield, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 border-t border-border mt-auto">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">FriendlyShield</span>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          Made with <Heart className="h-3 w-3 text-destructive fill-destructive" /> for secure and lovable experiences
        </div>
        
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} FriendlyShield
        </div>
      </div>
    </footer>
  );
};

export default Footer;
