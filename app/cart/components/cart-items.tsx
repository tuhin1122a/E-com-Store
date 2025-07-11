"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartItems({ items, updateQuantity, removeItem }) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id}>
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item?.product?.images?.[0]?.url || "/placeholder.svg"}
                    alt={item?.product?.name || "Product image"}
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
                        {item?.product?.name}
                      </Link>
                      <div className="text-sm text-muted-foreground mt-1">
                        Color: {item?.color} • Size: {item?.size}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${item.price}</div>
                      {item.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  {!item?.product?.status && (
                    <div className="text-sm text-red-600 mb-2">
                      Out of stock
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        disabled={!item?.product?.status || item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        disabled={!item?.product?.status}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {index < items.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
