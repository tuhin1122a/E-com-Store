import { Card } from "@/components/ui/card";
import {
  Book,
  Car,
  Dumbbell,
  Home,
  Monitor,
  Shirt,
  Sparkles,
  ToyBrick,
} from "lucide-react";
import Link from "next/link";

// Icon mapping based on category slug
const iconMap = {
  electronics: Monitor,
  clothing: Shirt,
  "home-garden": Home,
  sports: Dumbbell,
  books: Book,
  beauty: Sparkles,
  toys: ToyBrick,
  automotive: Car,
  smartphones: Monitor, // example reuse
  laptops: Monitor, // example reuse
  shoes: Shirt, // example reuse
  "mens-clothing": Shirt,
  "womens-clothing": Shirt,
};

const backgroundClasses = [
  "bg-gradient-to-br from-blue-500 to-indigo-600",
  "bg-gradient-to-br from-pink-500 to-rose-500",
  "bg-gradient-to-br from-green-500 to-emerald-600",
  "bg-gradient-to-br from-yellow-500 to-orange-500",
  "bg-gradient-to-br from-purple-600 to-fuchsia-600",
  "bg-gradient-to-br from-pink-400 to-rose-500",
  "bg-gradient-to-br from-cyan-500 to-teal-500",
  "bg-gradient-to-br from-gray-600 to-slate-700",
];

export function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((category, index) => {
        const Icon = iconMap[category.slug] || Book; // default icon if none matched
        const bgClass = backgroundClasses[index % backgroundClasses.length];

        return (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <Card
              className={`text-white transition-transform hover:scale-105 cursor-pointer overflow-hidden rounded-xl shadow-md ${bgClass}`}
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-white/20">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                {/* You can remove count if it's not in your data */}
                {/* <p className="text-sm text-white/80">{category.count} items</p> */}
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
