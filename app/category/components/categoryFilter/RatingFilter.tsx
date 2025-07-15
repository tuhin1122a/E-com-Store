// components/category/filters/RatingFilter.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";

interface Props {
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
  updateURL: (updates: Record<string, string | null>) => void;
}

export function RatingFilter({
  selectedRating,
  setSelectedRating,
  updateURL,
}: Props) {
  const handleRatingChange = (rating: number) => {
    const newRating = selectedRating === rating ? null : rating;
    setSelectedRating(newRating);
    updateURL({ rating: newRating?.toString() || null });
  };

  return (
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
  );
}
