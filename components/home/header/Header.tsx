"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Heart, Menu, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";

import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const cartItemsCount = 3;
  const wishlistCount = 5;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        Free shipping on orders over $50! 🚚
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <NavLinks />
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            className="hidden md:flex max-w-md flex-1 mx-8"
          />

          <div className="flex items-center space-x-2">
            {/* Mobile search icon */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild>
              <a href="/wishlist" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </Badge>
                )}
              </a>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild>
              <a href="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </Badge>
                )}
              </a>
            </Button>

            <ThemeToggle />
            <UserMenu user={user} />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <MobileMenu />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search input */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}
      </div>
    </header>
  );
}
