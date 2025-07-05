"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface WishlistItemProps {
  item: {
    id: string
    productId: string
    product: {
      id: string
      name: string
      price: number
      originalPrice?: number
      image: string
      rating: number
      reviewCount: number
      isOnSale: boolean
      badge?: string
      inStock: boolean
    }
    createdAt: string
  }
  isSelected: boolean
  onSelect: () => void
  onRemove: () => void
  onAddToCart: () => void
}

export function WishlistItem({ item, isSelected, onSelect, onRemove, onAddToCart }: WishlistItemProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { product } = item

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      await onAddToCart()
    } finally {
      setIsAddingToCart(false)
    }
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className={cn("group hover:shadow-lg transition-shadow duration-300", isSelected && "ring-2 ring-primary")}>
      <div className="relative overflow-hidden">
        {/* Selection Checkbox */}
        <div className="absolute top-2 left-2 z-10">
          <input type="checkbox" checked={isSelected} onChange={onSelect} className="rounded" />
        </div>

        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.isOnSale && discountPercentage > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          {product.badge && (
            <Badge variant="secondary" className="text-xs">
              {product.badge}
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="outline" className="text-xs bg-white">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Remove button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-12 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>

        {/* Quick add to cart */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="w-full" onClick={handleAddToCart} disabled={isAddingToCart || !product.inStock}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isAddingToCart ? "Adding..." : product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-lg">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Added date */}
        <p className="text-xs text-muted-foreground">Added {new Date(item.createdAt).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}
