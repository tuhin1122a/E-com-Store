"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// ✅ Cart item structure
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

// ✅ Context value type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: { id: string }) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  isInCart: (productId: string) => boolean;
  fetchCart: () => Promise<void>;
  isLoading: boolean;
}

// ✅ Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// ✅ Provider props
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken as string | undefined;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // ✅ Fetch cart from backend
  const fetchCart = async () => {
    if (!token || !API_BASE_URL) return;
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
      console.error("Fetch cart failed", error);
      setCartItems([]);
    }
  };

  // ✅ On auth status change
  useEffect(() => {
    if (status === "authenticated") {
      fetchCart();
    } else if (status === "unauthenticated") {
      setCartItems([]);
    }
  }, [status]);

  // ✅ Add product
  const addToCart = async (product: { id: string }) => {
    if (!token || !API_BASE_URL) return;
    try {
      const res = await fetch(`${API_BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Add to cart failed");
      }

      await fetchCart(); // 🔁 keep UI in sync
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  // ✅ Remove product
  const removeFromCart = async (productId: string) => {
    if (!token || !API_BASE_URL) return;
    try {
      const res = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Remove from cart failed");
      }

      await fetchCart(); // 🔁 refresh cart after removal
    } catch (error) {
      console.error("Remove from cart failed", error);
    }
  };

  // ✅ Check if product is in cart
  const isInCart = (productId: string): boolean => {
    return (
      cartItems?.some(
        (item) =>
          item.productId === productId ||
          item._id === productId ||
          item.product?.id === productId
      ) || false
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems || [],
        addToCart,
        removeFromCart,
        isInCart,
        fetchCart,
        isLoading: cartItems === null,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Export context hook
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
