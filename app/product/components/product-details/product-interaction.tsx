// @/components/product/product-interaction.tsx
"use client"; // ✨ CLIENT COMPONENT

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
import { useSession } from "next-auth/react";
import { useState } from "react";

interface ProductInteractionProps {
  product: any; // Tip: Define a proper type
  initialIsWishlisted: boolean;
  initialIsInCart: boolean;
}

export function ProductInteraction({
  product,
  initialIsWishlisted,
  initialIsInCart,
}: ProductInteractionProps) {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  // Initialize state from server-provided props
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isInCart, setIsInCart] = useState(initialIsInCart);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // 🟢 Add to Cart Logic
  const handleAddToCart = async () => {
    if (!accessToken) return alert("Please log in to add to cart.");
    setLoadingCart(true);
    try {
      const res = await fetch(`${apiUrl}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId: product.id, quantity }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      setIsInCart(true);
    } catch (error) {
      console.error("Add to cart error:", error);
      // Optionally, show an error toast to the user
    } finally {
      setLoadingCart(false);
    }
  };

  // 🔴 Remove from Cart Logic
  const handleRemoveFromCart = async () => {
    if (!accessToken) return alert("Please log in to remove from cart.");
    setLoadingCart(true);
    try {
      const res = await fetch(`${apiUrl}/cart/remove/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to remove from cart");
      setIsInCart(false);
    } catch (error) {
      console.error("Remove from cart error:", error);
      // Optionally, show an error toast to the user
    } finally {
      setLoadingCart(false);
    }
  };

  // 💙 Toggle Wishlist Logic
  const handleToggleWishlist = async () => {
    if (!accessToken) return alert("Please log in to use wishlist.");
    setLoadingWishlist(true);
    try {
      const url = isWishlisted
        ? `${apiUrl}/wishlist/delete/${product.id}`
        : `${apiUrl}/wishlist/add`;
      const method = isWishlisted ? "DELETE" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: !isWishlisted ? JSON.stringify({ productId: product.id }) : null,
      });

      if (!res.ok) throw new Error("Failed to update wishlist");
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Wishlist toggle error:", error);
      // Optionally, show an error toast to the user
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
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          className="flex-1"
          onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
          disabled={loadingCart || product.inventoryQuantity < 1}
          variant={isInCart ? "destructive" : "default"}
        >
          {loadingCart ? (
            "Processing..."
          ) : isInCart ? (
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
              isWishlisted ? "fill-red-500 text-red-500" : ""
            )}
          />
          {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
        </Button>
        <Button size="lg" variant="outline">
          <Share2 className="h-5 w-5 mr-2" />
          Share
        </Button>
      </div>
    </>
  );
}
