
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Menu, Sun, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar?: () => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleSidebar, 
  isDarkMode = false,
  toggleDarkMode
}) => {
  const { toast } = useToast();
  const location = useLocation();
  const isAuthenticated = location.pathname.includes('/dashboard') || location.pathname.includes('/admin');

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    // In a real app, perform actual logout functionality here
  };

  return (
    <header className="z-10 w-full px-4 py-3 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isAuthenticated && toggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2 animate-fade-in">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">FriendlyShield</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {toggleDarkMode && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}

          {isAuthenticated ? (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="btn-glow"
            >
              Logout
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" className="btn-glow">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="default" className="btn-glow">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
