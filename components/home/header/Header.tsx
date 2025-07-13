"use client";

import { Heart, Menu, Search, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useWishlist } from "@/context/WishlistContext";

import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

import { useDebounce } from "@/hooks/useDebounce";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const { userData } = useUser();
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();

  // Redirect on search input debounce
  if (debouncedSearch.trim().length > 1) {
    router.push(
      `/products?search=${encodeURIComponent(debouncedSearch.trim())}`
    );
  }

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

          {/* Desktop SearchBar */}
          <div className="hidden md:flex max-w-md flex-1 mx-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            {user && (
              <Button variant="ghost" size="icon" asChild>
                <a href="/wishlist" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center bg-red-500 justify-center rounded-full">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </a>
              </Button>
            )}

            {/* Cart */}
            {user && (
              <Button variant="ghost" size="icon" asChild>
                <a href="/cart" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center bg-red-500 justify-center rounded-full">
                      {cartItems.length}
                    </Badge>
                  )}
                </a>
              </Button>
            )}

            <ThemeToggle />
            <UserMenu />

            {/* Mobile Menu Drawer */}
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

        {/* Mobile Search Input */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
        )}
      </div>
    </header>
  );
}
