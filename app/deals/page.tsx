"use client";

import { ProductCard } from "@/app/category/components/product-card";
import { DealsBanner } from "@/app/deals/components/deals-banner";
import { DealsCategories } from "@/app/deals/components/deals-categories";
import { DealsTimer } from "@/app/deals/components/deals-timer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Flame, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

// Mock deals data
const dealsData = {
  flashDeals: [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones Premium",
      price: 59.99,
      originalPrice: 99.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviewCount: 128,
      isOnSale: true,
      badge: "Flash Deal",
      discount: 40,
      timeLeft: "2h 15m",
      soldCount: 89,
      totalStock: 100,
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 149.99,
      originalPrice: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviewCount: 89,
      isOnSale: true,
      badge: "Flash Deal",
      discount: 40,
      timeLeft: "2h 15m",
      soldCount: 67,
      totalStock: 80,
    },
  ],
  dailyDeals: [
    {
      id: "3",
      name: "Premium Coffee Maker",
      price: 119.99,
      originalPrice: 179.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviewCount: 67,
      isOnSale: true,
      badge: "Daily Deal",
      discount: 33,
    },
    {
      id: "4",
      name: "Wireless Phone Charger",
      price: 29.99,
      originalPrice: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.4,
      reviewCount: 92,
      isOnSale: true,
      badge: "Daily Deal",
      discount: 40,
    },
  ],
  weeklyDeals: [
    {
      id: "5",
      name: "LED Desk Lamp",
      price: 39.99,
      originalPrice: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviewCount: 43,
      isOnSale: true,
      badge: "Weekly Deal",
      discount: 33,
    },
    {
      id: "6",
      name: "Bluetooth Speaker",
      price: 69.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviewCount: 78,
      isOnSale: true,
      badge: "Weekly Deal",
      discount: 42,
    },
  ],
  clearance: [
    {
      id: "7",
      name: "Gaming Mouse RGB",
      price: 34.99,
      originalPrice: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.4,
      reviewCount: 201,
      isOnSale: true,
      badge: "Clearance",
      discount: 61,
    },
    {
      id: "8",
      name: "Wireless Earbuds",
      price: 79.99,
      originalPrice: 159.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviewCount: 156,
      isOnSale: true,
      badge: "Clearance",
      discount: 50,
    },
  ],
};

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState("flash");
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 15,
    seconds: 30,
  });

  // Countdown timer for flash deals
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <DealsBanner />

      <div className="container mx-auto px-4 py-8">
        {/* Flash Deals Section */}
        <Card className="mb-8 bg-gradient-to-r from-red-500 to-pink-500 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="h-8 w-8" />
                <div>
                  <CardTitle className="text-2xl">⚡ Flash Deals</CardTitle>
                  <p className="text-red-100">
                    Limited time offers - Don't miss out!
                  </p>
                </div>
              </div>
              <DealsTimer timeLeft={timeLeft} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dealsData.flashDeals.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg p-4 text-gray-900"
                >
                  <div className="relative mb-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      -{product.discount}%
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-red-600">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sold: {product.soldCount}</span>
                      <span>
                        {Math.round(
                          (product.soldCount / product.totalStock) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{
                          width: `${(product.soldCount / product.totalStock) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    Buy Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deal Categories */}
        <DealsCategories />

        {/* Deals Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="flash" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Flash Deals
            </TabsTrigger>
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Daily Deals
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Weekly Deals
            </TabsTrigger>
            <TabsTrigger value="clearance" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Clearance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flash" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dealsData.flashDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="daily" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dealsData.dailyDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dealsData.weeklyDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="clearance" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dealsData.clearance.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter Signup */}
        <Card className="mt-12 bg-primary text-primary-foreground">
          <CardContent className="py-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Never Miss a Deal!</h3>
            <p className="mb-6 text-primary-foreground/90">
              Subscribe to our newsletter and be the first to know about
              exclusive offers and flash sales.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
