"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface ReviewFormProps {
  productId: string; // add productId prop to associate review
  onCancel: () => void;
  onSubmitSuccess: () => void;
}

export function ReviewForm({
  productId,
  onCancel,
  onSubmitSuccess,
}: ReviewFormProps) {
  const { data: session } = useSession();
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.accessToken) {
      setError("You must be logged in to submit a review.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify({
            productId,
            rating: newReview.rating,
            title: newReview.title,
            comment: newReview.comment,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to submit review");
      }

      setNewReview({ rating: 0, title: "", comment: "" });
      onSubmitSuccess();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CardHeader>
        <h3 className="text-lg font-semibold">Write a Review</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="block mb-1">Rating</Label>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  disabled={loading}
                  aria-label={`Rate ${i + 1} stars`}
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
              value={newReview.title}
              onChange={(e) =>
                setNewReview({ ...newReview, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={loading}
              placeholder="Summarize your review"
            />
          </div>

          <div>
            <Label htmlFor="review-comment">Your Review</Label>
            <Textarea
              id="review-comment"
              rows={4}
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              placeholder="Tell others about your experience"
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={!newReview.rating || !newReview.comment || loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </>
  );
}
