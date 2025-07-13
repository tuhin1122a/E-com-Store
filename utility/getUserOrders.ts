// utils/getUserOrders.ts

export async function getUserOrders(userId: string, accessToken: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Authenticated request
        },
        cache: "no-store", // optional: disables caching
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch orders: ${res.status}`);
    }

    const data = await res.json();
    return data.data; // or `return data` if you want full response
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
}
