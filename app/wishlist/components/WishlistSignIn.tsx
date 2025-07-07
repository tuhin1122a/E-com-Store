// src/components/wishlist/WishlistSignIn.tsx
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export function WishlistSignIn() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-2">
          Sign in to view your wishlist
        </h1>
        <p className="text-muted-foreground mb-6">
          Save your favorite items and access them from any device.
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
