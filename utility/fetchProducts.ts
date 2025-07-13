// utils/fetchProducts.ts

interface FetchProductsParams {
  page?: number;
  limit?: number;
  categories?: string;
  brands?: string;
  rating?: string;
  priceMin?: string;
  priceMax?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export async function fetchProducts(params: FetchProductsParams = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("API base URL not found in .env");

  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", String(params.page));
  if (params.limit) queryParams.append("limit", String(params.limit));
  if (params.categories) queryParams.append("category", params.categories);
  if (params.brands) queryParams.append("brand", params.brands);
  if (params.rating) queryParams.append("rating", params.rating);
  if (params.priceMin) queryParams.append("minPrice", params.priceMin);
  if (params.priceMax) queryParams.append("maxPrice", params.priceMax);
  if (params.search) queryParams.append("search", params.search);
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

  const url = `${baseUrl}/products?${queryParams.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 }, // disable caching for client use
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
