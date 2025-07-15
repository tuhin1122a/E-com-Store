"use client";

import { cn } from "@/lib/utils";
import { faqCategories, faqs } from "./constants";

export function FAQCategories({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
}) {
  const baseClass =
    "p-4 rounded-lg border text-center transition-colors bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700";

  const activeClass =
    "bg-[#3B82F6] text-white border-[#3B82F6] hover:bg-[#3B82F6] dark:hover:bg-[#3B82F6]";

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-center mb-8">
        Browse by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* All Category */}
        <button
          onClick={() => setSelectedCategory("all")}
          className={cn(baseClass, selectedCategory === "all" && activeClass)}
        >
          <div className="text-2xl mb-2">📋</div>
          <div className="font-medium text-sm">All</div>
          <div className="text-xs text-muted-foreground">
            {faqs.length} questions
          </div>
        </button>

        {/* Other Categories */}
        {faqCategories.map((category) => {
          const Icon = category.icon;
          const count = faqs.filter((f) => f.category === category.id).length;
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(baseClass, isActive && activeClass)}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center",
                  isActive ? "bg-white/30" : category.color
                )}
              >
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div className="font-medium text-sm">{category.name}</div>
              <div className="text-xs text-muted-foreground">
                {count} questions
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
