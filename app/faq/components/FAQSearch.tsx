"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function FAQSearch({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}) {
  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          placeholder="Search for answers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
      </div>
    </div>
  );
}
