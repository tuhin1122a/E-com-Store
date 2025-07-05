"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const categories = [
    { id: "electronics", name: "Electronics", count: 234 },
    { id: "clothing", name: "Clothing", count: 156 },
    { id: "home-garden", name: "Home & Garden", count: 89 },
    { id: "sports", name: "Sports", count: 67 },
    { id: "books", name: "Books", count: 45 },
    { id: "beauty", name: "Beauty", count: 78 },
  ]

  const brands = [
    { id: "apple", name: "Apple", count: 45 },
    { id: "samsung", name: "Samsung", count: 38 },
    { id: "nike", name: "Nike", count: 29 },
    { id: "adidas", name: "Adidas", count: 24 },
    { id: "sony", name: "Sony", count: 19 },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId])
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId))
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 500])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedRating(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <Label htmlFor={category.id} className="flex-1 text-sm cursor-pointer">
                  {category.name}
                </Label>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brands.map((brand) => (
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

      {/* Rating */}
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
                onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
              >
                <Checkbox checked={selectedRating === rating} readOnly />
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
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
  )
}
