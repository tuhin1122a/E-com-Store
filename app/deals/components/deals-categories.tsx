import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Laptop, Shirt, Home, Dumbbell, Book, Sparkles } from "lucide-react"

const dealCategories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: Laptop,
    discount: "Up to 50% off",
    itemCount: 234,
    color: "bg-blue-500",
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: Shirt,
    discount: "Up to 60% off",
    itemCount: 156,
    color: "bg-pink-500",
  },
  {
    id: "home",
    name: "Home & Garden",
    icon: Home,
    discount: "Up to 45% off",
    itemCount: 89,
    color: "bg-green-500",
  },
  {
    id: "sports",
    name: "Sports",
    icon: Dumbbell,
    discount: "Up to 40% off",
    itemCount: 67,
    color: "bg-orange-500",
  },
  {
    id: "books",
    name: "Books",
    icon: Book,
    discount: "Up to 30% off",
    itemCount: 45,
    color: "bg-purple-500",
  },
  {
    id: "beauty",
    name: "Beauty",
    icon: Sparkles,
    discount: "Up to 55% off",
    itemCount: 78,
    color: "bg-red-500",
  },
]

export function DealsCategories() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {dealCategories.map((category) => {
          const IconComponent = category.icon
          return (
            <Link key={category.id} href={`/category/${category.id}?deals=true`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                  <Badge variant="secondary" className="text-xs mb-1">
                    {category.discount}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{category.itemCount} deals</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
