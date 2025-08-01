"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartSummary({ items }) {
  const router = useRouter();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const discount = appliedCoupon ? +(subtotal * 0.1).toFixed(2) : 0;
  const total = subtotal + shipping + tax - discount;

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setAppliedCoupon("SAVE10");
      setCouponCode("");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleProceedToCheckout = () => {
    const cartId = items?.[0]?.cartId;
    if (!cartId) {
      alert("Cart ID not found. Cannot proceed.");
      return;
    }
    setLoading(true);

    // simulate short delay for loading UI (optional)
    setTimeout(() => {
      router.push(`/checkout/${cartId}`);
    }, 300);
  };

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

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={loading}
            />
            <Button variant="outline" onClick={applyCoupon} disabled={loading}>
              Apply
            </Button>
          </div>
          {appliedCoupon && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">
                Coupon applied: {appliedCoupon}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeCoupon}
                disabled={loading}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handleProceedToCheckout}
          disabled={loading}
        >
          {loading ? "Loading..." : "Proceed to Checkout"}
        </Button>

        <div className="text-center text-xs text-muted-foreground mt-2">
          <p>🔒 Secure checkout with SSL encryption</p>
          <p>💳 We accept all major credit cards</p>
        </div>
      </CardContent>
    </Card>
  );
}
