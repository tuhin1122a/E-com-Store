import { auth } from "@/auth";
import AccountPageClient from "./components/AccountClient";

export default async function AccountPage() {
  const session = await auth();
  const accessToken = session?.user?.accessToken;

  if (!accessToken) {
    return <div>Unauthorized</div>;
  }

  // 🔁 Call the API from the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    // Revalidate or not depending on use case:
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    return <div>Failed to fetch user</div>;
  }

  const data = await res.json();
  const user = data.data; // assuming { data: { id, email, ... } }

  return <AccountPageClient user={user} />;
}
