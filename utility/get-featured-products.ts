export async function getFeaturedProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/featured`,
      {
        method: "GET",
        next: { revalidate: 60 }, // ✅ SSG + ISR compatible
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
