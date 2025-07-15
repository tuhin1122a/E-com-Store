import FAQPage from "./components/FAQPage";

export const metadata = {
  title: "Frequently Asked Questions - EcomStore",
  description:
    "Browse answers to commonly asked questions about shopping at EcomStore.",
  openGraph: {
    title: "FAQs - EcomStore",
    description: "Get help with orders, shipping, returns, and more.",
    url: "https://yourdomain.com/faq",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FAQs - EcomStore",
    description: "Customer service FAQ page for EcomStore.",
  },
  robots: "index, follow",
};

export default function Page() {
  return <FAQPage />;
}
