// src/components/wishlist/WishlistHeader.tsx
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface Props {
  itemCount: number;
}

export function WishlistHeader({ itemCount }: Props) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground">
          {itemCount} {itemCount === 1 ? "item" : "items"} saved
        </p>
      </div>
      {itemCount > 0 && (
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" /> Share List
        </Button>
      )}
    </div>
  );
}
