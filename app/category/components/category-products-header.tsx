"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Grid3X3, List, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

interface CategoryProductsHeaderProps {
  slug: string
  totalProducts: number
  currentPage: number
  totalPages: number
  searchParams: {
    sort?: string
    [key: string]: string | undefined
  }
}

export function CategoryProductsHeader({
  slug,
  totalProducts,
  currentPage,
  totalPages,
  searchParams,
}: CategoryProductsHeaderProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "name", label: "Name: A to Z" },
  ]

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(urlSearchParams.toString())
    if (value === "featured") {
      params.delete("sort")
    } else {
      params.set("sort", value)
    }
    params.delete("page") // Reset to first page when sorting changes
    router.push(`/category/${slug}?${params.toString()}`)
  }

  const startItem = (currentPage - 1) * 12 + 1
  const endItem = Math.min(currentPage * 12, totalProducts)

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Results Info */}
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {startItem}-{endItem} of {totalProducts.toLocaleString()} results
          </p>

          {/* Mobile Filter Toggle */}
          <Button variant="outline" size="sm" className="sm:hidden">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
            <Select value={searchParams.sort || "featured"} onValueChange={handleSortChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
