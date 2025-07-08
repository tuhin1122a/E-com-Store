// import { CartItems } from "@/app/cart/components/cart-items";
// import { CartSummary } from "@/app/cart/components/cart-summary";

// export default function CartPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

//       <div className="grid lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <CartItems />
//         </div>
//         <div>
//           <CartSummary />
//         </div>
//       </div>
//     </div>
//   );
// }
// Updated CartPage, CartItems, and CartSummary with dynamic shared state

"use client";

import { CartItems } from "@/app/cart/components/cart-items";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CartSummary } from "./components/cart-summary";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  useEffect(() => {
    const fetchCart = async () => {
      if (!accessToken) return; // wait until token is available
      try {
        const res = await fetch(`${apiUrl}/cart`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();
        setCartItems(data?.cart?.items || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [accessToken]); // ✅ re-run when token becomes available

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) return removeItem(id);
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = async (productId) => {
    try {
      const res = await fetch(`${apiUrl}/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to remove item");
      }

      // Update local cart state
      setCartItems((items) =>
        items.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  console.log("Cart items:", cartItems);

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
