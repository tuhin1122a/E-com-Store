// components/category/filters/PriceFilter.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { priceRangeDefault } from "./useCategoryFilters";

export function PriceFilter({
  priceRange,
  setPriceRange,
  updateURL,
}: {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  updateURL: (updates: Record<string, string | null>) => void;
}) {
  const applyPriceFilter = () => {
    updateURL({
      minPrice:
        priceRange[0] > priceRangeDefault.min ? priceRange[0].toString() : null,
      maxPrice:
        priceRange[1] < priceRangeDefault.max ? priceRange[1].toString() : null,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Price Range</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={priceRangeDefault.max}
            step={10}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <Button size="sm" onClick={applyPriceFilter} className="w-full">
            Apply Price Filter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
