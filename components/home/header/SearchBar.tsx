import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  className?: string;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  className,
}: SearchBarProps) {
  return (
    <div className={clsx("relative w-full", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="search"
        placeholder="Search products..."
        className="pl-10 pr-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
