import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import { checkCart, checkWishlist } from "@/lib/api";
import { ProductActions } from "./ProductActions.client";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    costPrice: number;
    images: { url: string }[];
    averageRating: number;
    reviewCount: number;
  };
}

export async function ProductCard({ product }: ProductCardProps) {
  const session = await auth();
  const accessToken = session?.user?.accessToken;

  const imageUrl = product.images?.[0]?.url || "/placeholder.svg";

  const showDiscount = product.price > product.salePrice;
  const discountPercentage = showDiscount
    ? Math.round(((product.price - product.salePrice) * 100) / product.price)
    : 0;

  const [isWishlisted, isInCart] = accessToken
    ? await Promise.all([
        checkWishlist(product.id, accessToken),
        checkCart(product.id, accessToken),
      ])
    : [false, false];

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

        {/* Discount badge */}
        {showDiscount && (
          <div className="absolute top-2 left-2">
            <Badge variant="destructive" className="text-xs">
              -{discountPercentage}%
            </Badge>
          </div>
        )}

        <ProductActions
          productId={product.id}
          isWishlisted={isWishlisted}
          isInCart={isInCart}
        />
      </div>

      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {/* Ratings */}
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

        {/* Pricing */}
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
