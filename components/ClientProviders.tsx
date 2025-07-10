"use client";

import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SessionProvider } from "next-auth/react";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>{children}</CartProvider>
        </WishlistProvider>
      </UserProvider>
    </SessionProvider>
  );
}
