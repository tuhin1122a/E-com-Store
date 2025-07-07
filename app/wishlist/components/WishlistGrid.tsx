// src/components/wishlist/WishlistGrid.tsx
import { WishlistItem } from "@/components/wishlist-item"; // Assuming WishlistItem is in its own file
import { WishlistProduct } from "@/types";

interface Props {
  items: WishlistProduct[];
  selectedItems: string[];
  onSelectItem: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

export function WishlistGrid({
  items,
  selectedItems,
  onSelectItem,
  onRemoveItem,
  onAddToCart,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <WishlistItem
          key={item.id}
          item={item}
          isSelected={selectedItems.includes(item.productId)}
          onSelect={() => onSelectItem(item.productId)}
          onRemove={() => onRemoveItem(item.productId)}
          onAddToCart={() => onAddToCart(item.productId)}
        />
      ))}
    </div>
  );
}
