// lib/api/fetchCartFromAPI.ts

export interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
  [key: string]: any;
}

export interface CartResponse {
  items: CartItem[];
  total?: number;
}

export async function fetchCartFromAPI(accessToken: string) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!API_BASE_URL) throw new Error("API_BASE_URL is not defined");

  try {
    const res = await fetch(`${API_BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text(); // 🔍 see server response
      console.error("Fetch Cart Error Response:", errorText);
      throw new Error(`Failed to fetch cart from API: ${res.status}`);
    }

    const data = await res.json();
    return data.cart?.items || [];
  } catch (error) {
    console.error("fetchCartFromAPI Error:", error);
    throw error;
  }
}
