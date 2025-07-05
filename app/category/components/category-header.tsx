import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface CategoryHeaderProps {
  slug: string
}

// Mock category data - replace with API call
const getCategoryBySlug = async (slug: string) => {
  // This would be replaced with actual API call
  const categories = {
    electronics: {
      id: "1",
      name: "Electronics",
      slug: "electronics",
      description:
        "Discover the latest in technology with our comprehensive electronics collection. From smartphones and laptops to smart home devices and gaming gear.",
      imageUrl: "/placeholder.svg?height=400&width=800",
      productCount: 1234,
      isActive: true,
    },
    clothing: {
      id: "2",
      name: "Clothing",
      slug: "clothing",
      description:
        "Express your style with our curated fashion collection. From casual wear to formal attire, find the perfect outfit for every occasion.",
      imageUrl: "/placeholder.svg?height=400&width=800",
      productCount: 856,
      isActive: true,
    },
    "home-garden": {
      id: "3",
      name: "Home & Garden",
      slug: "home-garden",
      description:
        "Transform your living space with our home and garden essentials. Quality furniture, decor, and outdoor solutions for every home.",
      imageUrl: "/placeholder.svg?height=400&width=800",
      productCount: 642,
      isActive: true,
    },
    sports: {
      id: "4",
      name: "Sports",
      slug: "sports",
      description:
        "Gear up for your active lifestyle with our sports and fitness collection. Professional equipment and apparel for every sport and activity.",
      imageUrl: "/placeholder.svg?height=400&width=800",
      productCount: 423,
      isActive: true,
    },
    books: {
      id: "5",
      name: "Books",
      slug: "books",
      description:
        "Expand your knowledge and imagination with our extensive book collection. From bestsellers to classics, find your next great read.",
      imageUrl: "/placeholder.svg?height=400&width=800",
      productCount: 789,
      isActive: true,
    },
    beauty: {
      id: "6",
      name: "Beauty",
      slug: "beauty",
      description:
        "Enhance your natural beauty with our premium beauty and skincare products. Quality cosmetics and treatments for every skin type.",
      imageUrl: "/placeholder.svg?height=400&width=800",
      productCount: 567,
      isActive: true,
    },
    toys: {
      id: "7",
      name: "Toys",
      slug: "toys",
      description:
        "Spark imagination and creativity with our toy collection. Educational and fun toys for children of all ages.",
      imageUrl: "/placeholder.svg?height=400&width=800",
      productCount: 345,
      isActive: true,
    },
    automotive: {
      id: "8",
      name: "Automotive",
      slug: "automotive",
      description:
        "Keep your vehicle running smoothly with our automotive parts and accessories. Quality components and tools for every car enthusiast.",
      imageUrl: "/placeholder.svg?height=400&width=800",
      productCount: 234,
      isActive: true,
    },
  }

  return categories[slug as keyof typeof categories] || null
}

export async function CategoryHeader({ slug }: CategoryHeaderProps) {
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return null
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-8">
      <div className="relative h-48 md:h-64">
        <Image src={category.imageUrl || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{category.name}</h1>
            <Badge variant="secondary" className="text-sm">
              {category.productCount.toLocaleString()} Products
            </Badge>
          </div>
        </div>
      </div>

      {category.description && (
        <div className="p-6">
          <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto text-center">
            {category.description}
          </p>
        </div>
      )}
    </div>
  )
}
