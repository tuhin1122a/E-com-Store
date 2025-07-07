// src/components/wishlist/WishlistEmpty.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";

export function WishlistEmpty() {
  return (
    <Card>
      <CardContent className="py-16 text-center">
        <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
        <p className="text-muted-foreground mb-6">
          Save items you love and never lose track of them.
        </p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
