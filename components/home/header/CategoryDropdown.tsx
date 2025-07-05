import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const categories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Books",
  "Beauty",
  "Toys",
  "Automotive",
];

export default function CategoryDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Categories</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {categories.map((category) => (
          <DropdownMenuItem key={category} asChild>
            <Link
              href={`/category/${category.toLowerCase().replace(" & ", "-").replace(" ", "-")}`}
            >
              {category}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
