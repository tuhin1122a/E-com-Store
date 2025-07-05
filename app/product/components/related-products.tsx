import { ProductCard } from "@/app/category/components/product-card";

interface RelatedProductsProps {
  productId: string;
}

// Mock related products data
const relatedProducts = [
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviewCount: 89,
    isOnSale: false,
    badge: "New",
  },
  {
    id: "3",
    name: "Premium Coffee Maker",
    price: 149.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviewCount: 67,
    isOnSale: true,
  },
  {
    id: "5",
    name: "Wireless Phone Charger",
    price: 39.99,
    originalPrice: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviewCount: 92,
    isOnSale: true,
  },
  {
    id: "7",
    name: "Bluetooth Speaker",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviewCount: 78,
    isOnSale: true,
  },
];

export function RelatedProducts({ productId }: RelatedProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
