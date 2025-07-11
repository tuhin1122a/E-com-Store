"use client";

import { CartItems } from "@/app/cart/components/cart-items";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { CartSummary } from "./components/cart-summary";

export default function CartPage() {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const {
    cartItems,
    loading,
    removeFromCart,
    fetchCart,
    updateCartItemQuantity,
  } = useCart();

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      await updateCartItemQuantity(productId, newQuantity); // ✅ working now
    }
  };

  const removeItem = async (productId: string) => {
    await removeFromCart(productId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItems
            items={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            accessToken={accessToken}
          />
        </div>
        <div>
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
}
