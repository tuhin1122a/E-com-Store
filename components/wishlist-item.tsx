"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Share2, ShoppingCart, Star, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface WishlistItemProps {
  item: {
    id: string;
    productId: string;
    product: {
      id: string;
      name: string;
      price: number;
      salePrice?: number;
      images: { url: string }[];
      reviews: any[];
      onSale: boolean;
      status: string;
    };
    createdAt: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onAddToCart: () => void;
}

export function WishlistItem({
  item,
  isSelected,
  onSelect,
  onRemove,
  onAddToCart,
}: WishlistItemProps) {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isRemovingFromCart, setIsRemovingFromCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const { product } = item;

  const productImage = product.images?.[0]?.url || "/placeholder.svg";
  const inStock =
    product.status === "IN_STOCK" || product.status === "LOW_STOCK";
  const reviewCount = product.reviews?.length || 0;
  const discountPercentage =
    product.salePrice && product.price
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  // ✅ Check if item is in cart
  useEffect(() => {
    if (!accessToken) return;
    const checkCart = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/check/${product.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();
        setIsInCart(data.inCart);
      } catch (err) {
        console.error("Error checking cart:", err);
      }
    };

    checkCart();
  }, [accessToken, product.id]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart();
      setIsInCart(true);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleRemoveFromCart = async () => {
    setIsRemovingFromCart(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/remove/${product.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsInCart(false);
    } catch (err) {
      console.error("Failed to remove from cart", err);
    } finally {
      setIsRemovingFromCart(false);
    }
  };

  const handleShareClick = async () => {
    setIsCopying(true);
    try {
      const shareUrl = `${window.location.origin}/wishlist/share/${item.id}`;
      await navigator.clipboard.writeText(shareUrl);
      alert("Share URL copied to clipboard!");
    } catch (error) {
      alert("Failed to copy URL.");
      console.error(error);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <Card className="group relative hover:shadow-lg transition-shadow duration-300">
      {isSelected && (
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
      )}

      <div className="relative overflow-hidden">
        <div className="absolute top-3 left-3 z-20">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-5 h-5 rounded border border-gray-300 text-blue-600"
            aria-label="Select wishlist item"
          />
        </div>

        <Link href={`/product/${product.id}`}>
          <Image
            src={productImage}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
          {product.onSale && discountPercentage > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          {!inStock && (
            <Badge variant="outline" className="text-xs bg-white">
              Out of Stock
            </Badge>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-12 z-20 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
          aria-label="Remove from wishlist"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-20 z-20 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleShareClick}
          disabled={isCopying}
          aria-label="Share wishlist item"
        >
          <Share2 className="h-4 w-4 text-blue-500" />
        </Button>

        <div className="absolute bottom-2 left-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isInCart ? (
            <Button
              className="w-full bg-destructive hover:bg-destructive/90"
              onClick={handleRemoveFromCart}
              disabled={isRemovingFromCart}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isRemovingFromCart ? "Removing..." : "Remove from Cart"}
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={handleAddToCart}
              disabled={isAddingToCart || !inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isAddingToCart
                ? "Adding..."
                : inStock
                  ? "Add to Cart"
                  : "Out of Stock"}
            </Button>
          )}
        </div>
      </div>

      <CardContent className="p-4 z-20 relative">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < 0 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-lg">
            ${product.salePrice || product.price}
          </span>
          {product.salePrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price}
            </span>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Added on{" "}
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </CardContent>
    </Card>
  );
}
