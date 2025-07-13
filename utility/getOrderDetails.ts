import { Order } from "@/app/orders/[orderId]/components";

export async function getOrderDetails(
  orderNumber: string,
  accessToken: string
): Promise<Partial<Order>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/order-number/${orderNumber}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return {}; // failed fetch
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return {};
  }
}
