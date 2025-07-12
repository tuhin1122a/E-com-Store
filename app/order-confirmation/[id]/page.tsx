"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import OrderActions from "../components/OrderActions";
import OrderHeader from "../components/OrderHeader";
import OrderItemsCard from "../components/OrderItemsCard";
import OrderSummaryCard from "../components/OrderSummaryCard";
import OrderTrackingCard from "../components/OrderTrackingCard";
import ShippingAddressCard from "../components/ShippingAddressCard";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const { data: session } = useSession();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderNumber || !session?.user?.accessToken) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/order-number/${orderNumber}`,
          {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch order");

        const data = await res.json();
        setOrder(data.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderNumber, session?.user?.accessToken]);

  const orderDate = order ? new Date(order.createdAt) : null;
  const estimatedDeliveryDate = orderDate ? new Date(orderDate) : null;
  if (estimatedDeliveryDate)
    estimatedDeliveryDate.setDate(orderDate.getDate() + 10);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-32 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the order you're looking for.
          </p>
          <Button asChild>
            <Link href="/account">View Your Orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <OrderHeader />
        <OrderSummaryCard
          order={order}
          estimatedDeliveryDate={estimatedDeliveryDate}
        />
        <OrderItemsCard items={order.items} />
        <ShippingAddressCard address={order.shippingAddress} />
        <OrderTrackingCard createdAt={order.createdAt} />
        <OrderActions orderNumber={orderNumber} />
      </div>
    </div>
  );
}
