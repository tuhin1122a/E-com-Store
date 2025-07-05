"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProductDetailsProps {
  productId: string
}

// Mock product data - replace with real API call
const mockProduct = {
  id: "1",
  name: "Wireless Bluetooth Headphones Premium",
  price: 79.99,
  originalPrice: 99.99,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  rating: 4.5,
  reviewCount: 128,
  isOnSale: true,
  badge: "Best Seller",
  description:
    "Experience premium sound quality with these wireless Bluetooth headphones. Featuring advanced noise cancellation technology and up to 30 hours of battery life.",
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Quick charge: 5 min = 3 hours",
    "Premium comfort fit",
    "Built-in microphone",
    "Bluetooth 5.0 connectivity",
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    Impedance: "32 ohms",
    Weight: "250g",
    Connectivity: "Bluetooth 5.0, 3.5mm jack",
    Battery: "30 hours playback",
  },
  colors: [
    { id: "black", name: "Black", hex: "#000000" },
    { id: "white", name: "White", hex: "#FFFFFF" },
    { id: "blue", name: "Blue", hex: "#3B82F6" },
  ],
  sizes: ["One Size"],
  stock: 15,
  category: "Electronics",
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("black")
  const [selectedSize, setSelectedSize] = useState("One Size")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const product = mockProduct // Replace with actual API call

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsAddingToCart(false)
    // Add to cart logic here
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg border">
          <Image
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.isOnSale && discountPercentage > 0 && (
            <Badge variant="destructive" className="absolute top-4 left-4">
              -{discountPercentage}%
            </Badge>
          )}
          {product.badge && (
            <Badge variant="secondary" className="absolute top-4 right-4">
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-2 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden",
                selectedImage === index ? "border-primary" : "border-gray-200",
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>
        </div>

        {/* Color Selection */}
        <div>
          <Label className="text-base font-medium mb-3 block">Color</Label>
          <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <Label key={color.id} htmlFor={color.id} className="cursor-pointer">
                  <RadioGroupItem id={color.id} value={color.id} className="sr-only" />
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center",
                      selectedColor === color.id ? "border-primary" : "border-gray-300",
                    )}
                  >
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color.hex }} />
                  </div>
                </Label>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Quantity */}
        <div>
          <Label className="text-base font-medium mb-3 block">Quantity</Label>
          <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[...Array(Math.min(10, product.stock))].map((_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">{product.stock} items in stock</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={isAddingToCart}>
            <ShoppingCart className="h-5 w-5 mr-2" />
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
          <Button size="lg" variant="outline" onClick={() => setIsWishlisted(!isWishlisted)}>
            <Heart className={cn("h-5 w-5 mr-2", isWishlisted ? "fill-red-500 text-red-500" : "")} />
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </Button>
          <Button size="lg" variant="outline">
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </Button>
        </div>

        <Separator />

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            <span className="text-sm">Free Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm">2 Year Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-primary" />
            <span className="text-sm">30 Day Returns</span>
          </div>
        </div>

        <Separator />

        {/* Product Details Tabs */}
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="space-y-2">
            <ul className="list-disc list-inside space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-sm">
                  {feature}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="space-y-2">
            <div className="space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="font-medium">{key}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
