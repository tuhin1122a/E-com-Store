"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import Link from "next/link";
import { Order } from "./types";

interface RecentOrdersProps {
  recentOrders: Order[];
}

export function RecentOrders({ recentOrders }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
        <Button asChild size="sm" variant="outline">
          <Link href="/account?section=orders">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentOrders.length === 0 ? (
          <div className="text-center py-10">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              You haven’t placed any orders yet.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:shadow-sm transition"
            >
              <div>
                <p className="text-sm font-medium">
                  Order #{order.orderNumber}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">${order.totalAmount}</p>
                <Badge
                  variant={
                    order.status === "delivered" ? "default" : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
