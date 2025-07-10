"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface WishlistProduct {
  productId: string;
  // অন্যান্য প্রপার্টিজ যদি থাকে তাহলে এখানে যোগ করতে পারো
}

interface WishlistContextType {
  wishlistItems: WishlistProduct[];
  loading: boolean;
  error: any;
  selectedItems: string[];
  isAllSelected: boolean;

  fetchWishlist: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;

  toggleSelectItem: (productId: string) => void;
  toggleSelectAll: () => void;
  removeSelected: () => Promise<void>;
  addSelectedToCart: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchWishlist = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/wishlist`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch wishlist");

      const data = await res.json();
      setWishlistItems(data);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [accessToken]);

  const addToWishlist = async (productId: string) => {
    if (!accessToken) {
      alert("Login required");
      return;
    }
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
      setWishlistItems((prev) => [...prev, { productId }]);
    } catch (err) {
      console.error(err);
      alert("Could not add to wishlist");
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!accessToken) {
      alert("Login required");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/wishlist/delete/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) throw new Error("Failed to remove from wishlist");
      setWishlistItems((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
      setSelectedItems((prev) => prev.filter((id) => id !== productId));
    } catch (err) {
      console.error(err);
      alert("Could not remove from wishlist");
    }
  };

  const isInWishlist = (productId: string) =>
    wishlistItems.some((item) => item.productId === productId);

  // Selection logic

  const toggleSelectItem = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems((prev) =>
      prev.length === wishlistItems.length
        ? []
        : wishlistItems.map((item) => item.productId)
    );
  };

  const removeSelected = async () => {
    if (!accessToken) {
      alert("Login required");
      return;
    }
    try {
      await Promise.all(
        selectedItems.map((productId) =>
          fetch(`${apiUrl}/wishlist/delete/${productId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        )
      );
      setWishlistItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item.productId))
      );
      setSelectedItems([]);
    } catch (err) {
      console.error("Failed to remove selected items:", err);
      alert("Failed to remove selected items");
    }
  };

  const isAllSelected =
    selectedItems.length > 0 && selectedItems.length === wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        error,
        selectedItems,
        isAllSelected,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleSelectItem,
        toggleSelectAll,
        removeSelected,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
