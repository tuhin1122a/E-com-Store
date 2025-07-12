export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  buyers?: User[]; // <- Used in the `ProductReviews` to check verified buyer
}
