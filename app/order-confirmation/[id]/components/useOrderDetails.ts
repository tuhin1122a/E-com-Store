"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useOrderDetails() {
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

  return { order, loading, error, orderNumber };
}
