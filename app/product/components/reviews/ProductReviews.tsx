"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useState } from "react";

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
  const isBuyer = product?.buyers?.some((b: any) => b.id === userId);

  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        {isBuyer && (
          <Button onClick={() => setShowReviewForm(!showReviewForm)}>
            Write a Review
          </Button>
        )}
      </div>

      <ReviewSummary />
      {showReviewForm && (
        <Card>
          <ReviewForm
            onCancel={() => setShowReviewForm(false)}
            onSubmitSuccess={() => setShowReviewForm(false)}
            productId={product.id}
          />
        </Card>
      )}
      <ReviewList />
    </div>
  );
}
