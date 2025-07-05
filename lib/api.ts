const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    // Only access localStorage on client
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
  }

  // ✅ Store token locally
  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  // ✅ Remove token
  removeToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }

  // ✅ Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      credentials: "include", // 🔒 Required for cookie-based auth
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // ✅ Prevent caching
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    return data;
  }

  // ✅ Fetch currently logged-in user
  async getCurrentUser() {
    return this.request<{ success: boolean; data: any }>("/auth/me");
  }

  // ✅ Register
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  // ✅ Login
  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{
      success: boolean;
      data: {
        token: string;
        refreshToken?: string;
        user: any;
      };
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response?.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  // ✅ Logout (optional if your backend supports it)
  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  // ✅ Products
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    featured?: boolean;
  }) {
    const searchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const queryString = searchParams.toString();
    return this.request(`/products${queryString ? `?${queryString}` : ""}`);
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  // ✅ Categories
  async getCategories() {
    return this.request("/categories");
  }

  // ✅ Cart
  async getCart() {
    return this.request("/cart");
  }

  async addToCart(data: {
    productId: string;
    variantId?: string;
    quantity?: number;
  }) {
    return this.request("/cart/add", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.request(`/cart/update/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(itemId: string) {
    return this.request(`/cart/remove/${itemId}`, {
      method: "DELETE",
    });
  }

  // ✅ Wishlist
  async getWishlist() {
    return this.request("/wishlist");
  }

  async addToWishlist(productId: string) {
    return this.request("/wishlist/add", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });
  }

  async removeFromWishlist(productId: string) {
    return this.request(`/wishlist/remove/${productId}`, {
      method: "DELETE",
    });
  }

  // ✅ Orders
  async createOrder(orderData: {
    billingAddress: any;
    shippingAddress: any;
    paymentMethod: string;
    couponCode?: string;
  }) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  async getOrders() {
    return this.request("/orders");
  }

  // ✅ Newsletter
  async subscribeNewsletter(email: string) {
    return this.request("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }
}

// ✅ Export singleton
export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
