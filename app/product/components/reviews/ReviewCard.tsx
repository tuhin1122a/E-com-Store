import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Star, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";

interface ReviewCardProps {
  review: any;
  sessionUserId?: string;
  onEdit?: (review: any) => void;
  onDelete?: (review: any) => void;
  onToggleHelpful?: (reviewId: string, isHelpful: boolean) => void;
}

export function ReviewCard({
  review,
  sessionUserId,
  onEdit,
  onDelete,
  onToggleHelpful,
}: ReviewCardProps) {
  const userName =
    `${review.user?.firstName || ""} ${review.user?.lastName || ""}`.trim() ||
    "Anonymous";
  const avatarUrl = review.user?.avatarUrl;
  const isOwner = review.userId === sessionUserId;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={userName} />
            <AvatarFallback>{userName.charAt(0) || "A"}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{userName}</span>
                {review.isVerified && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Verified Purchase
                  </span>
                )}
              </div>

              {isOwner && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => onEdit?.(review)}
                    aria-label="Edit Review"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={() => onDelete?.(review)}
                    aria-label="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div
                className="flex"
                aria-label={`Rating: ${review.rating} out of 5 stars`}
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < review.rating
                        ? "h-4 w-4 fill-yellow-400 text-yellow-400"
                        : "h-4 w-4 text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>

            {review.title && (
              <h4 className="font-semibold mb-2">{review.title}</h4>
            )}
            <p className="text-muted-foreground mb-4">{review.comment}</p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onToggleHelpful?.(review.id, true)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Helpful count: ${review.helpfulCount}`}
              >
                <ThumbsUp className="h-4 w-4" />
                Helpful ({review.helpfulCount})
              </button>
              <button
                type="button"
                onClick={() => onToggleHelpful?.(review.id, false)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Not helpful count: ${review.notHelpfulCount}`}
              >
                <ThumbsDown className="h-4 w-4" />
                Not Helpful ({review.notHelpfulCount})
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
