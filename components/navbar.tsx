'use client';
import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
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

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
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
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">VampGen</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">VampGen</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Generator
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Gallery
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <span className="text-foreground">Welcome, {user.firstName}!</span>
            </NavbarItem>
            <NavbarItem>
              <Button 
                color="danger" 
                variant="flat"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              variant="flat"
              color="secondary"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        
        {/* Auth items in mobile menu */}
        {user ? (
          <>
            <NavbarMenuItem>
              <span className="w-full text-foreground text-lg">
                Welcome, {user.firstName}!
              </span>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                className="w-full justify-start"
                color="danger"
                variant="light"
                onClick={handleLogout}
                size="lg"
              >
                Logout
              </Button>
            </NavbarMenuItem>
          </>
        ) : (
          <NavbarMenuItem>
            <Button
              className="w-full justify-start"
              variant="light"
              onClick={handleLoginClick}
              size="lg"
            >
              Login
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authModalMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </Navbar>
  );
}
