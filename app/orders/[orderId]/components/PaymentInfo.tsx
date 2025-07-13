"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export function PaymentInfo({ order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" /> Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{order?.paymentMethod}</p>
      </CardContent>
    </Card>
  );
}
