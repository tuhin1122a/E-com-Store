"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QuickActionProps } from "./types";

export function QuickAction({ href, label, icon }: QuickActionProps) {
  return (
    <Button
      asChild
      variant="outline"
      className="h-20 flex-col items-center justify-center gap-1"
    >
      <Link href={href}>
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </Link>
    </Button>
  );
}
