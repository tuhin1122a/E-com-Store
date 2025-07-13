"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export function CustomerInfo({ order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="font-medium">
              {order?.user?.firstName} {order?.user?.lastName}
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="flex items-center gap-2">
                <Mail className="h-3 w-3" /> {order?.user?.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3 w-3" /> {order?.user?.phone}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
