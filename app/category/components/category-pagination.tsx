"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface CategoryPaginationProps {
  slug: string
  currentPage: number
  totalPages: number
  searchParams: {
    [key: string]: string | undefined
  }
}

export function CategoryPagination({ slug, currentPage, totalPages, searchParams }: CategoryPaginationProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(urlSearchParams.toString())
    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", page.toString())
    }
    router.push(`/category/${slug}?${params.toString()}`)
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <div className="flex items-center justify-center w-10 h-10">
                <MoreHorizontal className="h-4 w-4" />
              </div>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => navigateToPage(page as number)}
                className="w-10 h-10"
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
