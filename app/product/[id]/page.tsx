import { ProductDetailsSkeleton } from "@/app/product/components/product-details-skeleton";
import { ProductReviews } from "@/app/product/components/product-reviews";
import { RelatedProducts } from "@/app/product/components/related-products";
import { fetchProductById } from "@/utility/fetchProductById";
import { fetchRelatedProductsByCategory } from "@/utility/fetchRelatedProducts";
import { Suspense } from "react";
import { ProductDetails } from "../components/product-details/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchProductById(params.id);

  const relatedProducts = await fetchRelatedProductsByCategory(
    product.categoryId,
    product.id // Exclude current product
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails product={product} />
      </Suspense>

      <div className="mt-16">
        <ProductReviews productId={product.id} />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
