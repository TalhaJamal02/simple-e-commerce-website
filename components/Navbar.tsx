"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Heart, User, Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

function Navbar() {
  const { wishlist, cart } = useCart();
  const { isSignedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto w-[95%] lg:w-[90%]">
        <nav
          className={`${
            isScrolled ? "py-4" : "py-4"
          } transition-all duration-300 flex justify-between items-center`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-foreground font-bold text-2xl"
          >
            ShopEasy
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <Link
              href="/orders"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Orders
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-3 relative">
            <Link href="/wishlist" className="relative">
              <Heart className="w-7 h-7 text-muted-foreground hover:text-foreground transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <div className="border-l border-gray-300 h-6" />

            <Link href="/cart" className="relative">
              <ShoppingCart className="w-7 h-7 text-muted-foreground hover:text-foreground transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            <div className="border-l border-gray-300 h-6" />

            {isSignedIn ? (
              <UserButton
                showName={true}
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-6 h-6",
                  },
                }}
              />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <User className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <SignInButton mode="modal">
                    <DropdownMenuItem className="cursor-pointer">
                      Sign In
                    </DropdownMenuItem>
                  </SignInButton>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:gap-0">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-muted-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-muted-foreground" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="py-4 space-y-4 px-2">
            <Link
              href="/products"
              className="block px-4 py-2 text-muted-foreground hover:bg-gray-100 rounded-lg transition-colors"
            >
              Products
            </Link>
            <Link
              href="/orders"
              className="block px-4 py-2 text-muted-foreground hover:bg-gray-100 rounded-lg transition-colors"
            >
              Orders
            </Link>
            <div className="border-t border-gray-200 my-4" />
            <div className="flex items-center justify-around px-4">
              <Link href="/wishlist" className="relative group">
                <Heart className="w-6 h-6 text-muted-foreground" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <div className="border-l border-gray-300 h-6" />
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-7 h-7 text-muted-foreground hover:text-foreground transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
              <div className="border-l border-gray-300 h-6" />
              {isSignedIn ? (
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-6 h-6",
                    },
                  }}
                />
              ) : (
                <SignInButton mode="modal">
                  <User className="w-6 h-6 text-muted-foreground cursor-pointer" />
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
