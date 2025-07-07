"use client";

import { AccountAddresses } from "@/app/account/components/account-addresses";
import { AccountOrders } from "@/app/account/components/account-orders";
import { AccountOverview } from "@/app/account/components/account-overview";
import { AccountProfile } from "@/app/account/components/account-profile";
import { AccountSecurity } from "@/app/account/components/account-security";
import { AccountSidebar } from "@/app/account/components/account-sidebar";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const loading = useSession().status === "loading";
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="lg:col-span-3 h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <AccountOverview />;
      case "orders":
        return <AccountOrders />;
      case "profile":
        return <AccountProfile />;
      case "addresses":
        return <AccountAddresses />;
      case "security":
        return <AccountSecurity />;
      default:
        return <AccountOverview />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <AccountSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        <div className="lg:col-span-3">{renderContent()}</div>
      </div>
    </div>
  );
}
