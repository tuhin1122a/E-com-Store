"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductActions } from "./ProductActions.client";

export function ProductCardClient({
  product,
}: {
  product: ProductCardProps["product"];
  isWishlisted: boolean;
}) {
  const { isInCart } = useCart();
  const showDiscount = product.price > product.costPrice;
  const discountPercentage = showDiscount
    ? Math.round(((product.price - product.costPrice) * 100) / product.price)
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 relative">
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.images?.[0]?.url || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {showDiscount && (
          <div className="absolute top-2 left-2">
            <Badge variant="destructive" className="text-xs">
              -{discountPercentage}%
            </Badge>
          </div>
        )}

        {/* Wrapper div to control visibility on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <ProductActions
            productId={product.id}
            isInCart={isInCart(product.id)}
          />
        </div>
      </div>

      <CardContent className="p-4">
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
                className={
                  i < Math.floor(product.averageRating)
                    ? "h-3 w-3 fill-yellow-400 text-yellow-400"
                    : "h-3 w-3 text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {showDiscount ? (
            <>
              <span className="font-bold text-lg text-red-600">
                ${product.price}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ${product.costPrice}
              </span>
            </>
          ) : (
            <span className="font-bold text-lg">${product.price}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
