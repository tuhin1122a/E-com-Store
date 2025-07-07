"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Heart,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: any;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("One Size");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
  };

  const discountPercentage =
    product.salePrice && product.costPrice
      ? Math.round(
          ((product.salePrice - product.costPrice) / product.salePrice) * 100
        )
      : 0;

  const images = product.images.map((img: any) => img.url);

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg border">
          <Image
            src={images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.onSale && discountPercentage > 0 && (
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

        <div className="flex gap-2 overflow-x-auto">
          {images.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden",
                selectedImage === index ? "border-primary" : "border-gray-200"
              )}
            >
              <Image
                src={image}
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

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.averageRating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.averageRating ?? 0} ({product.reviewCount ?? 0} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.salePrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.salePrice}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>
        </div>

        {/* Quantity */}
        <div>
          <Label className="text-base font-medium mb-3 block">Quantity</Label>
          <Select
            value={quantity.toString()}
            onValueChange={(val) => setQuantity(parseInt(val))}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[...Array(Math.min(10, product.inventoryQuantity || 0))].map(
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
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsWishlisted(!isWishlisted)}
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
              {product.features.map((f: any) => (
                <li key={f.id} className="text-sm">
                  {f.value}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="space-y-2">
            <div className="space-y-2">
              {product.specifications.map((s: any) => (
                <div key={s.id} className="flex justify-between text-sm">
                  <span className="font-medium">{s.key}:</span>
                  <span>{s.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
