// utils/api/getCategoryBySlug.ts

export const getCategoryBySlug = async (slug: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_URL is not defined in environment variables."
      );
    }

    const res = await fetch(`${baseUrl}/categories/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // optional: disables caching if used in server components
    });

    const data = await res.json();

    if (!res.ok || data?.success === false) {
      console.warn("Category fetch failed:", data?.message);
      return null;
    }

    return data.data; // assuming your response structure is { success, message, data }
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
};
