import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";

export function ReviewCard({ review }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage
              src={review.userAvatar || "/placeholder.svg"}
              alt={review.userName}
            />
            <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">{review.userName}</span>
              {review.verified && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Verified Purchase
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
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
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>

            <h4 className="font-semibold mb-2">{review.title}</h4>
            <p className="text-muted-foreground mb-4">{review.comment}</p>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                <ThumbsUp className="h-4 w-4" />
                Helpful ({review.helpful})
              </button>
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                <ThumbsDown className="h-4 w-4" />
                Not Helpful ({review.notHelpful})
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
