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
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductDetailsProps {
  product: any;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const images = product.images.map((img: any) => img.url);

  const discountPercentage =
    product.salePrice && product.costPrice
      ? Math.round(
          ((product.salePrice - product.costPrice) / product.salePrice) * 100
        )
      : 0;

  // 🟡 Check Wishlist & Cart Status on Mount
  useEffect(() => {
    if (!accessToken) return;

    const checkStatus = async () => {
      try {
        const [wishlistRes, cartRes] = await Promise.all([
          fetch(`${apiUrl}/wishlist/check/${product.id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          fetch(`${apiUrl}/cart/check/${product.id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);

        const wishlistData = await wishlistRes.json();
        const cartData = await cartRes.json();

        setIsWishlisted(wishlistData.inWishlist);
        setIsInCart(cartData.inCart);
      } catch (error) {
        console.error("Error checking wishlist/cart status:", error);
      }
    };

    checkStatus();
  }, [accessToken, product.id, apiUrl]);

  // 🟢 Add to Cart
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
    } finally {
      setLoadingCart(false);
    }
  };

  // 🔴 Remove from Cart
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
    } finally {
      setLoadingCart(false);
    }
  };

  // 💙 Toggle Wishlist
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
    } finally {
      setLoadingWishlist(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Images */}
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
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {images.map((img: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={cn(
                "w-20 h-20 rounded-lg border-2 overflow-hidden flex-shrink-0",
                selectedImage === idx ? "border-primary" : "border-gray-200"
              )}
            >
              <Image
                src={img}
                alt={`Thumb ${idx}`}
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

          {/* Ratings */}
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
              {product.averageRating ?? 0} ({product.reviewCount ?? 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold">${product.salePrice}</span>
            {product.price && (
              <span
                className="text-xl line-through text-muted-foreground"
                style={{ textDecorationColor: "red" }}
              >
                ${product.price}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>
        </div>

        {/* Quantity */}
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

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            className="flex-1"
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            disabled={loadingCart}
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

        {/* Tabs */}
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
