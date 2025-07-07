export const fetchProductById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch product with id ${id}`);
    }

    const product = await res.json();
    return product.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
