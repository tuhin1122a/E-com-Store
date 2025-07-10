"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  LogOut,
  MapPin,
  Shield,
  ShoppingBag,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";

interface AccountSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "profile", label: "Profile", icon: User },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "security", label: "Security", icon: Shield },
];

export function AccountSidebar({
  activeSection,
  onSectionChange,
  user,
}: AccountSidebarProps) {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" }); // ✅ Redirects to login page after logout
  };
  const name = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <Card className="shadow-xl rounded-xl border border-border">
      <CardContent className="p-6">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <Avatar className="h-14 w-14 ring-2 ring-primary/30 hover:ring-primary transition-all">
            <AvatarImage
              src={user?.avatarUrl || "/placeholder.svg"}
              alt={user?.name || "User"}
              className="object-cover"
            />
            <AvatarFallback className="bg-muted text-primary font-semibold">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg leading-tight">
              {user?.name}
            </h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full flex items-center gap-3 justify-start px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-muted hover:text-foreground",
                  isActive &&
                    "bg-primary/10 text-primary font-semibold hover:bg-primary/20"
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="pt-6 mt-6 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center gap-3 justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
