import { CategoryFilters } from "@/app/category/components/category-filters";
import { CategoryHeader } from "@/app/category/components/category-header";
import { CategoryProducts } from "@/app/category/components/category-products";
import { ProductGridSkeleton } from "@/app/category/components/product-grid-skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCategoryBySlug } from "@/utility/getCategoryBySlug";
import { Suspense } from "react";

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    brand?: string;
    rating?: string;
    inStock?: string;
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = params;
  const categoryData = await getCategoryBySlug(slug);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">
                  {params.slug.replace("-", " ")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <Suspense
          fallback={
            <div className="h-32 bg-white rounded-lg animate-pulse mb-8" />
          }
        >
          <CategoryHeader slug={slug} category={categoryData.data} />
        </Suspense>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-4">
              <CategoryFilters
                slug={params.slug}
                searchParams={searchParams}
                categoryData={categoryData.data}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <Suspense fallback={<ProductGridSkeleton />}>
              <CategoryProducts
                slug={params.slug}
                searchParams={searchParams}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
