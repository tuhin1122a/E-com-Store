import { CategoryGrid } from "@/components/category-grid";
import { FeaturedProducts } from "@/components/featured-products";
import HeroSection from "@/components/hero/HeroSection";

import { ProductCardSkeleton } from "@/app/category/components/product-card-skeleton";
import { NewsletterSignup } from "@/components/newsletter-signup";
import apiClient from "@/lib/api";
import { getFeaturedProducts } from "@/utility/get-featured-products";
import { Suspense } from "react";

export default async function HomePage() {
  const featuredProduct = await getFeaturedProducts();
  const categoryData = await apiClient.getCategories();
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <CategoryGrid categories={categoryData.data} />
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <Suspense fallback={<ProductCardSkeleton count={8} />}>
            <FeaturedProducts products={featuredProduct?.data} />
          </Suspense>
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}
