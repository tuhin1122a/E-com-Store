import { ProductGridSkeleton } from "@/app/category/components/product-grid-skeleton";
import { ProductFilters } from "@/components/product-filters";
import { ProductGrid } from "@/components/product-grid";
import { getAllProducts } from "@/utility/getAllProducts";
import { Suspense } from "react";

export default async function ProductsPage() {
  const productsData = await getAllProducts();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <ProductFilters />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="text-sm text-muted-foreground">
              Showing 1-20 of 1,234 products
            </div>
          </div>

          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={productsData?.products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
