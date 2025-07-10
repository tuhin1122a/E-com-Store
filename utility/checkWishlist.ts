export const checkWishlist = async (
  productId: string,
  token: string
): Promise<boolean> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist/check/${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      console.error("Failed to check wishlist:", res.statusText);
      return false;
    }

    const data = await res.json();
    console.log("Wishlist check response:", data.in);
    return data?.inWishlist ?? false;
  } catch (error) {
    console.error("Error checking wishlist:", error);
    return false;
  }
};
