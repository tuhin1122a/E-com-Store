"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

  // ✅ Local UI State
  const [inCartUI, setInCartUI] = useState(false);
  const [inWishlistUI, setInWishlistUI] = useState(false);

  // ✅ Sync local UI with actual context state on mount or changes
  useEffect(() => {
    setInCartUI(isInCart(productId));
  }, [isInCart, productId]);

  useEffect(() => {
    setInWishlistUI(isInWishlist(productId));
  }, [isInWishlist, productId]);

  const toggleWishlist = async () => {
    if (!accessToken) {
      alert("Login required.");
      return;
    }

    setInWishlistUI((prev) => !prev); // optimistic
    try {
      if (inWishlistUI) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
      setInWishlistUI((prev) => !prev); // rollback
    }
  };

  const toggleCart = async () => {
    if (!accessToken) {
      alert("Login required.");
      return;
    }

    setInCartUI((prev) => !prev); // optimistic
    try {
      if (inCartUI) {
        await removeFromCart(productId);
      } else {
        await addToCart(productId, 1);
      }
    } catch (err) {
      console.error("Cart toggle failed:", err);
      setInCartUI((prev) => !prev); // rollback
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        onClick={toggleWishlist}
      >
        <Heart
          className={cn(
            "h-4 w-4",
            inWishlistUI ? "fill-red-500 text-red-500" : "text-gray-600"
          )}
        />
      </Button>

      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-300">
        <Button
          className={cn(
            "w-full",
            inCartUI
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-primary hover:bg-primary-dark text-white"
          )}
          onClick={toggleCart}
        >
          {inCartUI ? (
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
