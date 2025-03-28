
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  Settings,
  Home,
  Shield,
  User,
  Bell,
  LogOut,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: Home,
      admin: false
    },
    { 
      name: 'User Profile', 
      path: '/dashboard/profile', 
      icon: User,
      admin: false
    },
    { 
      name: 'Security', 
      path: '/dashboard/security', 
      icon: Shield,
      admin: false
    },
    { 
      name: 'Notifications', 
      path: '/dashboard/notifications', 
      icon: Bell,
      admin: false
    },
    { 
      name: 'User Management', 
      path: '/admin/users', 
      icon: Users,
      admin: true
    },
    { 
      name: 'Settings', 
      path: '/admin/settings', 
      icon: Settings,
      admin: true
    },
  ];

  // For demo purposes, let's assume admin status is based on path
  const isAdmin = location.pathname.includes('/admin');

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col w-64 h-screen bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out transform md:translate-x-0 border-r border-sidebar-border",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">FriendlyShield</span>
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="md:hidden text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-col gap-1 p-2 overflow-y-auto">
        {menuItems
          .filter(item => isAdmin ? true : !item.admin)
          .map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className="w-full"
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all",
                  location.pathname === item.path ? 
                    "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : 
                    "text-sidebar-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
                {item.admin && (
                  <span className="ml-auto text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
              </Button>
            </Link>
          ))}
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
