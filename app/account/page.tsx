import { auth } from "@/auth";
import type { Metadata } from "next";
import AccountPageClient from "./components/AccountClient";

// ✅ Static SEO metadata for the /account page
export const metadata: Metadata = {
  title: "My Account - EcomStore",
  description:
    "Manage your EcomStore account details, orders, and preferences.",
  robots: "noindex, nofollow", // ⚠️ Important: prevent search engines from indexing private page
  openGraph: {
    title: "My Account - EcomStore",
    description: "Access your personal dashboard and manage your orders.",
    type: "website",
    url: "https://yourdomain.com/account", // replace with your real domain
  },
  twitter: {
    card: "summary",
    title: "My Account - EcomStore",
    description: "Secure dashboard to manage your EcomStore account.",
  },
};

export default async function AccountPage() {
  const session = await auth();
  const accessToken = session?.user?.accessToken;

  if (!accessToken) {
    return <div>Unauthorized</div>;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Failed to fetch user</div>;
  }

  const data = await res.json();
  const user = data.data;

  return <AccountPageClient user={user} accessToken={accessToken} />;
}
