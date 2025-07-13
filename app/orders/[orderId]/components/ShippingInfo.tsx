"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Check, Copy, MapPin, Truck } from "lucide-react";
import { useState } from "react";

export function ShippingInfo({ order }) {
  const [copied, setCopied] = useState(false);

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(order?.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const estimatedDate = new Date(order.createdAt);
  estimatedDate.setDate(estimatedDate.getDate() + 7);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" /> Shipping Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {order?.trackingNumber && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-blue-900">Tracking Number</p>
                  <p className="text-blue-700 font-mono">
                    {order.trackingNumber}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyTrackingNumber}
                  className="text-blue-700 border-blue-200 bg-transparent"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Shipping Address
              </h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  {order.shippingAddress?.firstName}{" "}
                  {order.shippingAddress?.lastName}
                </p>
                <p>{order.shippingAddress?.addressLine1}</p>
                <p>
                  {order.shippingAddress?.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress?.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Estimated Delivery
              </h4>
              <p>
                Estimated Delivery:{" "}
                {estimatedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
