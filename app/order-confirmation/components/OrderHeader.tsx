import { CheckCircle } from "lucide-react";

export default function OrderHeader() {
  return (
    <div className="text-center mb-8">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-muted-foreground">
        Thank you for your purchase. Your order has been confirmed and will be
        shipped soon.
      </p>
    </div>
  );
}
