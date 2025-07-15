import { auth } from "@/auth";
import WishlistPageClient from "./components/WishlistPageClient";

export const metadata = {
  title: "Your Wishlist - EcomStore",
  description:
    "View and manage your wishlist items. Add favorites to your cart and keep track of your desired products.",
  openGraph: {
    title: "Your Wishlist - EcomStore",
    description:
      "View and manage your wishlist items. Add favorites to your cart and keep track of your desired products.",
    url: "https://yourdomain.com/wishlist",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Your Wishlist - EcomStore",
    description:
      "View and manage your wishlist items. Add favorites to your cart and keep track of your desired products.",
  },
  robots: "index, follow",
};

export default function WishlistPage() {
  const session = auth();
  return <WishlistPageClient user={session?.user} />;
}
