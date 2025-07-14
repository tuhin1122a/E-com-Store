"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import apiClient from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the correct shape of category
type Category = {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  brands: any[]; // You can make this more specific if needed
};

export default function CategoryDropdown() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await apiClient.getCategories();
        setCategories(response.data); // Set the array directly
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Categories</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {categories.map((category) => (
          <DropdownMenuItem key={category.id} asChild>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
