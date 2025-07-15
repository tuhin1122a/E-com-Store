import { ProductGridSkeleton } from "@/app/category/components/product-grid-skeleton";
import { ProductFilters } from "@/components/product-filters";
import apiClient from "@/lib/api";
import { Suspense } from "react";
import { ProductGridClient } from "./components/ProductGridClient";

export const metadata = {
  title: "All Products - EcomStore",
  description:
    "Browse our full collection of products at EcomStore. Find the best deals on electronics, apparel, and more.",
  openGraph: {
    title: "All Products - EcomStore",
    description:
      "Explore all products available at EcomStore with filters to find exactly what you need.",
    url: "https://yourdomain.com/products",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "All Products - EcomStore",
    description:
      "Explore all products available at EcomStore with filters to find exactly what you need.",
  },
  robots: "index, follow",
};

export default async function ProductsPage() {
  const categoriesData = await apiClient.getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <ProductFilters categories={categoriesData?.data} />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
          </div>

          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGridClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
