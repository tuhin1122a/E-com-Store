// app/account/components/account-overview/types.ts

import { ReactNode } from "react";

export interface Stats {
  totalOrders: number;
  wishlistItems: number;
  addresses: number;
  recentOrders: Order[];
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  totalAmount: number;
  status: string;
}

export interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  bg?: string;
}

export interface QuickActionProps {
  href: string;
  label: string;
  icon: ReactNode;
}
