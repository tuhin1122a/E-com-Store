import { ProductCard } from "@/app/category/components/product-card";

// Mock data - replace with real API call
// const products = [
//   {
//     id: "1",
//     name: "Wireless Bluetooth Headphones Premium",
//     price: 79.99,
//     originalPrice: 99.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4.5,
//     reviewCount: 128,
//     isOnSale: true,
//     badge: "Best Seller",
//   },
//   {
//     id: "2",
//     name: "Smart Fitness Watch with Heart Rate Monitor",
//     price: 199.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4.8,
//     reviewCount: 89,
//     isOnSale: false,
//     badge: "New",
//   },
//   {
//     id: "3",
//     name: "Premium Coffee Maker with Grinder",
//     price: 149.99,
//     originalPrice: 179.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4.6,
//     reviewCount: 67,
//     isOnSale: true,
//   },
//   {
//     id: "4",
//     name: "Organic Cotton T-Shirt Comfortable Fit",
//     price: 24.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4.3,
//     reviewCount: 156,
//     isOnSale: false,
//   },
//   {
//     id: "5",
//     name: "Wireless Phone Charger Fast Charging",
//     price: 39.99,
//     originalPrice: 49.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4.4,
//     reviewCount: 92,
//     isOnSale: true,
//   },
//   {
//     id: "6",
//     name: "LED Desk Lamp with USB Charging Port",
//     price: 59.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4.7,
//     reviewCount: 43,
//     isOnSale: false,
//     badge: "Eco-Friendly",
//   },
//   {
//     id: "7",
//     name: "Bluetooth Speaker Waterproof Portable",
//     price: 89.99,
//     originalPrice: 119.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4.5,
//     reviewCount: 78,
//     isOnSale: true,
//   },
//   {
//     id: "8",
//     name: "Yoga Mat Premium Non-Slip Surface",
//     price: 34.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4.6,
//     reviewCount: 134,
//     isOnSale: false,
//   },
//   {
//     id: "9",
//     name: "Gaming Mouse RGB Wireless High DPI",
//     price: 69.99,
//     originalPrice: 89.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4.4,
//     reviewCount: 201,
//     isOnSale: true,
//   },
//   {
//     id: "10",
//     name: "Stainless Steel Water Bottle Insulated",
//     price: 19.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4.2,
//     reviewCount: 87,
//     isOnSale: false,
//   },
//   {
//     id: "11",
//     name: "Wireless Earbuds Noise Cancelling",
//     price: 129.99,
//     originalPrice: 159.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4.7,
//     reviewCount: 156,
//     isOnSale: true,
//     badge: "Popular",
//   },
//   {
//     id: "12",
//     name: "Smart Home Security Camera HD",
//     price: 99.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4.5,
//     reviewCount: 73,
//     isOnSale: false,
//   },
// ];

export function ProductGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
