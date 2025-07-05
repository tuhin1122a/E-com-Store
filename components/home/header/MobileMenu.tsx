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

export default function MobileMenu() {
  return (
    <div className="flex flex-col space-y-4 mt-8">
      <h3 className="font-semibold text-lg">Categories</h3>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/category/${category.toLowerCase().replace(" & ", "-").replace(" ", "-")}`}
          className="text-sm hover:text-primary"
        >
          {category}
        </Link>
      ))}

      <div className="border-t pt-4">
        <Link
          href="/products"
          className="block text-sm hover:text-primary mb-2"
        >
          All Products
        </Link>
        <Link href="/deals" className="block text-sm hover:text-primary mb-2">
          Deals
        </Link>
        <Link href="/about" className="block text-sm hover:text-primary mb-2">
          About
        </Link>
        <Link href="/contact" className="block text-sm hover:text-primary">
          Contact
        </Link>
      </div>
    </div>
  );
}
