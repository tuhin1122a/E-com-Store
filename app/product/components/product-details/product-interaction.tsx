"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Heart, Share2, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductInteractionProps {
  product: any;
}

export function ProductInteraction({ product }: ProductInteractionProps) {
  const { isInCart, addToCart, removeFromCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const productId = product.id;
  const [quantity, setQuantity] = useState(1);

  // ✅ Local UI states for instant toggle
  const [inCartUI, setInCartUI] = useState(false);
  const [inWishlistUI, setInWishlistUI] = useState(false);

  // 🔄 Sync local state with context
  useEffect(() => {
    setInCartUI(isInCart(productId));
  }, [isInCart, productId]);

  useEffect(() => {
    setInWishlistUI(isInWishlist(productId));
  }, [isInWishlist, productId]);

  const toggleCart = async () => {
    setInCartUI((prev) => !prev); // Optimistic UI

    try {
      if (inCartUI) {
        await removeFromCart(productId);
      } else {
        await addToCart(productId, quantity);
      }
    } catch (error) {
      console.error("Cart toggle error:", error);
      setInCartUI((prev) => !prev); // Rollback
    }
  };

  const toggleWishlist = async () => {
    setInWishlistUI((prev) => !prev); // Optimistic UI

    try {
      if (inWishlistUI) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
      setInWishlistUI((prev) => !prev); // Rollback
    }
  };

  return (
    <>
      {/* Quantity Selector */}
      <div>
        <Label className="text-base font-medium mb-2 block">Quantity</Label>
        <Select
          value={quantity.toString()}
          onValueChange={(val) => setQuantity(parseInt(val))}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[...Array(Math.min(10, product.inventoryQuantity || 1))].map(
              (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground mt-1">
          {product.inventoryQuantity} items in stock
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button
          size="lg"
          className="flex-1"
          onClick={toggleCart}
          disabled={product.inventoryQuantity < 1}
          variant={inCartUI ? "destructive" : "default"}
        >
          {inCartUI ? (
            <>
              <X className="h-5 w-5 mr-2" />
              Remove from Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </>
          )}
        </Button>

        <Button size="lg" variant="outline" onClick={toggleWishlist}>
          <Heart
            className={cn(
              "h-5 w-5 mr-2",
              inWishlistUI ? "fill-red-500 text-red-500" : ""
            )}
          />
          {inWishlistUI ? "Wishlisted" : "Add to Wishlist"}
        </Button>

        <Button size="lg" variant="outline">
          <Share2 className="h-5 w-5 mr-2" />
          Share
        </Button>
      </div>
    </>
  );
}
