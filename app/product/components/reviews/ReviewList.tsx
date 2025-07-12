import { ReviewCard } from "./ReviewCard";

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
];

export function ReviewList() {
  return (
    <div className="space-y-6">
      {mockReviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
