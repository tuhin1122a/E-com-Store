// app/account/components/account-overview.tsx

"use client";

import { useUser } from "@/context/UserContext";
import { useWishlist } from "@/context/WishlistContext";
import { CreditCard, Heart, MapPin, ShoppingBag, Star } from "lucide-react";
import { QuickAction } from "./QuickAction";
import { RecentOrders } from "./RecentOrders";
import { StatCard } from "./StatCard";

export function AccountOverview() {
  const { wishlistItems } = useWishlist();
  const { userData } = useUser();

  if (!userData) {
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

  const totalOrders = userData.orders?.length || 0;
  const wishlistCount = wishlistItems?.length || 0;
  const addressCount = userData.addresses?.length || 0;
  const recentOrders = userData.orders?.slice(0, 3) || [];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<ShoppingBag className="text-primary" />}
          label="Total Orders"
          value={totalOrders}
        />
        <StatCard
          icon={<Heart className="text-red-500" />}
          label="Wishlist Items"
          value={wishlistCount}
          bg="bg-red-100"
        />
        <StatCard
          icon={<MapPin className="text-green-500" />}
          label="Saved Addresses"
          value={addressCount}
          bg="bg-green-100"
        />
      </div>

      <RecentOrders recentOrders={recentOrders} />

      <div>
        <h2 className="sr-only">Quick Actions</h2>
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
      </div>
    </div>
  );
}
