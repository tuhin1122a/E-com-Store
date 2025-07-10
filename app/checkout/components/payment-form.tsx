"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Wallet } from "lucide-react";
import { useState } from "react";

interface PaymentFormProps {
  onComplete: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

export function PaymentForm({
  onComplete,
  onBack,
  initialData,
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState(
    initialData.paymentMethod || "card"
  );
  const [cardData, setCardData] = useState({
    cardNumber: initialData.cardData?.cardNumber || "",
    expiryDate: initialData.cardData?.expiryDate || "",
    cvv: initialData.cardData?.cvv || "",
    cardholderName: initialData.cardData?.cardholderName || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      paymentMethod,
      cardData: paymentMethod === "card" ? cardData : null,
    });
  };

  const handleCardInputChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="h-5 w-5" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  Credit or Debit Card
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value="paypal" id="paypal" />
                <Wallet className="h-5 w-5" />
                <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                  PayPal
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value="apple-pay" id="apple-pay" />
                <Smartphone className="h-5 w-5" />
                <Label htmlFor="apple-pay" className="flex-1 cursor-pointer">
                  Apple Pay
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {paymentMethod === "card" && (
        <Card>
          <CardHeader>
            <CardTitle>Card Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                value={cardData.cardholderName}
                onChange={(e) =>
                  handleCardInputChange("cardholderName", e.target.value)
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardData.cardNumber}
                onChange={(e) =>
                  handleCardInputChange("cardNumber", e.target.value)
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={cardData.expiryDate}
                  onChange={(e) =>
                    handleCardInputChange("expiryDate", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back to Shipping
        </Button>
        <Button type="submit" size="lg">
          Review Order
        </Button>
      </div>
    </form>
  );
}
