"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { statusConfig } from "@/utility/statusConfig";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function OrderHeader({ order }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 mb-6">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Order #{order?.orderNumber}</h1>
        <p className="text-muted-foreground">
          Placed on {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>
      <Badge className={statusConfig[order.status]?.color}>
        {statusConfig[order.status]?.label}
      </Badge>
    </div>
  );
}
