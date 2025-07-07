"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  costPrice: number;
  images: { url: string }[];
  averageRating: number;
  reviewCount: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsAddingToCart(false);
    // Add to cart logic here
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Add to wishlist logic here
  };

  const discountPercentage =
    product.costPrice > product.price
      ? Math.round(
          ((product.costPrice - product.price) / product.costPrice) * 100
        )
      : 0;

  const imageUrl = product.images?.[0]?.url || "/placeholder.svg";

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image
            src={imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={handleToggleWishlist}
        >
          <Heart
            className={cn(
              "h-4 w-4",
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            )}
          />
        </Button>

        {/* Add to cart */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${product.price}</span>
          {product.costPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.costPrice}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
