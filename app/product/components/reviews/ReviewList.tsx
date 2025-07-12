import { ReviewCard } from "./ReviewCard";

interface ReviewListProps {
  reviews: any[];
  sessionUserId: string | undefined;
  onEdit?: (review: any) => void;
  onDelete?: (review: any) => void;
  onToggleHelpful?: (reviewId: string, isHelpful: boolean) => void; // optional toggle helpful callback
}

export function ReviewList({
  reviews,
  sessionUserId,
  onEdit,
  onDelete,
  onToggleHelpful,
}: ReviewListProps) {
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
          onEdit={onEdit}
          onDelete={onDelete} // pass delete callback
          onToggleHelpful={onToggleHelpful} // pass toggle helpful callback
        />
      ))}
    </div>
  );
}
