import { ProductDetailsSkeleton } from "@/app/product/components/product-details-skeleton";
import { RelatedProducts } from "@/app/product/components/related-products";
import { fetchProductById } from "@/utility/fetchProductById";
import { fetchRelatedProductsByCategory } from "@/utility/fetchRelatedProducts";
import { Suspense } from "react";
import { ProductDetails } from "../components/product-details/product-details";
import { ProductReviews } from "../components/reviews/ProductReviews";

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Dynamic metadata generation
export async function generateMetadata({ params }: ProductPageProps) {
  const product = await fetchProductById(params.id);

  if (!product) {
    return {
      title: "Product Not Found - EcomStore",
      description: "The product you are looking for does not exist.",
      robots: "noindex, nofollow",
    };
  }

  const firstImage =
    product.images && product.images.length > 0 ? product.images[0] : null;
  const imageUrl = firstImage
    ? typeof firstImage === "string"
      ? firstImage
      : firstImage.url
    : undefined;

  return {
    title: `${product.name} - EcomStore`,
    description:
      product.description ||
      `Buy ${product.name} at EcomStore. Great deals and fast shipping!`,
    openGraph: {
      title: `${product.name} - EcomStore`,
      description: product.description || `Buy ${product.name} at EcomStore.`,
      url: `https://yourdomain.com/product/${product.id}`,
      type: "website", // Changed from 'product' to 'website'
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - EcomStore`,
      description: product.description || `Buy ${product.name} at EcomStore.`,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: "index, follow",
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
        <ProductReviews product={product} />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
