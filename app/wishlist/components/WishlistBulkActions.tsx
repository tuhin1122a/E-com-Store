// src/components/wishlist/WishlistBulkActions.tsx
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";

interface Props {
  selectedCount: number;
  isAllSelected: boolean;
  onSelectAll: () => void;
  onAddToCart: () => void;
  onRemove: () => void;
}

export function WishlistBulkActions({
  selectedCount,
  isAllSelected,
  onSelectAll,
  onAddToCart,
  onRemove,
}: Props) {
  return (
    <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={onSelectAll}
            className="rounded"
          />
          <span className="text-sm">Select All ({selectedCount} selected)</span>
        </label>
        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart (
              {selectedCount})
            </Button>
            <Button variant="outline" size="sm" onClick={onRemove}>
              <Trash2 className="h-4 w-4 mr-2" /> Remove ({selectedCount})
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
