"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock cart data
const mockCartItems = [
  {
    id: "1",
    productId: "1",
    name: "Wireless Bluetooth Headphones Premium",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=200&width=200",
    color: "Black",
    size: "One Size",
    quantity: 2,
    inStock: true,
  },
  {
    id: "2",
    productId: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
    color: "Blue",
    size: "Medium",
    quantity: 1,
    inStock: true,
  },
  {
    id: "3",
    productId: "3",
    name: "Premium Coffee Maker",
    price: 149.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=200&width=200",
    color: "Silver",
    size: "One Size",
    quantity: 1,
    inStock: false,
  },
]

export function CartItems() {
  const [cartItems, setCartItems] = useState(mockCartItems)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }

    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const moveToWishlist = (id: string) => {
    // Move to wishlist logic
    removeItem(id)
  }

  if (cartItems.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item, index) => (
        <div key={item.id}>
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Link
                        href={`/product/${item.productId}`}
                        className="font-semibold hover:text-primary line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <div className="text-sm text-muted-foreground mt-1">
                        Color: {item.color} • Size: {item.size}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold">${item.price}</div>
                      {item.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">${item.originalPrice}</div>
                      )}
                    </div>
                  </div>

                  {!item.inStock && <div className="text-sm text-red-600 mb-2">Out of stock</div>}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={!item.inStock}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={!item.inStock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => moveToWishlist(item.id)}>
                        <Heart className="h-4 w-4 mr-1" />
                        Save for later
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {index < cartItems.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}
