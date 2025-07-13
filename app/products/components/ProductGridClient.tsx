"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ProductGridSkeleton } from "@/app/category/components/product-grid-skeleton";

import { ProductGrid } from "@/components/product-grid";
import { fetchProducts } from "@/utility/fetchProducts";

export function ProductGridClient() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {
      categories: searchParams.get("categories") || "",
      brands: searchParams.get("brands") || "",
      rating: searchParams.get("rating") || "",
      priceMin: searchParams.get("priceMin") || "",
      priceMax: searchParams.get("priceMax") || "",
    };

    setLoading(true);
    fetchProducts(params)
      .then((res) => {
        setProducts(res?.data?.products || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams.toString()]);

  if (loading) {
    return <ProductGridSkeleton />;
  }

  return <ProductGrid products={products} />;
}
