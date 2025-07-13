"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { statusConfig } from "@/utility/statusConfig";
import { Package } from "lucide-react";

export function OrderProgress({ order }) {
  const normalizedStatus = order.status?.toLowerCase();

  const getProgressValue = () => statusConfig[normalizedStatus]?.progress || 0;

  const generateTimeline = () => {
    const steps = ["pending", "processing", "shipped", "delivered"];

    // If cancelled, show only that step
    if (normalizedStatus === "cancelled") {
      return [
        {
          status: statusConfig["cancelled"].label,
          description: statusConfig["cancelled"].description,
          completed: true,
          date: order.cancelledAt,
        },
      ];
    }

    return steps.map((status) => {
      const isCompleted =
        steps.indexOf(status) <= steps.indexOf(normalizedStatus);
      let date = null;

      if (status === "shipped") date = order.shippedAt;
      if (status === "delivered") date = order.deliveredAt;

      return {
        status: statusConfig[status]?.label || status,
        description: statusConfig[status]?.description || "",
        completed: isCompleted,
        date,
      };
    });
  };

  const timeline = generateTimeline();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" /> Order Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Order Status</span>
              <span>{getProgressValue()}% Complete</span>
            </div>
            <Progress value={getProgressValue()} className="h-2" />
          </div>

          <div className="space-y-3">
            {timeline.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className={`w-3 h-3 rounded-full mt-1 ${
                    step.completed ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      step.completed
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.status}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                  {step.date && (
                    <p className="text-xs text-muted-foreground">
                      {new Date(step.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
