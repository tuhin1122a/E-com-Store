"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StoreMap() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Visit Our Store</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Interactive Map Coming Soon</p>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Store Information</h4>
          <p className="text-sm text-muted-foreground">
            Visit our flagship store for hands-on product demonstrations, expert
            advice, and exclusive in-store offers. Free parking available.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
