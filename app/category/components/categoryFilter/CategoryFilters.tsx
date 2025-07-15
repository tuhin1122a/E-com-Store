// components/category/filters/CategoryFilters.tsx
"use client";

import { Button } from "@/components/ui/button";

import { ActiveFilters } from "./ActiveFilters";
import { BrandFilter } from "./BrandFilter";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";
import { StockFilter } from "./StockFilter";
import { Category } from "./types";
import { useCategoryFilters } from "./useCategoryFilters";

interface Props {
  slug: string;
  categoryData: Category | null;
}

export function CategoryFilters({ slug, categoryData }: Props) {
  const {
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
  } = useCategoryFilters(slug);

  if (!categoryData) {
    return (
      <div className="text-muted-foreground text-sm">
        Filters are unavailable at the moment.
      </div>
    );
  }

  const hasFilters =
    selectedBrands.length > 0 ||
    selectedRating !== null ||
    inStockOnly ||
    priceRange[0] > 0 ||
    priceRange[1] < 500;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      {hasFilters && (
        <ActiveFilters
          categoryData={categoryData}
          selectedBrands={selectedBrands}
          selectedRating={selectedRating}
          inStockOnly={inStockOnly}
          priceRange={priceRange}
          updateURL={updateURL}
          setPriceRange={setPriceRange}
          setSelectedBrands={setSelectedBrands}
          setSelectedRating={setSelectedRating}
          setInStockOnly={setInStockOnly}
        />
      )}

      <PriceFilter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        updateURL={updateURL}
      />

      <StockFilter
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        updateURL={updateURL}
      />

      <BrandFilter
        brands={categoryData.brands}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        updateURL={updateURL}
      />

      <RatingFilter
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        updateURL={updateURL}
      />
    </div>
  );
}
