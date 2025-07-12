import { ReviewCard } from "./ReviewCard";

interface ReviewListProps {
  reviews: any[];
  sessionUserId: string | undefined;
}

export function ReviewList({ reviews, sessionUserId }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted-foreground">No reviews yet.</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          sessionUserId={sessionUserId}
        />
      ))}
    </div>
  );
}
