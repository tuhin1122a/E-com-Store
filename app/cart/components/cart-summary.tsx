"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function CartSummary() {
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  // Mock cart totals
  const subtotal = 429.97
  const shipping = 0 // Free shipping
  const tax = 34.4
  const discount = appliedCoupon ? 43.0 : 0
  const total = subtotal + shipping + tax - discount

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setAppliedCoupon("SAVE10")
      setCouponCode("")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {appliedCoupon && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({appliedCoupon})</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Coupon Code */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
            <Button variant="outline" onClick={applyCoupon}>
              Apply
            </Button>
          </div>
          {appliedCoupon && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Coupon applied: {appliedCoupon}</span>
              <Button variant="ghost" size="sm" onClick={removeCoupon}>
                Remove
              </Button>
            </div>
          )}
        </div>

        <Button className="w-full" size="lg" asChild>
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>

        <Button variant="outline" className="w-full" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>

        {/* Security badges */}
        <div className="text-center text-xs text-muted-foreground">
          <p>🔒 Secure checkout with SSL encryption</p>
          <p>💳 We accept all major credit cards</p>
        </div>
      </CardContent>
    </Card>
  )
}
