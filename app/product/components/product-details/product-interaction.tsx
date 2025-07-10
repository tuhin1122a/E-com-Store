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
  // Contexts
  const { cartItems, addToCart, removeFromCart, isInCart } = useCart();
  const {
    items: wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  // Local state for quantity & loading
  const [quantity, setQuantity] = useState(1);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  // Check if product is in cart or wishlist from context
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  // Add to Cart
  const handleAddToCart = async () => {
    setLoadingCart(true);
    try {
      await addToCart({ id: product.id, quantity });
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Failed to add to cart.");
    } finally {
      setLoadingCart(false);
    }
  };

  // Remove from Cart
  const handleRemoveFromCart = async () => {
    setLoadingCart(true);
    try {
      await removeFromCart(product.id);
    } catch (error) {
      console.error("Remove from cart error:", error);
      alert("Failed to remove from cart.");
    } finally {
      setLoadingCart(false);
    }
  };

  // Toggle Wishlist
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
          onClick={inCart ? handleRemoveFromCart : handleAddToCart}
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
