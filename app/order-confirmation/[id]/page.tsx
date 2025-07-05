"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Truck, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function OrderConfirmationPage() {
  const params = useParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock order data - replace with actual API call
    setTimeout(() => {
      setOrder({
        id: params.id,
        orderNumber: "ORD-2024-001234",
        status: "confirmed",
        totalAmount: 159.97,
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        shippingAddress: {
          firstName: "John",
          lastName: "Doe",
          address: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
        items: [
          {
            id: "1",
            productName: "Wireless Bluetooth Headphones",
            quantity: 1,
            price: 79.99,
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: "2",
            productName: "Premium Coffee Maker",
            quantity: 1,
            price: 79.98,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find the order you're looking for.</p>
          <Button asChild>
            <Link href="/account">View Your Orders</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Order #{order.orderNumber}</CardTitle>
              <Badge variant="default">{order.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Order Date</p>
                <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Estimated Delivery</p>
                <p className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Amount</p>
                <p className="font-medium text-lg">${order.totalAmount}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p className="font-medium">Credit Card</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.productName}</h4>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${item.price}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p className="font-medium">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Order Tracking */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Order Confirmed</p>
                  <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Package className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Processing</p>
                  <p className="text-sm text-muted-foreground">We're preparing your order</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Shipped</p>
                  <p className="text-sm text-muted-foreground">Your order is on the way</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </Button>
          <Button className="flex-1" asChild>
            <Link href="/account">View Order Details</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
