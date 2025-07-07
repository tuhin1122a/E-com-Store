// app/account/components/account-overview.tsx

"use client";

import {
  CreditCard,
  Heart,
  MapPin,
  Package,
  ShoppingBag,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWishlist } from "@/hooks/use-wishlist";
import { apiClient } from "@/lib/api";

export function AccountOverview() {
  const { items } = useWishlist();

  const [stats, setStats] = useState({
    totalOrders: 0,
    wishlistItems: 5,
    addresses: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccountStats();
  }, []);

  const fetchAccountStats = async () => {
    try {
      const [orders, wishlist] = await Promise.all([
        apiClient.getOrders(),
        apiClient.getWishlist(),
      ]);

      setStats({
        totalOrders: orders.length,
        wishlistItems: wishlist.length,
        addresses: 2, // Replace with actual API later
        recentOrders: orders.slice(0, 3),
      });
    } catch (error) {
      console.error("Failed to fetch account stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
        <div className="h-64 rounded-xl bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<ShoppingBag className="text-primary" />}
          label="Total Orders"
          value={stats.totalOrders}
        />
        <StatCard
          icon={<Heart className="text-red-500" />}
          label="Wishlist Items"
          value={items.length}
          bg="bg-red-100"
        />
        <StatCard
          icon={<MapPin className="text-green-500" />}
          label="Saved Addresses"
          value={stats.addresses}
          bg="bg-green-100"
        />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
          <Button asChild size="sm" variant="outline">
            <Link href="/account?section=orders">View All</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.recentOrders.length === 0 ? (
            <div className="text-center py-10">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                You haven’t placed any orders yet.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            stats.recentOrders.map((order: any) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:shadow-sm transition"
              >
                <div>
                  <p className="text-sm font-medium">
                    Order #{order.orderNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">${order.totalAmount}</p>
                  <Badge
                    variant={
                      order.status === "delivered" ? "default" : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction
              href="/wishlist"
              label="Wishlist"
              icon={<Heart className="h-6 w-6 mb-1" />}
            />
            <QuickAction
              href="/account?section=addresses"
              label="Addresses"
              icon={<MapPin className="h-6 w-6 mb-1" />}
            />
            <QuickAction
              href="/account?section=security"
              label="Payment"
              icon={<CreditCard className="h-6 w-6 mb-1" />}
            />
            <QuickAction
              href="/contact"
              label="Support"
              icon={<Star className="h-6 w-6 mb-1" />}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Reusable Subcomponents ---

function StatCard({ icon, label, value, bg = "bg-primary/10" }: any) {
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

function QuickAction({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
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
