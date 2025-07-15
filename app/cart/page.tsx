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

export default function CartPage() {
  return <CartClient />;
}
