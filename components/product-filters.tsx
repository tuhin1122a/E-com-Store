"use client";

import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";

export function ProductFilters({ categories }: { categories: any[] }) {
  const router = useRouter();

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [didMount, setDidMount] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  const updateQuery = () => {
    const query = qs.stringify(
      {
        categories: selectedCategories.length
          ? selectedCategories.join(",")
          : undefined,
        brands: selectedBrands.length ? selectedBrands.join(",") : undefined,
        rating: selectedRating ?? undefined,
        priceMin: priceRange[0] !== 0 ? priceRange[0] : undefined,
        priceMax: priceRange[1] !== 5000 ? priceRange[1] : undefined,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(`?${query}`);
  };

  useEffect(() => {
    if (didMount) updateQuery();
  }, [selectedCategories, selectedBrands, selectedRating, priceRange]);

  const handleCategoryChange = (slug: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, slug] : prev.filter((c) => c !== slug)
    );
  };

  const handleBrandChange = (slug: string, checked: boolean) => {
    setSelectedBrands((prev) =>
      checked ? [...prev, slug] : prev.filter((b) => b !== slug)
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRating(null);
  };

  const allBrands = categories
    .flatMap((cat) => cat.brands || [])
    .filter(
      (b, index, self) => b && self.findIndex((x) => x.id === b.id) === index
    );

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 5);
  const visibleBrands = showAllBrands ? allBrands : allBrands.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Price Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000}
            step={50}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {visibleCategories.map((cat) => (
              <div key={cat.id} className="flex items-center space-x-2">
                <Checkbox
                  id={cat.slug}
                  checked={selectedCategories.includes(cat.slug)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(cat.slug, checked as boolean)
                  }
                />
                <Label
                  htmlFor={cat.slug}
                  className="flex-1 text-sm cursor-pointer"
                >
                  {cat.name}{" "}
                  <span className="text-muted-foreground text-xs ml-1">
                    ({cat.productCount ?? 0})
                  </span>
                </Label>
              </div>
            ))}
            {categories.length > 5 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-blue-600"
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories ? "View Less" : "View More"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Brand Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {visibleBrands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.slug}`}
                  checked={selectedBrands.includes(brand.slug)}
                  onCheckedChange={(checked) =>
                    handleBrandChange(brand.slug, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`brand-${brand.slug}`}
                  className="flex-1 text-sm cursor-pointer"
                >
                  {brand.name}{" "}
                  <span className="text-muted-foreground text-xs ml-1">
                    ({brand.productCount ?? 0})
                  </span>
                </Label>
              </div>
            ))}
            {allBrands.length > 5 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-blue-600"
                onClick={() => setShowAllBrands(!showAllBrands)}
              >
                {showAllBrands ? "View Less" : "View More"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Customer Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() =>
                  setSelectedRating((prev) => (prev === rating ? null : rating))
                }
              >
                <Checkbox checked={selectedRating === rating} readOnly />
                <div className="flex items-center space-x-1">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
