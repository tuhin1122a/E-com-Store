"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface CategoryHeaderProps {
  slug: string;
  category: {
    name: string;
    description?: string;
    imageUrl?: string;
    productCount: number;
  };
}

export function CategoryHeader({ slug, category }: CategoryHeaderProps) {
  if (!category) return null;

  // If category.imageUrl exists and not a placeholder, use it; else fallback to public folder image
  const isPlaceholder = category.imageUrl?.includes("placeholder.svg");
  const bannerImagePath =
    isPlaceholder || !category.imageUrl
      ? `/category-images/${slug}.jpg`
      : category.imageUrl;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-8">
      <div className="relative h-48 md:h-64">
        <Image
          src={bannerImagePath}
          alt={category.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              {category.name}
            </h1>
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
  );
}
