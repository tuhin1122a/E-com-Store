// "use client";

// import { CategoryPagination } from "@/app/category/components/category-pagination";
// import { CategoryProductsHeader } from "@/app/category/components/category-products-header";
// import { fetchProducts } from "@/utility/fetchProducts";
// import { ProductCard } from "./product-card";

// interface CategoryProductsProps {
//   slug: string;
//   searchParams: {
//     page?: string;
//     sort?: string;
//     minPrice?: string;
//     maxPrice?: string;
//     brand?: string;
//     rating?: string;
//     inStock?: string;
//   };
// }

// export async function CategoryProducts({
//   slug,
//   searchParams,
// }: CategoryProductsProps) {
//   const { page, sort, minPrice, maxPrice, brand, rating, inStock } =
//     searchParams;

//   // Convert searchParams to fetchProducts compatible params
//   const data = await fetchProducts({
//     page: page ? parseInt(page) : 1,
//     categories: slug,
//     brands: brand,
//     rating,
//     priceMin: minPrice,
//     priceMax: maxPrice,
//     sortBy: sort,
//     sortOrder: "asc", // or "desc", update based on your sorting logic
//   });

//   console.log("Fetched Products:", data);

//   const { products, pagination } = data.data;

//   return (
//     <div className="space-y-6">
//       <CategoryProductsHeader
//         slug={slug}
//         totalProducts={products || 0}
//         currentPage={pagination?.page || 1}
//         totalPages={pagination?.pages || 1}
//         searchParams={searchParams}
//       />

//       {products && products.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//           {/* Render products here if needed */}
//           {/* Pagination */}
//           <CategoryPagination
//             slug={slug}
//             currentPage={pagination?.page || 1}
//             totalPages={pagination?.pages || 1}
//             searchParams={searchParams}
//           />
//         </>
//       ) : (
//         <div className="text-center py-16">
//           <div className="max-w-md mx-auto">
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className="text-xl font-semibold mb-2">No products found</h3>
//             <p className="text-muted-foreground mb-6">
//               Try adjusting your filters or search criteria to find what you're
//               looking for.
//             </p>
//             <button
//               onClick={() => (window.location.href = `/category/${slug}`)}
//               className="text-primary hover:underline"
//             >
//               Clear all filters
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { CategoryPagination } from "@/app/category/components/category-pagination";
import { CategoryProductsHeader } from "@/app/category/components/category-products-header";
import { fetchProducts } from "@/utility/fetchProducts";
import { ProductCard } from "./product-card";

interface CategoryProductsProps {
  slug: string;
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

export function CategoryProducts({
  slug,
  searchParams,
}: CategoryProductsProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const router = useRouter();
  const urlParams = useSearchParams();
  const sort = urlParams.get("sort") || "featured";

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts({
          page: searchParams.page ? parseInt(searchParams.page) : 1,
          categories: slug,
          brands: searchParams.brand,
          rating: searchParams.rating,
          priceMin: searchParams.minPrice,
          priceMax: searchParams.maxPrice,
        });

        setProducts(data.data.products || []);
        setPagination({
          page: data.data.pagination?.page || 1,
          pages: data.data.pagination?.pages || 1,
          total: data.data.pagination?.total || 0,
        });
      } catch (err) {
        console.error("Product fetch failed:", err);
      }
    };

    loadProducts();
  }, [slug, urlParams.toString()]);

  // ⬇️ Client-side sorting based on query param
  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sort) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.averageRating - a.averageRating);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "featured":
      default:
        return sorted; // keep order as is
    }
  }, [products, sort]);

  return (
    <div className="space-y-6">
      <CategoryProductsHeader
        slug={slug}
        totalProducts={products}
        currentPage={pagination.page}
        totalPages={pagination.pages}
        searchParams={searchParams}
      />

      {sortedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <CategoryPagination
            slug={slug}
            currentPage={pagination.page}
            totalPages={pagination.pages}
            searchParams={searchParams}
          />
        </>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search criteria to find what you're
              looking for.
            </p>
            <button
              onClick={() => (window.location.href = `/category/${slug}`)}
              className="text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
