"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import OrderActions from "../../components/OrderActions";
import OrderHeader from "../../components/OrderHeader";
import OrderItemsCard from "../../components/OrderItemsCard";
import OrderSummaryCard from "../../components/OrderSummaryCard";
import OrderTrackingCard from "../../components/OrderTrackingCard";
import ShippingAddressCard from "../../components/ShippingAddressCard";
import { useOrderDetails } from "./useOrderDetails";

export default function OrderConfirmationPage() {
  const { order, loading, error, orderNumber } = useOrderDetails();

  const orderDate = order ? new Date(order.createdAt) : null;
  const estimatedDeliveryDate = orderDate ? new Date(orderDate) : null;
  if (estimatedDeliveryDate)
    estimatedDeliveryDate.setDate(orderDate.getDate() + 10);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2 dark:bg-gray-700" />
          <div className="h-32 bg-gray-200 rounded dark:bg-gray-700" />
          <div className="h-64 bg-gray-200 rounded dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "We couldn't find the order you're looking for."}
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
      <div className="max-w-2xl mx-auto space-y-6">
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
