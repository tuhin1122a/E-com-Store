export async function fetchRelatedProductsByCategory(
  categoryId: string,
  excludeProductId: string
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${categoryId}/related?exclude=${excludeProductId}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch related products");
    return res.json();
  } catch (error) {
    console.error("Error fetching related products", error);
    return [];
  }
}
