"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import { useSession } from "next-auth/react";
import { WishlistBulkActions } from "./components/WishlistBulkActions";
import { WishlistEmpty } from "./components/WishlistEmpty";
import { WishlistGrid } from "./components/WishlistGrid";
import { WishlistHeader } from "./components/WishlistHeader";

export default function WishlistPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const {
    items,
    loading,
    selectedItems,
    isAllSelected,
    removeItem,
    addToCart,
    toggleSelectItem,
    toggleSelectAll,
    removeSelected,
    addSelectedToCart,
  } = useWishlist();

  // 1. Loading thakle sudhu loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <svg
          className="animate-spin h-10 w-10 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  // 2. Loading sesh ar items empty hole empty UI
  if (!loading && items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <WishlistEmpty />
      </div>
    );
  }

  // 3. Loading sesh ar item thakle main UI
  return (
    <div className="container mx-auto px-4 py-8">
      <WishlistHeader itemCount={items.length} />

      <WishlistBulkActions
        selectedCount={selectedItems.length}
        isAllSelected={isAllSelected}
        onSelectAll={toggleSelectAll}
        onAddToCart={addSelectedToCart}
        onRemove={removeSelected}
      />

      <WishlistGrid
        items={items}
        selectedItems={selectedItems}
        onSelectItem={toggleSelectItem}
        onRemoveItem={removeItem}
        onAddToCart={addToCart}
        addSelectedToCart={addSelectedToCart}
        isAllSelected={isAllSelected}
      />
    </div>
  );
}
