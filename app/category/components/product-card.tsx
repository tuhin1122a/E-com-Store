import { auth } from "@/auth";
import { checkWishlist } from "@/utility/checkWishlist";
import { ProductCardClient } from "./ProductCardClient";

export async function ProductCard({ product }: ProductCardProps) {
  const session = await auth();
  const accessToken = session?.user?.accessToken;

  const isWishlisted = accessToken
    ? await checkWishlist(product.id, accessToken)
    : false;

  return <ProductCardClient product={product} isWishlisted={isWishlisted} />;
}
