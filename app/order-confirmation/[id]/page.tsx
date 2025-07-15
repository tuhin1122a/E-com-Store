import OrderConfirmationPage from "./components/OrderConfirmationPage";

export const metadata = {
  title: "Order Confirmation - EcomStore",
  description: "Review your EcomStore order details, shipping, and status.",
  openGraph: {
    title: "Order Confirmation - EcomStore",
    description: "Track your recent EcomStore purchase.",
    url: "https://yourdomain.com/order-confirmation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Order Confirmation - EcomStore",
    description: "Track your order, view shipping info, and manage delivery.",
  },
  robots: "noindex, follow", // Order pages are private
};

export default function Page() {
  return <OrderConfirmationPage />;
}
