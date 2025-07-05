import { ProductCard } from "@/app/category/components/product-card";

// Mock data - replace with real API call
const featuredProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
    reviewCount: 128,
    isOnSale: true,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1629339837617-7069ce9e7f6b?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image:
      "https://images.unsplash.com/photo-1616191540374-dbea0eda0bfc?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
    reviewCount: 67,
    isOnSale: true,
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    image:
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.3,
    reviewCount: 156,
    isOnSale: false,
  },
  {
    id: "5",
    name: "Wireless Phone Charger",
    price: 39.99,
    originalPrice: 49.99,
    image:
      "https://images.unsplash.com/photo-1737882171913-f4ced0ce73d8?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.4,
    reviewCount: 92,
    isOnSale: true,
  },
  {
    id: "6",
    name: "LED Desk Lamp",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1571406487954-dc11b0c0767d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
    reviewCount: 43,
    isOnSale: false,
    badge: "Eco-Friendly",
  },
  {
    id: "7",
    name: "Bluetooth Speaker",
    price: 89.99,
    originalPrice: 119.99,
    image:
      "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
    reviewCount: 78,
    isOnSale: true,
  },
  {
    id: "8",
    name: "Yoga Mat Premium",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1661308411865-4fce7576bef8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
    reviewCount: 134,
    isOnSale: false,
  },
];

export function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
