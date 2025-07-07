// src/components/wishlist/WishlistLoading.tsx
export function WishlistLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="h-16 bg-gray-200 rounded-lg mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
