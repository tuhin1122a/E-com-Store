import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

const ratingDistribution = [
  { stars: 5, count: 45, percentage: 60 },
  { stars: 4, count: 25, percentage: 33 },
  { stars: 3, count: 4, percentage: 5 },
  { stars: 2, count: 1, percentage: 1 },
  { stars: 1, count: 1, percentage: 1 },
];

export function ReviewSummary() {
  const total = ratingDistribution.reduce((sum, r) => sum + r.count, 0);
  const average =
    ratingDistribution.reduce((sum, r) => sum + r.stars * r.count, 0) / total;

  return (
    <div className="grid md:grid-cols-2 gap-8">
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
            Based on {total} reviews
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {ratingDistribution.map((r) => (
          <div key={r.stars} className="flex items-center gap-2">
            <div className="flex items-center gap-1 w-12">
              <span className="text-sm">{r.stars}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            </div>
            <Progress value={r.percentage} className="flex-1" />
            <span className="text-sm text-muted-foreground w-8">{r.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
