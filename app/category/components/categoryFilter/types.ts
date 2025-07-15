// components/category/types.ts
export interface Brand {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  brands: Brand[];
}
