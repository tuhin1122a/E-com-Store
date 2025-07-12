"use client";

import { Card, CardContent } from "@/components/ui/card";
import { StatCardProps } from "./types";

export function StatCard({
  icon,
  label,
  value,
  bg = "bg-primary/10",
}: StatCardProps) {
  return (
    <Card className="transition hover:shadow-md">
      <CardContent className="flex items-center gap-4 p-6">
        <div className={`p-3 rounded-xl ${bg}`}>{icon}</div>
        <div>
          <p className="text-xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
