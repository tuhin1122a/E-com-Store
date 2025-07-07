import { ProductDetails } from "@/app/product/components/product-details";
import { ProductDetailsSkeleton } from "@/app/product/components/product-details-skeleton";
import { ProductReviews } from "@/app/product/components/product-reviews";
import { RelatedProducts } from "@/app/product/components/related-products";
import { fetchProductById } from "@/utility/fetchProductById";
import { Suspense } from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = params.id;
  const product = await fetchProductById(productId);

  console.log("Product fetched:", product);
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails product={product} />
      </Suspense>

      <div className="mt-16">
        <ProductReviews productId={params.id} />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <RelatedProducts productId={params.id} />
      </div>
    </div>
  );
}
