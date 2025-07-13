"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { ReviewSummary } from "./ReviewSummary";
import { Product } from "./types";

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const accessToken = session?.user?.accessToken;
  const isBuyer = product?.buyers?.some((b: any) => b.id === userId);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState<any | null>(null);
  const [reviews, setReviews] = useState([]);

  const hasReviewed = reviews.some((r: any) => r.userId === userId);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new Errors("Failed to fetch reviews");
      }

      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (product?.id && accessToken) {
      fetchReviews();
    }
  }, [product?.id, accessToken]);

  // Handle edit action from ReviewCard
  const handleEditReview = (review: any) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };
  //delete editingReview
  async function handleDeleteReview(reviewToDelete: any) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewToDelete.productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete review");
      }

      // Remove deleted review from local state
      setReviews((prev) =>
        prev.filter((review) => review.id !== reviewToDelete.id)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
      // Optionally show error UI here
    }
  }
  //toggle review form
  const handleToggleHelpful = async (reviewId: string, isHelpful: boolean) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}/helpful`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify({ isHelpful }),
        }
      );

      if (!res.ok) throw new Error("Failed to toggle helpful");

      const updated = await res.json();

      // 🔄 Update local review state (optional UI instant update)
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? {
                ...r,
                helpfulCount: updated.helpfulCount,
                notHelpfulCount: updated.notHelpfulCount,
              }
            : r
        )
      );
    } catch (err) {
      console.error("Toggle helpful failed", err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        {isBuyer && !hasReviewed && !editingReview && (
          <Button onClick={() => setShowReviewForm(!showReviewForm)}>
            Write a Review
          </Button>
        )}
      </div>

      <ReviewSummary reviews={reviews} />

      {showReviewForm && (
        <Card>
          <ReviewForm
            productId={product.id}
            initialData={editingReview}
            onCancel={() => {
              setShowReviewForm(false);
              setEditingReview(null);
            }}
            onSubmitSuccess={() => {
              fetchReviews(); // ✅ refresh reviews after submit
              setShowReviewForm(false);
              setEditingReview(null);
            }}
          />
        </Card>
      )}

      <ReviewList
        reviews={reviews}
        sessionUserId={userId}
        onEdit={handleEditReview}
        onDelete={handleDeleteReview}
        onToggleHelpful={handleToggleHelpful}
      />
    </div>
  );
}
