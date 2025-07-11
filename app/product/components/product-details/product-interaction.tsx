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
import { useState } from "react";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductInteractionProps {
  product: any; // Ideally, define a proper type
}

export function ProductInteraction({ product }: ProductInteractionProps) {
  const { cartItems, addToCart, removeFromCart, isInCart } = useCart();
  const {
    items: wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const productId = product.id;
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  // 🔁 Unified toggle for cart
  const toggleCart = async () => {
    setLoadingCart(true);
    try {
      if (inCart) {
        await removeFromCart(product.id);
      } else {
        await addToCart(productId, quantity);
      }
    } catch (error) {
      console.error("Cart toggle error:", error);
      alert("Failed to update cart.");
    } finally {
      setLoadingCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    setLoadingWishlist(true);
    try {
      if (inWishlist) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product.id);
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
      alert("Failed to update wishlist.");
    } finally {
      setLoadingWishlist(false);
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
          disabled={loadingCart || product.inventoryQuantity < 1}
          variant={inCart ? "destructive" : "default"}
        >
          {loadingCart ? (
            "Processing..."
          ) : inCart ? (
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

        <Button
          size="lg"
          variant="outline"
          onClick={handleToggleWishlist}
          disabled={loadingWishlist}
        >
          <Heart
            className={cn(
              "h-5 w-5 mr-2",
              inWishlist ? "fill-red-500 text-red-500" : ""
            )}
          />
          {inWishlist ? "Wishlisted" : "Add to Wishlist"}
        </Button>

        <Button size="lg" variant="outline">
          <Share2 className="h-5 w-5 mr-2" />
          Share
        </Button>
      </div>
    </>
  );
}
