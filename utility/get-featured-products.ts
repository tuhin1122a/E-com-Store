export async function getFeaturedProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/featured`,
      {
        method: "GET",
        cache: "no-store", // no caching
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch featured products: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}
