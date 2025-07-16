import { auth } from "@/auth";
import { fetchCartFromAPI } from "@/utility/fetchCartFromAPI";
import CartClient from "./components/CartClient";

export const metadata = {
  title: "Your Shopping Cart - EcomStore",
  description:
    "View and manage the items in your EcomStore cart. Adjust quantities, remove products, and proceed to checkout.",
  robots: "noindex, nofollow", // protects user-specific data
  openGraph: {
    title: "Your Shopping Cart - EcomStore",
    description:
      "Manage the items in your cart and prepare for checkout at EcomStore.",
    url: "https://yourdomain.com/cart", // Replace with your domain
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Your Shopping Cart - EcomStore",
    description:
      "Quickly manage your cart and proceed to checkout on EcomStore.",
  },
};

export default async function CartPage() {
  const session = await auth();
  const token = session?.user?.accessToken;
  const cartData = await fetchCartFromAPI(token);
  return <CartClient cartData={cartData} token={token} />;
}
