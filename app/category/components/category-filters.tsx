"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, X } from "lucide-react"

interface CategoryFiltersProps {
  slug: string
  searchParams: {
    page?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
    brand?: string
    rating?: string
    inStock?: string
  }
}

// Mock filter data - replace with API calls
const getFilterData = (slug: string) => {
  return {
    priceRange: { min: 0, max: 500 },
    brands: [
      { id: "apple", name: "Apple", count: 45 },
      { id: "samsung", name: "Samsung", count: 38 },
      { id: "nike", name: "Nike", count: 29 },
      { id: "adidas", name: "Adidas", count: 24 },
      { id: "sony", name: "Sony", count: 19 },
      { id: "lg", name: "LG", count: 15 },
      { id: "dell", name: "Dell", count: 12 },
      { id: "hp", name: "HP", count: 10 },
    ],
    ratings: [
      { rating: 5, count: 156 },
      { rating: 4, count: 234 },
      { rating: 3, count: 89 },
      { rating: 2, count: 23 },
      { rating: 1, count: 12 },
    ],
  }
}

export function CategoryFilters({ slug, searchParams }: CategoryFiltersProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()

  const filterData = getFilterData(slug)

  const [priceRange, setPriceRange] = useState([
    Number(searchParams.minPrice) || filterData.priceRange.min,
    Number(searchParams.maxPrice) || filterData.priceRange.max,
  ])

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.brand ? searchParams.brand.split(",") : [],
  )

  const [selectedRating, setSelectedRating] = useState<number | null>(
    searchParams.rating ? Number(searchParams.rating) : null,
  )

  const [inStockOnly, setInStockOnly] = useState(searchParams.inStock === "true")

  const updateURL = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(urlSearchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    // Reset to first page when filters change
    params.delete("page")

    router.push(`/category/${slug}?${params.toString()}`)
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    let newBrands: string[]
    if (checked) {
      newBrands = [...selectedBrands, brandId]
    } else {
      newBrands = selectedBrands.filter((id) => id !== brandId)
    }

    setSelectedBrands(newBrands)
    updateURL({ brand: newBrands.length > 0 ? newBrands.join(",") : null })
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
  }

  const applyPriceFilter = () => {
    updateURL({
      minPrice: priceRange[0] > filterData.priceRange.min ? priceRange[0].toString() : null,
      maxPrice: priceRange[1] < filterData.priceRange.max ? priceRange[1].toString() : null,
    })
  }

  const handleRatingChange = (rating: number) => {
    const newRating = selectedRating === rating ? null : rating
    setSelectedRating(newRating)
    updateURL({ rating: newRating?.toString() || null })
  }

  const handleInStockChange = (checked: boolean) => {
    setInStockOnly(checked)
    updateURL({ inStock: checked ? "true" : null })
  }

  const clearAllFilters = () => {
    setPriceRange([filterData.priceRange.min, filterData.priceRange.max])
    setSelectedBrands([])
    setSelectedRating(null)
    setInStockOnly(false)
    router.push(`/category/${slug}`)
  }

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedRating !== null ||
    inStockOnly ||
    priceRange[0] > filterData.priceRange.min ||
    priceRange[1] < filterData.priceRange.max

  return (
    <div className="space-y-6">
      {/* Filter Header */}
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
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedBrands.map((brandId) => {
                const brand = filterData.brands.find((b) => b.id === brandId)
                return brand ? (
                  <Badge key={brandId} variant="secondary" className="text-xs">
                    {brand.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => handleBrandChange(brandId, false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ) : null
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

              {(priceRange[0] > filterData.priceRange.min || priceRange[1] < filterData.priceRange.max) && (
                <Badge variant="secondary" className="text-xs">
                  ${priceRange[0]} - ${priceRange[1]}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => {
                      setPriceRange([filterData.priceRange.min, filterData.priceRange.max])
                      updateURL({ minPrice: null, maxPrice: null })
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={filterData.priceRange.max}
              step={10}
              className="w-full"
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

      {/* Availability Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={handleInStockChange} />
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
            {filterData.brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={brand.id}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                />
                <Label htmlFor={brand.id} className="flex-1 text-sm cursor-pointer">
                  {brand.name}
                </Label>
                <span className="text-xs text-muted-foreground">({brand.count})</span>
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
          <div className="space-y-2">
            {filterData.ratings.map((item) => (
              <div
                key={item.rating}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleRatingChange(item.rating)}
              >
                <Checkbox checked={selectedRating === item.rating} readOnly />
                <div className="flex items-center space-x-1 flex-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm ml-1">& Up</span>
                </div>
                <span className="text-xs text-muted-foreground">({item.count})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
