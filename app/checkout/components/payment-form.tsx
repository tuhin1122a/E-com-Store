"use client";

import { Button } from "@/components/ui/button";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

interface PaymentFormProps {
  onComplete: (data: { paymentIntentId: string }) => void;
  onBack: () => void;
  initialData: any;
  total: number; // Total amount to be paid
}

export function PaymentForm({ onComplete, onBack, total }: PaymentFormProps) {
  const amount = total * 100; // Convert to cents for Stripe
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe is not loaded yet.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // STEP 1: Create payment intent from backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      const { success, data, message } = await res.json();

      if (!success)
        throw new Error(message || "Failed to create payment intent");

      // STEP 2: Confirm payment with Stripe Elements
      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) throw new Error("Card element not found");

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        throw new Error(result.error.message || "Payment failed");
      }

      if (result.paymentIntent?.status === "succeeded") {
        const paymentIntentId = result.paymentIntent.id;

        // STEP 3: Notify parent component
        onComplete({ paymentIntentId });
      } else {
        throw new Error("Payment was not successful");
      }
    } catch (err: any) {
      setError(err.message || "Payment error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    base: {
      fontSize: "16px",
      color: "#1a202c",
      "::placeholder": { color: "#a0aec0" },
    },
    invalid: { color: "#e53e3e" },
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-muted p-6 shadow-sm bg-white"
    >
      <h2 className="text-xl font-semibold mb-4">Card Information</h2>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Card Number</label>
          <div className="p-3 border rounded-md bg-gray-50">
            <CardNumberElement options={{ style: inputStyle }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Expiry Date</label>
            <div className="p-3 border rounded-md bg-gray-50">
              <CardExpiryElement options={{ style: inputStyle }} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">CVC</label>
            <div className="p-3 border rounded-md bg-gray-50">
              <CardCvcElement options={{ style: inputStyle }} />
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
        >
          Back
        </Button>
        <Button type="submit" disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay"}
        </Button>
      </div>
    </form>
  );
}
