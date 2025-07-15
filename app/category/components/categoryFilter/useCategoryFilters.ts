// components/category/filters/useCategoryFilters.ts
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const priceRangeDefault = { min: 0, max: 500 };

export const useCategoryFilters = (slug: string) => {
  const router = useRouter();
  const urlSearchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState<number[]>([
    Number(urlSearchParams.get("minPrice")) || priceRangeDefault.min,
    Number(urlSearchParams.get("maxPrice")) || priceRangeDefault.max,
  ]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    urlSearchParams.get("brand")?.split(",") || []
  );

  const [selectedRating, setSelectedRating] = useState<number | null>(
    urlSearchParams.get("rating") ? Number(urlSearchParams.get("rating")) : null
  );

  const [inStockOnly, setInStockOnly] = useState(
    urlSearchParams.get("inStock") === "true"
  );

  const updateURL = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(urlSearchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });

    params.delete("page"); // Reset pagination when filters change

    // ✅ Prevent page scroll reset on navigation
    router.push(`/category/${slug}?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    setPriceRange([priceRangeDefault.min, priceRangeDefault.max]);
    setSelectedBrands([]);
    setSelectedRating(null);
    setInStockOnly(false);

    // ✅ Also preserve scroll on clear
    router.push(`/category/${slug}`, { scroll: false });
  };

  return {
    priceRange,
    setPriceRange,
    selectedBrands,
    setSelectedBrands,
    selectedRating,
    setSelectedRating,
    inStockOnly,
    setInStockOnly,
    updateURL,
    clearAllFilters,
  };
};
