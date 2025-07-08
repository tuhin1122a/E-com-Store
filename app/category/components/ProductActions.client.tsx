"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface ProductActionsProps {
  productId: string;
  isWishlisted: boolean;
  isInCart: boolean;
}

export function ProductActions({
  productId,
  isWishlisted: initialWishlisted,
  isInCart: initialInCart,
}: ProductActionsProps) {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const [isInCart, setIsInCart] = useState(initialInCart);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const toggleWishlist = async () => {
    if (!accessToken) return alert("Login required.");
    setLoadingWishlist(true);

    try {
      const res = await fetch(
        isWishlisted
          ? `${apiUrl}/wishlist/delete/${productId}` // ✅ DELETE হলে URL এ productId
          : `${apiUrl}/wishlist/add`, // ✅ POST হলে body তে productId
        {
          method: isWishlisted ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: isWishlisted ? null : JSON.stringify({ productId }),
        }
      );

      if (!res.ok) throw new Error("Wishlist update failed.");
      setIsWishlisted(!isWishlisted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWishlist(false);
    }
  };

  const toggleCart = async () => {
    if (!accessToken) return alert("Login required.");
    setLoadingCart(true);
    try {
      const res = await fetch(
        `${apiUrl}/cart/${isInCart ? "remove" : "add"}${isInCart ? `/${productId}` : ""}`,
        {
          method: isInCart ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: !isInCart ? JSON.stringify({ productId }) : null,
        }
      );
      if (!res.ok) throw new Error("Cart update failed.");
      setIsInCart(!isInCart);
    } catch (err) {
      console.error(err);
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
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
          )}
        />
      </Button>

      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          className={cn(
            "w-full",
            isInCart
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-primary hover:bg-primary-dark text-white"
          )}
          onClick={toggleCart}
          disabled={loadingCart}
        >
          {loadingCart ? (
            "Processing..."
          ) : isInCart ? (
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
