import Link from "next/link";
import CategoryDropdown from "./CategoryDropdown";

export default function NavLinks() {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <CategoryDropdown />
      <Link href="/products">All Products</Link>
      <Link href="/deals">Deals</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
