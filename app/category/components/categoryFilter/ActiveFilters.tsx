// components/category/filters/ActiveFilters.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

import { Category } from "./types";
import { priceRangeDefault } from "./useCategoryFilters";

interface Props {
  categoryData: Category;
  selectedBrands: string[];
  selectedRating: number | null;
  inStockOnly: boolean;
  priceRange: number[];
  setSelectedBrands: (val: string[]) => void;
  setSelectedRating: (val: number | null) => void;
  setInStockOnly: (val: boolean) => void;
  setPriceRange: (val: number[]) => void;
  updateURL: (updates: Record<string, string | null>) => void;
}

export function ActiveFilters({
  categoryData,
  selectedBrands,
  selectedRating,
  inStockOnly,
  priceRange,
  setSelectedBrands,
  setSelectedRating,
  setInStockOnly,
  setPriceRange,
  updateURL,
}: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Active Filters</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex flex-wrap gap-2">
        {selectedBrands.map((slug) => {
          const brand = categoryData.brands.find((b) => b.slug === slug);
          return brand ? (
            <Badge key={slug} variant="secondary" className="text-xs">
              {brand.name}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => {
                  const updated = selectedBrands.filter((s) => s !== slug);
                  setSelectedBrands(updated);
                  updateURL({
                    brand: updated.length ? updated.join(",") : null,
                  });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ) : null;
        })}

        {selectedRating && (
          <Badge variant="secondary" className="text-xs">
            {selectedRating}+ Stars
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 ml-1"
              onClick={() => {
                setSelectedRating(null);
                updateURL({ rating: null });
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        {inStockOnly && (
          <Badge variant="secondary" className="text-xs">
            In Stock
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 ml-1"
              onClick={() => {
                setInStockOnly(false);
                updateURL({ inStock: null });
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}

        {(priceRange[0] > priceRangeDefault.min ||
          priceRange[1] < priceRangeDefault.max) && (
          <Badge variant="secondary" className="text-xs">
            ${priceRange[0]} - ${priceRange[1]}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 ml-1"
              onClick={() => {
                setPriceRange([priceRangeDefault.min, priceRangeDefault.max]);
                updateURL({ minPrice: null, maxPrice: null });
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
