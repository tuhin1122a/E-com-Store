import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Image skeleton */}
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-20 h-20 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Details skeleton */}
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-8 w-1/3 mb-4" />
          <Skeleton className="h-20 w-full" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-1/4" />
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="w-8 h-8 rounded-full" />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </div>
  );
}
