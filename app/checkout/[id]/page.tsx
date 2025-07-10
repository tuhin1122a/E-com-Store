"use client";

import { CheckoutSteps } from "@/app/checkout/components/checkout-steps";
import { CheckoutSummary } from "@/app/checkout/components/checkout-summary";
import { OrderReview } from "@/app/checkout/components/order-review";
import { PaymentForm } from "@/app/checkout/components/payment-form";
import { ShippingForm } from "@/app/checkout/components/shipping-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CheckoutData {
  shippingAddress: any;
  billingAddress: any;
  paymentMethod: string;
  sameAsBilling: boolean;
}

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    shippingAddress: {},
    billingAddress: {},
    paymentMethod: "",
    sameAsBilling: true,
  });

  const { cartItems, loading, fetchCart } = useCart();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      router.push("/login?redirect=/checkout");
    }
  }, [user, router]);

  const handleStepComplete = (step: number, data: any) => {
    setCheckoutData((prev) => ({ ...prev, ...data }));
    setCurrentStep(step + 1);
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        billingAddress: checkoutData.billingAddress,
        shippingAddress: checkoutData.sameAsBilling
          ? checkoutData.billingAddress
          : checkoutData.shippingAddress,
        paymentMethod: checkoutData.paymentMethod,
      };

      // Replace this with actual API call to place order
      console.log("Placing order:", orderData);
      router.push("/order-confirmation/success");
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  if (!user) {
    return null;
  }

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
              <PaymentForm
                onComplete={(data) => handleStepComplete(2, data)}
                onBack={() => setCurrentStep(1)}
                initialData={checkoutData}
              />
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
