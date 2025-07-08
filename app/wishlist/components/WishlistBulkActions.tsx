"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  selectedCount: number;
  isAllSelected: boolean;
  onSelectAll: () => void;
  onAddToCart: () => Promise<void>; // updated to return Promise
  onRemove: () => Promise<void>; // updated to return Promise
}

export function WishlistBulkActions({
  selectedCount,
  isAllSelected,
  onSelectAll,
  onAddToCart,
  onRemove,
}: Props) {
  const [loadingAction, setLoadingAction] = useState<"add" | "remove" | null>(
    null
  );

  const handleAddToCart = async () => {
    setLoadingAction("add");
    try {
      await onAddToCart();
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRemove = async () => {
    setLoadingAction("remove");
    try {
      await onRemove();
    } finally {
      setLoadingAction(null);
    }
  };

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
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              disabled={loadingAction !== null}
            >
              {loadingAction === "add" ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ShoppingCart className="h-4 w-4 mr-2" />
              )}
              {loadingAction === "add"
                ? "Adding..."
                : `Add to Cart (${selectedCount})`}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRemove}
              disabled={loadingAction !== null}
            >
              {loadingAction === "remove" ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              {loadingAction === "remove"
                ? "Removing..."
                : `Remove (${selectedCount})`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
