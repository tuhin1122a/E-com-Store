"use client";
import { CategoryPagination } from "@/app/category/components/category-pagination";
import { CategoryProductsHeader } from "@/app/category/components/category-products-header";
import { ProductCard } from "@/app/category/components/product-card";

interface CategoryProductsProps {
  slug: string;
  searchParams: {
    page?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    brand?: string;
    rating?: string;
    inStock?: string;
  };
}

// Mock function to get products by category - replace with API call
const getProductsByCategory = async (slug: string, searchParams: any) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock products data
  const allProducts = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones Premium",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviewCount: 128,
      isOnSale: true,
      badge: "Best Seller",
      brand: "TechPro",
      inStock: true,
    },
    {
      id: "2",
      name: "Smart Fitness Watch with Heart Rate Monitor",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviewCount: 89,
      isOnSale: false,
      badge: "New",
      brand: "Apple",
      inStock: true,
    },
    {
      id: "3",
      name: "Premium Coffee Maker with Grinder",
      price: 149.99,
      originalPrice: 179.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviewCount: 67,
      isOnSale: true,
      brand: "HomeComfort",
      inStock: false,
    },
    {
      id: "4",
      name: "Organic Cotton T-Shirt Comfortable Fit",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.3,
      reviewCount: 156,
      isOnSale: false,
      brand: "StyleMax",
      inStock: true,
    },
    {
      id: "5",
      name: "Wireless Phone Charger Fast Charging",
      price: 39.99,
      originalPrice: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.4,
      reviewCount: 92,
      isOnSale: true,
      brand: "Samsung",
      inStock: true,
    },
    {
      id: "6",
      name: "LED Desk Lamp with USB Charging Port",
      price: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviewCount: 43,
      isOnSale: false,
      badge: "Eco-Friendly",
      brand: "LG",
      inStock: true,
    },
    {
      id: "7",
      name: "Bluetooth Speaker Waterproof Portable",
      price: 89.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviewCount: 78,
      isOnSale: true,
      brand: "Sony",
      inStock: true,
    },
    {
      id: "8",
      name: "Yoga Mat Premium Non-Slip Surface",
      price: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviewCount: 134,
      isOnSale: false,
      brand: "Nike",
      inStock: true,
    },
    {
      id: "9",
      name: "Gaming Mouse RGB Wireless High DPI",
      price: 69.99,
      originalPrice: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.4,
      reviewCount: 201,
      isOnSale: true,
      brand: "Dell",
      inStock: true,
    },
    {
      id: "10",
      name: "Stainless Steel Water Bottle Insulated",
      price: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.2,
      reviewCount: 87,
      isOnSale: false,
      brand: "HP",
      inStock: false,
    },
    {
      id: "11",
      name: "Wireless Earbuds Noise Cancelling",
      price: 129.99,
      originalPrice: 159.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviewCount: 156,
      isOnSale: true,
      badge: "Popular",
      brand: "Apple",
      inStock: true,
    },
    {
      id: "12",
      name: "Smart Home Security Camera HD",
      price: 99.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviewCount: 73,
      isOnSale: false,
      brand: "Samsung",
      inStock: true,
    },
  ];

  // Apply filters
  let filteredProducts = [...allProducts];

  // Filter by price range
  if (searchParams.minPrice || searchParams.maxPrice) {
    const minPrice = Number(searchParams.minPrice) || 0;
    const maxPrice = Number(searchParams.maxPrice) || Number.POSITIVE_INFINITY;
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  // Filter by brands
  if (searchParams.brand) {
    const brands = searchParams.brand.split(",");
    filteredProducts = filteredProducts.filter((product) =>
      brands.some((brand) =>
        product.brand.toLowerCase().includes(brand.toLowerCase())
      )
    );
  }

  // Filter by rating
  if (searchParams.rating) {
    const minRating = Number(searchParams.rating);
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= minRating
    );
  }

  // Filter by stock
  if (searchParams.inStock === "true") {
    filteredProducts = filteredProducts.filter((product) => product.inStock);
  }

  // Apply sorting
  const sortBy = searchParams.sort || "featured";
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      // Keep original order for newest
      break;
    case "name":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // Featured - keep original order
      break;
  }

  // Pagination
  const page = Number(searchParams.page) || 1;
  const limit = 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    pagination: {
      page,
      limit,
      total: filteredProducts.length,
      pages: Math.ceil(filteredProducts.length / limit),
    },
  };
};

export async function CategoryProducts({
  slug,
  searchParams,
}: CategoryProductsProps) {
  const { products, pagination } = await getProductsByCategory(
    slug,
    searchParams
  );

  return (
    <div className="space-y-6">
      {/* Products Header with Sort */}
      <CategoryProductsHeader
        slug={slug}
        totalProducts={pagination.total}
        currentPage={pagination.page}
        totalPages={pagination.pages}
        searchParams={searchParams}
      />

      {/* Products Grid */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <CategoryPagination
            slug={slug}
            currentPage={pagination.page}
            totalPages={pagination.pages}
            searchParams={searchParams}
          />
        </>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search criteria to find what you're
              looking for.
            </p>
            <button
              onClick={() => (window.location.href = `/category/${slug}`)}
              className="text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
