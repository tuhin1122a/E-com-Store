"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WishlistItem } from "@/components/wishlist-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Trash2, Share2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { apiClient } from "@/lib/api"

interface WishlistProduct {
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

export default function WishlistPage() {
  const { user } = useAuth()
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  useEffect(() => {
    if (user) {
      fetchWishlist()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchWishlist = async () => {
    try {
      const response = await apiClient.getWishlist()
      setWishlistItems(response)
    } catch (error) {
      console.error("Failed to fetch wishlist:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveItem = async (productId: string) => {
    try {
      await apiClient.removeFromWishlist(productId)
      setWishlistItems((items) => items.filter((item) => item.productId !== productId))
      setSelectedItems((selected) => selected.filter((id) => id !== productId))
    } catch (error) {
      console.error("Failed to remove from wishlist:", error)
    }
  }

  const handleAddToCart = async (productId: string) => {
    try {
      await apiClient.addToCart({ productId, quantity: 1 })
      // Optionally remove from wishlist after adding to cart
      // handleRemoveItem(productId)
    } catch (error) {
      console.error("Failed to add to cart:", error)
    }
  }

  const handleSelectItem = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(wishlistItems.map((item) => item.productId))
    }
  }

  const handleRemoveSelected = async () => {
    try {
      await Promise.all(selectedItems.map((productId) => apiClient.removeFromWishlist(productId)))
      setWishlistItems((items) => items.filter((item) => !selectedItems.includes(item.productId)))
      setSelectedItems([])
    } catch (error) {
      console.error("Failed to remove selected items:", error)
    }
  }

  const handleAddSelectedToCart = async () => {
    try {
      await Promise.all(selectedItems.map((productId) => apiClient.addToCart({ productId, quantity: 1 })))
      // Optionally remove from wishlist after adding to cart
    } catch (error) {
      console.error("Failed to add selected items to cart:", error)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Sign in to view your wishlist</h1>
          <p className="text-muted-foreground mb-6">Save your favorite items and access them from any device.</p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share List
            </Button>
          </div>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-6">
              Save items you love to your wishlist and never lose track of them.
            </p>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Bulk Actions */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === wishlistItems.length}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                  <span className="text-sm">Select All ({selectedItems.length} selected)</span>
                </label>
              </div>

              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleAddSelectedToCart}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart ({selectedItems.length})
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRemoveSelected}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove ({selectedItems.length})
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                isSelected={selectedItems.includes(item.productId)}
                onSelect={() => handleSelectItem(item.productId)}
                onRemove={() => handleRemoveItem(item.productId)}
                onAddToCart={() => handleAddToCart(item.productId)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
