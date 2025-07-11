import { ProductCardClient } from "./ProductCardClient";

export function ProductCard({ product }: ProductCardProps) {
  return <ProductCardClient product={product} />;
}
