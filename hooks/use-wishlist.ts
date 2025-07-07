"use client";

import { WishlistProduct } from "@/app/wishlist/components";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export function useWishlist() {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const [items, setItems] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const fetchWishlist = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch wishlist");

      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const removeItem = async (productId: string) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setItems((prev) => prev.filter((item) => item.productId !== productId));
      setSelectedItems((prev) => prev.filter((id) => id !== productId));
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const toggleSelectItem = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems((prev) =>
      prev.length === items.length ? [] : items.map((item) => item.productId)
    );
  };

  const removeSelected = async () => {
    try {
      await Promise.all(
        selectedItems.map((id) =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/delete/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        )
      );
      setItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item.productId))
      );
      setSelectedItems([]);
    } catch (error) {
      console.error("Failed to remove selected items:", error);
    }
  };

  const addSelectedToCart = async () => {
    try {
      await Promise.all(
        selectedItems.map((id) =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ productId: id, quantity: 1 }),
          })
        )
      );
    } catch (error) {
      console.error("Failed to add selected items to cart:", error);
    }
  };

  return {
    items,
    loading,
    selectedItems,
    isAllSelected:
      selectedItems.length > 0 && selectedItems.length === items.length,
    removeItem,
    addToCart,
    toggleSelectItem,
    toggleSelectAll,
    removeSelected,
    addSelectedToCart,
  };
}
