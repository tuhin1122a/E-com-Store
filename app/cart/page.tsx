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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

function CartSummary({ items }) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const discount = appliedCoupon ? +(subtotal * 0.1).toFixed(2) : 0;
  const total = subtotal + shipping + tax - discount;

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setAppliedCoupon("SAVE10");
      setCouponCode("");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {appliedCoupon && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({appliedCoupon})</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button variant="outline" onClick={applyCoupon}>
              Apply
            </Button>
          </div>
          {appliedCoupon && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">
                Coupon applied: {appliedCoupon}
              </span>
              <Button variant="ghost" size="sm" onClick={removeCoupon}>
                Remove
              </Button>
            </div>
          )}
        </div>
        <Button className="w-full" size="lg" asChild>
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <div className="text-center text-xs text-muted-foreground">
          <p>🔒 Secure checkout with SSL encryption</p>
          <p>💳 We accept all major credit cards</p>
        </div>
      </CardContent>
    </Card>
  );
}
