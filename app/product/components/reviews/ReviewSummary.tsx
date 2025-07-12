import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface Review {
  rating: number;
  // you can extend this with other fields if needed
}

interface ReviewSummaryProps {
  reviews: Review[];
}

export function ReviewSummary({ reviews }: ReviewSummaryProps) {
  const total = reviews.length;

  const ratingCounts = [1, 2, 3, 4, 5].map((star) => ({
    stars: star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const average =
    total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Average rating */}
      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl font-bold">{average.toFixed(1)}</div>
        <div>
          <div className="flex mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.floor(average)
                    ? "h-5 w-5 fill-yellow-400 text-yellow-400"
                    : "h-5 w-5 text-gray-300"
                }
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            Based on {total} review{total !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Rating distribution */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = ratingCounts.find((r) => r.stars === star)?.count || 0;
          const percentage = total ? (count / total) * 100 : 0;

          return (
            <div key={star} className="flex items-center gap-2">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm">{star}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </div>
              <Progress value={percentage} className="flex-1" />
              <span className="text-sm text-muted-foreground w-8">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
