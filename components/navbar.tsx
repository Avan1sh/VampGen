'use client';
import { useState } from 'react';
import { Button } from '@heroui/button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import AuthModal from './AuthModal';
import { useAuth } from '@/hooks/useAuth';

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function CustomNavbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Generator", href: "#" },
    { name: "Gallery", href: "#" },
    { name: "About", href: "#" },
  ];

  const handleLoginClick = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/navbar/navbar1.png')",
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        
        {/* Content */}
        <div className="relative z-10 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-300"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Logo - Center on mobile, Left on desktop */}
            <div className="flex items-center flex-1 sm:flex-initial justify-center sm:justify-start">
              <div className="flex items-center space-x-3">
                <AcmeLogo />
                <span className="font-bold text-xl text-white drop-shadow-lg">VampGen</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8 flex-1 justify-center">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 drop-shadow-sm"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="hidden lg:inline-block text-white/90 text-sm drop-shadow-sm">
                    Welcome, {user.firstName}!
                  </span>
                  <Button 
                    color="danger" 
                    variant="flat"
                    size="sm"
                    onClick={handleLogout}
                    className="bg-red-600/80 hover:bg-red-600 text-white border-red-500/50"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="flat"
                  color="secondary"
                  size="sm"
                  onClick={handleLoginClick}
                  className="bg-purple-600/80 hover:bg-purple-600 text-white border-purple-500/50"
                >
                  Login
                </Button>
              )}
            </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-white/20 bg-black/50 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-purple-600/30 transition-colors duration-200 drop-shadow-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-white/20">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-white/90 drop-shadow-sm">
                      Welcome, {user.firstName}!
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-300 hover:text-white hover:bg-red-600/30 transition-colors duration-200 drop-shadow-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-purple-300 hover:text-white hover:bg-purple-600/30 transition-colors duration-200 drop-shadow-sm"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authModalMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}
