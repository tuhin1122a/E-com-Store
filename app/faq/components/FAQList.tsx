"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { faqCategories, faqs } from "./constants";

export function FAQList({
  searchTerm,
  selectedCategory,
}: {
  searchTerm: string;
  selectedCategory: string;
}) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filtered = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggle = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (filtered.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No questions found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search terms or browse different categories.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {filtered.map((faq) => {
        const isOpen = openItems.includes(faq.id);
        const category = faqCategories.find((c) => c.id === faq.category);

        return (
          <Card key={faq.id}>
            <Collapsible open={isOpen} onOpenChange={() => toggle(faq.id)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      {category && (
                        <Badge variant="secondary" className="text-xs">
                          {category.name}
                        </Badge>
                      )}
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform",
                        isOpen && "transform rotate-180"
                      )}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
}
