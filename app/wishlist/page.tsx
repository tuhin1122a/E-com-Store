"use client";

import { useCart } from "@/context/CartContext"; // ✅ from cart context
import { useWishlist } from "@/context/WishlistContext"; // ✅ use your new context
import { useSession } from "next-auth/react";
import { WishlistBulkActions } from "./components/WishlistBulkActions";
import { WishlistEmpty } from "./components/WishlistEmpty";
import { WishlistGrid } from "./components/WishlistGrid";
import { WishlistHeader } from "./components/WishlistHeader";

export default function WishlistPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const {
    wishlistItems,
    loading,
    selectedItems,
    isAllSelected,
    toggleSelectItem,
    toggleSelectAll,
    removeFromWishlist,
    removeSelected,
  } = useWishlist();

  const { addToCart, addSelectedToCart } = useCart();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <svg
          className="animate-spin h-10 w-10 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
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

  if (!loading && wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <WishlistEmpty />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <WishlistHeader itemCount={wishlistItems.length} />

      <WishlistBulkActions
        selectedCount={selectedItems.length}
        isAllSelected={isAllSelected}
        onSelectAll={toggleSelectAll}
        onAddToCart={() => addSelectedToCart(selectedItems)}
        onRemove={removeSelected}
      />

      <WishlistGrid
        items={wishlistItems}
        selectedItems={selectedItems}
        onSelectItem={toggleSelectItem}
        onRemoveItem={removeFromWishlist}
        onAddToCart={(productId) => addToCart(productId, 1)}
        addSelectedToCart={() => addSelectedToCart(selectedItems)}
        isAllSelected={isAllSelected}
      />
    </div>
  );
}
