"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import { User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function UserMenu() {
  const { data: session } = useSession();
  const user = session?.user;
  const { userData } = useUser(); // Assuming useUser is a custom hook to get user data

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" }); // Redirects to login page after logout
  };

  const renderAvatar = () => {
    if (user?.image) {
      return (
        <div className="h-8 w-8 rounded-full overflow-hidden">
          <Image
            src={userData?.avatarUrl || user.image}
            alt={user.name || "User"}
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
      );
    }

    const initial = user?.name?.[0]?.toUpperCase() || "?";
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-sm font-semibold uppercase">
        {initial}
      </span>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {user ? renderAvatar() : <User className="h-5 w-5" />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {user ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/account">My Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/orders">Order History</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/wishlist">Wishlist</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register">Sign Up</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
