"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Star, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Brand {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  brands: Brand[];
}

interface CategoryFiltersProps {
  slug: string;
  categoryData: Category;
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

export function CategoryFilters({
  slug,
  categoryData,
  searchParams,
}: CategoryFiltersProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();

  const priceRangeDefault = { min: 0, max: 500 };

  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.minPrice) || priceRangeDefault.min,
    Number(searchParams.maxPrice) || priceRangeDefault.max,
  ]);

  // Use brand slug instead of brandId
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.brand ? searchParams.brand.split(",") : []
  );

  const [selectedRating, setSelectedRating] = useState<number | null>(
    searchParams.rating ? Number(searchParams.rating) : null
  );

  const [inStockOnly, setInStockOnly] = useState(
    searchParams.inStock === "true"
  );

  const updateURL = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(urlSearchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.delete("page");

    router.push(`/category/${slug}?${params.toString()}`);
  };

  const handleBrandChange = (brandSlug: string, checked: boolean) => {
    const updated = checked
      ? [...selectedBrands, brandSlug]
      : selectedBrands.filter((slug) => slug !== brandSlug);

    setSelectedBrands(updated);
    updateURL({ brand: updated.length ? updated.join(",") : null });
  };

  const applyPriceFilter = () => {
    updateURL({
      minPrice:
        priceRange[0] > priceRangeDefault.min ? priceRange[0].toString() : null,
      maxPrice:
        priceRange[1] < priceRangeDefault.max ? priceRange[1].toString() : null,
    });
  };

  const handleRatingChange = (rating: number) => {
    const newRating = selectedRating === rating ? null : rating;
    setSelectedRating(newRating);
    updateURL({ rating: newRating?.toString() || null });
  };

  const handleInStockChange = (checked: boolean) => {
    setInStockOnly(checked);
    updateURL({ inStock: checked ? "true" : null });
  };

  const clearAllFilters = () => {
    setPriceRange([priceRangeDefault.min, priceRangeDefault.max]);
    setSelectedBrands([]);
    setSelectedRating(null);
    setInStockOnly(false);
    router.push(`/category/${slug}`);
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedRating !== null ||
    inStockOnly ||
    priceRange[0] > priceRangeDefault.min ||
    priceRange[1] < priceRangeDefault.max;

  const availableBrands = categoryData?.brands.filter(
    (brand) => brand.productCount > 0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 flex flex-wrap gap-2">
            {selectedBrands.map((slug) => {
              const brand = categoryData?.brands.find((b) => b.slug === slug);
              return brand ? (
                <Badge key={slug} variant="secondary" className="text-xs">
                  {brand.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handleBrandChange(slug, false)}
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
                  onClick={() => handleRatingChange(selectedRating)}
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
                  onClick={() => handleInStockChange(false)}
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
                    setPriceRange([
                      priceRangeDefault.min,
                      priceRangeDefault.max,
                    ]);
                    updateURL({ minPrice: null, maxPrice: null });
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </CardContent>
        </Card>
      )}

      {/* Price Filter */}
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

      {/* In Stock */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={handleInStockChange}
            />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock Only
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Brand Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {availableBrands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={brand.slug}
                  checked={selectedBrands.includes(brand.slug)}
                  onCheckedChange={(checked) =>
                    handleBrandChange(brand.slug, checked as boolean)
                  }
                />
                <Label
                  htmlFor={brand.slug}
                  className="flex-1 text-sm cursor-pointer"
                >
                  {brand.name}
                </Label>
                <span className="text-xs text-muted-foreground">
                  ({brand.productCount})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Customer Rating</CardTitle>
        </CardHeader>
        <CardContent>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div
              key={rating}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleRatingChange(rating)}
            >
              <Checkbox checked={selectedRating === rating} readOnly />
              <div className="flex items-center space-x-1 flex-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm ml-1">& Up</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
