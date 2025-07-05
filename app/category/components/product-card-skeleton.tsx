import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductCardSkeletonProps {
  count?: number
}

export function ProductCardSkeleton({ count = 4 }: ProductCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <div className="relative">
            <Skeleton className="w-full h-64" />
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-2" />
            <Skeleton className="h-5 w-1/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
