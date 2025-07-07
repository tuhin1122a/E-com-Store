"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Add the ThemeToggle import at the top

import { useSession } from "next-auth/react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const user = session?.user;

  // Mock data - replace with real data from context/store
  const cartItemsCount = 3;
  const wishlistCount = 5;
  const isLoggedIn = false;

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Beauty",
    "Toys",
    "Automotive",
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          Free shipping on orders over $50! 🚚
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                E
              </span>
            </div>
            <span className="font-bold text-xl">EcomStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Categories</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem key={category} asChild>
                    <Link
                      href={`/category/${category.toLowerCase().replace(" & ", "-").replace(" ", "-")}`}
                    >
                      {category}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/products"
              className="text-sm font-medium hover:text-primary"
            >
              All Products
            </Link>
            <Link
              href="/deals"
              className="text-sm font-medium hover:text-primary"
            >
              Deals
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {/* Mobile search */}
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
              <Link href="/wishlist" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {wishlistCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user !== null ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Order History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <h3 className="font-semibold text-lg">Categories</h3>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category.toLowerCase().replace(" & ", "-").replace(" ", "-")}`}
                      className="text-sm hover:text-primary"
                    >
                      {category}
                    </Link>
                  ))}
                  <div className="border-t pt-4">
                    <Link
                      href="/products"
                      className="block text-sm hover:text-primary mb-2"
                    >
                      All Products
                    </Link>
                    <Link
                      href="/deals"
                      className="block text-sm hover:text-primary mb-2"
                    >
                      Deals
                    </Link>
                    <Link
                      href="/about"
                      className="block text-sm hover:text-primary mb-2"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-sm hover:text-primary"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
