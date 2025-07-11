"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface ProductReviewsProps {
  productId: string;
}

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    userId: "user1",
    userName: "John Doe",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    title: "Excellent quality!",
    comment:
      "These headphones exceeded my expectations. The sound quality is amazing and the battery life is exactly as advertised. Highly recommend!",
    date: "2024-01-15",
    helpful: 12,
    notHelpful: 1,
    verified: true,
  },
  {
    id: "2",
    userId: "user2",
    userName: "Sarah Smith",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    title: "Great value for money",
    comment:
      "Good headphones for the price. The noise cancellation works well, though not as good as more expensive models. Comfortable to wear for long periods.",
    date: "2024-01-10",
    helpful: 8,
    notHelpful: 0,
    verified: true,
  },
  {
    id: "3",
    userId: "user3",
    userName: "Mike Johnson",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 3,
    title: "Decent but not perfect",
    comment:
      "The headphones are okay. Sound quality is good but I had some connectivity issues with Bluetooth. Customer service was helpful though.",
    date: "2024-01-05",
    helpful: 3,
    notHelpful: 2,
    verified: false,
  },
];

const ratingDistribution = [
  { stars: 5, count: 45, percentage: 60 },
  { stars: 4, count: 25, percentage: 33 },
  { stars: 3, count: 4, percentage: 5 },
  { stars: 2, count: 1, percentage: 1 },
  { stars: 1, count: 1, percentage: 1 },
];

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    comment: "",
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const totalReviews = ratingDistribution.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const averageRating =
    ratingDistribution.reduce((sum, item) => sum + item.stars * item.count, 0) /
    totalReviews;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit review logic here
    setNewReview({ rating: 0, title: "", comment: "" });
    setShowReviewForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
          Write a Review
        </Button>
      </div>

      {/* Review Summary */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
            <div>
              <div className="flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Based on {totalReviews} reviews
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-2">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm">{item.stars}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </div>
              <Progress value={item.percentage} className="flex-1" />
              <span className="text-sm text-muted-foreground w-8">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Write a Review</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <Label className="text-base font-medium mb-2 block">
                  Rating
                </Label>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: i + 1 })
                      }
                      className="p-1"
                    >
                      <Star
                        className={cn(
                          "h-6 w-6",
                          i < newReview.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 hover:text-yellow-400"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="review-title">Review Title</Label>
                <input
                  id="review-title"
                  type="text"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={newReview.title}
                  onChange={(e) =>
                    setNewReview({ ...newReview, title: e.target.value })
                  }
                  placeholder="Summarize your review"
                />
              </div>

              <div>
                <Label htmlFor="review-comment">Your Review</Label>
                <Textarea
                  id="review-comment"
                  className="mt-1"
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  placeholder="Tell others about your experience with this product"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={!newReview.rating || !newReview.comment}
                >
                  Submit Review
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <Card key={review.id}>
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
                          className={cn(
                            "h-4 w-4",
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          )}
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
        ))}
      </div>
    </div>
  );
}
