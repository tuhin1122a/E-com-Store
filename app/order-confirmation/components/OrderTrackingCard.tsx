import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Truck } from "lucide-react";

export default function OrderTrackingCard({ createdAt }: any) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Order Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TrackingStep
            icon={<CheckCircle className="h-5 w-5 text-white" />}
            label="Order Confirmed"
            date={createdAt}
            active
          />
          <TrackingStep
            icon={<Package className="h-5 w-5 text-gray-500" />}
            label="Processing"
            note="We're preparing your order"
          />
          <TrackingStep
            icon={<Truck className="h-5 w-5 text-gray-500" />}
            label="Shipped"
            note="Your order is on the way"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function TrackingStep({ icon, label, date, note, active = false }: any) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? "bg-green-500" : "bg-gray-200"}`}
      >
        {icon}
      </div>
      <div>
        <p className={`font-medium ${!active ? "text-muted-foreground" : ""}`}>
          {label}
        </p>
        <p className="text-sm text-muted-foreground">
          {note || new Date(date).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
