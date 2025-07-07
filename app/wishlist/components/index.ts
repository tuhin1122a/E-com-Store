// src/types/index.ts

export interface WishlistProduct {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviewCount: number;
    isOnSale: boolean;
    badge?: string;
    inStock: boolean;
  };
  createdAt: string;
}
