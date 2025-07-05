import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UserMenu({ user }: { user: any }) {
  const { logout } = useAuth();
  console.log(user);

  // Helper: render avatar content
  const renderAvatar = () => {
    if (user?.avatarUrl) {
      return (
        <div className="h-8 w-8 rounded-full overflow-hidden">
          <Image
            src={user.avatarUrl}
            alt={user.firstName || "User"}
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
      );
    }

    const initial = user?.firstName?.[0]?.toUpperCase() || "?";
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
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
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
