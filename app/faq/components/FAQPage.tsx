"use client";

import { useState } from "react";
import { FAQCategories } from "./FAQCategories";
import { FAQList } from "./FAQList";
import { FAQSearch } from "./FAQSearch";
import { FAQSupportCard } from "./FAQSupportCard";

// ✅ Metadata for SEO
export const metadata = {
  title: "FAQs - EcomStore",
  description:
    "Find answers to your questions about orders, shipping, payments, and more at EcomStore.",
  openGraph: {
    title: "FAQs - EcomStore",
    description:
      "Get support and answers to frequently asked questions at EcomStore.",
    url: "https://yourdomain.com/faq", // 🔁 Replace with your actual domain
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FAQs - EcomStore",
    description: "Get quick help from our frequently asked questions.",
  },
  robots: "index, follow",
};

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and
            policies.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-16">
        <FAQSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FAQCategories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <FAQList searchTerm={searchTerm} selectedCategory={selectedCategory} />
        <FAQSupportCard />
      </div>
    </div>
  );
}
