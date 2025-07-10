"use client";

import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextType {
  wishlistItems: string[]; // ধরছি productId গুলো রাখবে
  loading: boolean;
  error: any;
  fetchWishlist: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchWishlist = async () => {
    if (!accessToken) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/wishlist`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      const data = await res.json();
      // ধরছি data.array of products or productIds
      setWishlistItems(data.map((item: any) => item.productId));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    if (!accessToken) return alert("Login required");
    try {
      const res = await fetch(`${apiUrl}/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error("Failed to add to wishlist");
      setWishlistItems((prev) => [...prev, productId]);
    } catch (err) {
      console.error(err);
      alert("Could not add to wishlist");
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!accessToken) return alert("Login required");
    try {
      const res = await fetch(`${apiUrl}/wishlist/delete/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) throw new Error("Failed to remove from wishlist");
      setWishlistItems((prev) => prev.filter((id) => id !== productId));
    } catch (err) {
      console.error(err);
      alert("Could not remove from wishlist");
    }
  };

  const isInWishlist = (productId: string) => wishlistItems.includes(productId);

  // Fetch wishlist when accessToken changes (user logs in)
  useEffect(() => {
    fetchWishlist();
  }, [accessToken]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        error,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
