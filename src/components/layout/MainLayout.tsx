
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  
  // Check if current route should display the sidebar
  const shouldShowSidebar = location.pathname.includes('/dashboard') || 
                            location.pathname.includes('/admin');
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isSidebarOpen && 
        !target.closest('[data-sidebar]') && 
        window.innerWidth < 768
      ) {
        setIsSidebarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        toggleSidebar={shouldShowSidebar ? toggleSidebar : undefined} 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="flex flex-1">
        {shouldShowSidebar && (
          <>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            {/* Backdrop for mobile sidebar */}
            {isSidebarOpen && (
              <div 
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-10 md:hidden"
                onClick={toggleSidebar}
              />
            )}
          </>
        )}
        
        <main 
          className={cn(
            "flex-1 flex flex-col min-w-0",
            shouldShowSidebar && "md:ml-64 transition-all duration-300"
          )}
        >
          <div className="container px-4 py-8 flex-1 animate-fade-in">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
