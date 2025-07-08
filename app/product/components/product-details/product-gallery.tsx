"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  discountPercentage: number;
}

export function ProductGallery({
  images,
  productName,
  discountPercentage,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border">
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt={productName}
          fill
          className="object-cover"
          priority // Prioritize loading the main image
        />
        {discountPercentage > 0 && (
          <Badge variant="destructive" className="absolute top-4 left-4">
            -{discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {images.map((img: string, idx: number) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={cn(
              "w-20 h-20 rounded-lg border-2 overflow-hidden flex-shrink-0",
              selectedImage === idx ? "border-primary" : "border-transparent"
            )}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
