export async function getAllProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // ✅ Enable ISR: revalidate every 60 seconds
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data.data; // Assuming your API returns { data: [...] }
  } catch (error) {
    console.error("getAllProducts error:", error);
    return null;
  }
}
