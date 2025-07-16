"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartItem {
  _id: string;
  productId: string;
  product?: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
  price: number;
  [key: string]: any;
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartItemQuantity: (
    productId: string,
    quantity: number
  ) => Promise<void>;
  isInCart: (productId: string) => boolean;
  addSelectedToCart: (productIds: string[]) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchCart = async () => {
    if (!token || !API_BASE_URL) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCartItems(data.cart?.items || []);
    } catch (error) {
      console.error(error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [session]);

  const isInCart = (productId: string) => {
    return cartItems.some(
      (item) =>
        item.productId === productId ||
        item._id === productId ||
        item.product?.id === productId
    );
  };

  const addToCart = async (productId: string, quantity = 1) => {
    if (!token || !API_BASE_URL) return;

    const prevCart = [...cartItems];

    const existingItem = cartItems.find(
      (item) =>
        item.productId === productId ||
        item.product?.id === productId ||
        item._id === productId
    );

    // ✅ Optimistic Update
    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === productId || item.product?.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          _id: productId,
          productId,
          quantity,
          price: 0, // price may be updated after fetch
        },
      ]);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) {
        throw new Error("Add to cart failed");
      }

      await fetchCart(); // Sync latest cart
    } catch (error) {
      console.error("Add to cart failed", error);
      setCartItems(prevCart); // 🔁 Rollback
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!token || !API_BASE_URL) return;

    const prevCart = [...cartItems];

    // ✅ Optimistic Remove
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          item.productId !== productId &&
          item.product?.id !== productId &&
          item._id !== productId
      )
    );

    try {
      const res = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Remove from cart failed");
      }

      await fetchCart(); // Sync
    } catch (error) {
      console.error("Remove from cart failed", error);
      setCartItems(prevCart); // 🔁 Rollback
    }
  };

  const updateCartItemQuantity = async (
    productId: string,
    quantity: number
  ) => {
    if (!token || !API_BASE_URL) return;

    const prevCart = [...cartItems];

    // ✅ Optimistic Update
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ||
        item.product?.id === productId ||
        item._id === productId
          ? { ...item, quantity }
          : item
      )
    );

    try {
      const res = await fetch(`${API_BASE_URL}/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) {
        throw new Error("Failed to update cart quantity");
      }

      await fetchCart(); // Sync with backend
    } catch (error) {
      console.error("Update quantity failed:", error);
      setCartItems(prevCart); // 🔁 Rollback
    }
  };

  const addSelectedToCart = async (productIds: string[]) => {
    if (!token || !API_BASE_URL) return;

    try {
      const filteredItems: string[] = [];

      for (const productId of productIds) {
        try {
          const res = await fetch(`${API_BASE_URL}/cart/check/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!res.ok) continue;
          const data = await res.json();
          if (!data.inCart) filteredItems.push(productId);
        } catch (err) {
          console.error("Error checking cart for:", productId, err);
        }
      }

      if (filteredItems.length === 0) {
        alert("All selected items are already in your cart.");
        return;
      }

      // ✅ Optimistic update (basic placeholder)
      setCartItems((prev) => [
        ...prev,
        ...filteredItems.map((id) => ({
          _id: id,
          productId: id,
          quantity: 1,
          price: 0,
        })),
      ]);

      await Promise.all(
        filteredItems.map((productId) =>
          fetch(`${API_BASE_URL}/cart/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, quantity: 1 }),
          })
        )
      );

      alert("Selected items added to cart.");
      await fetchCart();
    } catch (error) {
      console.error("Failed to add selected items to cart:", error);
      alert("Something went wrong while adding to cart.");
      await fetchCart(); // Try to recover state
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        isInCart,
        addSelectedToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
