"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { CheckoutSteps } from "@/app/checkout/components/checkout-steps";
import { CheckoutSummary } from "@/app/checkout/components/checkout-summary";
import { OrderReview } from "@/app/checkout/components/order-review";
import { PaymentForm } from "@/app/checkout/components/payment-form";
import { ShippingForm } from "@/app/checkout/components/shipping-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { StripeProvider } from "@/utility/StripeProvider";

interface Address {
  type: string;
  isDefault: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

interface CheckoutData {
  shippingAddress: Partial<Address>;
  billingAddress: Partial<Address>;
  paymentMethod: string;
  sameAsBilling: boolean;
  paymentIntentId: string; // এখন এটা обязательное (required)
}

export default function CheckoutPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const accessToken = user?.accessToken;
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    shippingAddress: {},
    billingAddress: {},
    paymentMethod: "",
    sameAsBilling: true,
    paymentIntentId: "", // খালি স্ট্রিং দিয়ে শুরু দিতে পারেন
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const { cartItems, loading, fetchCart } = useCart();
  const { userData } = useUser();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const discount = appliedCoupon ? 20 : 0;
  const total = subtotal + shipping + tax - discount;
  console.log("🧾 Checkout Summary:", {
    subtotal,
    shipping,
    tax,
    discount,
    total,
  });

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/checkout");
      return;
    }

    fetchCart();

    if (userData?.addresses?.length > 0) {
      const shipping =
        userData.addresses.find((a) => a.type === "SHIPPING" && a.isDefault) ||
        userData.addresses.find((a) => a.type === "SHIPPING");

      const billing =
        userData.addresses.find((a) => a.type === "BILLING" && a.isDefault) ||
        userData.addresses.find((a) => a.type === "BILLING");

      setCheckoutData((prev) => ({
        ...prev,
        shippingAddress: shipping || {},
        billingAddress: billing || {},
      }));
    }
  }, [user, userData, router]);

  const handleStepComplete = (step: number, data: Partial<CheckoutData>) => {
    setCheckoutData((prev) => ({ ...prev, ...data }));
    setCurrentStep(step + 1);
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: user?.id,
        shippingAddress: checkoutData.shippingAddress,
        billingAddress: checkoutData.sameAsBilling
          ? checkoutData.shippingAddress
          : checkoutData.billingAddress,
        paymentMethod: checkoutData.paymentMethod,
        paymentIntentId: checkoutData.paymentIntentId,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          productName: item.product.name, // ✅ match with backend schema
          price: item.product.price,
          quantity: item.quantity,
        })),
        summary: {
          subtotal,
          shippingAmount: shipping,
          taxAmount: tax,
          discountAmount: discount,
          totalAmount: total,
          currency: "USD",
        },
      };

      console.log("🧾 Order Data:", orderData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // 🔐 send token
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Order failed");
      }

      // ✅ Navigate on success
      router.push("/order-confirmation/success");
    } catch (error) {
      console.error("❌ Failed to place order:", error);
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="py-16 text-center">
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutSteps currentStep={currentStep} />

          <div className="mt-8">
            {currentStep === 1 && (
              <ShippingForm
                onComplete={(data) => handleStepComplete(1, data)}
                initialData={checkoutData}
              />
            )}

            {currentStep === 2 && (
              <StripeProvider>
                <PaymentForm
                  onComplete={({ paymentIntentId }) => {
                    setCheckoutData((prev) => ({
                      ...prev,
                      paymentMethod: "card",
                      paymentIntentId,
                    }));
                    handleStepComplete(2, {});
                  }}
                  onBack={() => setCurrentStep(1)}
                  initialData={checkoutData}
                  total={total}
                />
              </StripeProvider>
            )}

            {currentStep === 3 && (
              <OrderReview
                checkoutData={checkoutData}
                cartItems={cartItems}
                onPlaceOrder={handlePlaceOrder}
                onBack={() => setCurrentStep(2)}
              />
            )}
          </div>
        </div>

        <div>
          <CheckoutSummary cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
}
