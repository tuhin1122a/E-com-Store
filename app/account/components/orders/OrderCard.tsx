"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function OrderCard({ order }: { order: any }) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default";
      case "shipped":
        return "secondary";
      case "processing":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const handleViewDetails = () => {
    router.push(`/orders/${order.orderNumber}`);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-lg">
              Order #{order.orderNumber}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
            <span className="font-semibold">${order.totalAmount}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4">
          {order.items?.slice(0, 3).map((item: any) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={item?.imageUrl || "/placeholder.svg"}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.productName}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity} × ${item.price}
                </p>
              </div>
            </div>
          ))}
          {order.items?.length > 3 && (
            <p className="text-sm text-muted-foreground">
              +{order.items.length - 3} more items
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleViewDetails}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </Button>
          {order.status === "delivered" && (
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Return Items
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
