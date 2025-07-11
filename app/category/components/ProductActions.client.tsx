"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductActionsProps {
  productId: string;
}

export function ProductActions({ productId }: ProductActionsProps) {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const { isInCart, addToCart, removeFromCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const inCart = isInCart(productId);
  const inWishlist = isInWishlist(productId);

  const toggleWishlist = async () => {
    if (!accessToken) {
      alert("Login required.");
      return;
    }
    setLoadingWishlist(true);
    try {
      if (inWishlist) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
      alert("Wishlist update failed.");
    } finally {
      setLoadingWishlist(false);
    }
  };

  const toggleCart = async () => {
    if (!accessToken) {
      alert("Login required.");
      return;
    }
    setLoadingCart(true);
    try {
      if (inCart) {
        await removeFromCart(productId);
      } else {
        await addToCart(productId, 1); // ✅ FIXED: Correct usage
      }
    } catch (err) {
      console.error("Cart toggle failed:", err);
      alert("Cart update failed.");
    } finally {
      setLoadingCart(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        onClick={toggleWishlist}
        disabled={loadingWishlist}
      >
        <Heart
          className={cn(
            "h-4 w-4",
            inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
          )}
        />
      </Button>

      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-300">
        <Button
          className={cn(
            "w-full",
            inCart
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-primary hover:bg-primary-dark text-white"
          )}
          onClick={toggleCart}
          disabled={loadingCart}
        >
          {loadingCart ? (
            "Processing..."
          ) : inCart ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Remove from Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </>
  );
}
