"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface OrderReviewProps {
  checkoutData: any
  cartItems: any[]
  onPlaceOrder: () => void
  onBack: () => void
}

export function OrderReview({ checkoutData, cartItems, onPlaceOrder, onBack }: OrderReviewProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <p>
              {checkoutData.shippingAddress.firstName} {checkoutData.shippingAddress.lastName}
            </p>
            <p>{checkoutData.shippingAddress.address}</p>
            {checkoutData.shippingAddress.apartment && <p>{checkoutData.shippingAddress.apartment}</p>}
            <p>
              {checkoutData.shippingAddress.city}, {checkoutData.shippingAddress.state}{" "}
              {checkoutData.shippingAddress.zipCode}
            </p>
            <p>{checkoutData.shippingAddress.country}</p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm capitalize">{checkoutData.paymentMethod.replace("-", " ")}</p>
        </CardContent>
      </Card>

      {/* Order Total */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Payment
        </Button>
        <Button size="lg" onClick={onPlaceOrder}>
          Place Order
        </Button>
      </div>
    </div>
  )
}
