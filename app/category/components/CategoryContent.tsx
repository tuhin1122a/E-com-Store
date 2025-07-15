"use client";

import { CategoryProducts } from "@/app/category/components/category-products";
import { ProductGridSkeleton } from "@/app/category/components/product-grid-skeleton";
import { Suspense, useEffect, useRef } from "react";
import { CategoryFilters } from "./categoryFilter/CategoryFilters";

interface Props {
  slug: string;
  categoryData: any;
  searchParams: Record<string, string | undefined>;
}

export function CategoryContent({ slug, categoryData, searchParams }: Props) {
  const productsRef = useRef<HTMLDivElement>(null);

  // On searchParams change, smooth scroll products container to top
  useEffect(() => {
    if (productsRef.current) {
      productsRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  return (
    <div className="lg:h-[calc(100vh-200px)] flex flex-col lg:flex-row gap-8 overflow-hidden">
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-80 shrink-0 lg:sticky top-24 self-start z-10 bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800">
        <CategoryFilters
          slug={slug}
          searchParams={searchParams}
          categoryData={categoryData}
        />
      </aside>

      {/* Products Grid */}
      <div
        className="flex-1 overflow-y-auto pr-1"
        ref={productsRef}
        tabIndex={-1} // allows focus if needed
      >
        <Suspense fallback={<ProductGridSkeleton />}>
          <CategoryProducts slug={slug} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
