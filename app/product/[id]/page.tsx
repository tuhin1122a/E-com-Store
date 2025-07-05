import { ProductDetails } from "@/app/product/components/product-details";
import { ProductDetailsSkeleton } from "@/app/product/components/product-details-skeleton";
import { ProductReviews } from "@/app/product/components/product-reviews";
import { RelatedProducts } from "@/app/product/components/related-products";
import { Suspense } from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails productId={params.id} />
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
