"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroFeatures from "./HeroFeatures";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Badge
          variant="secondary"
          className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        >
          🎉 New Collection Available
        </Badge>
      </motion.div>

      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-slate-900 dark:text-white">Discover </span>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Amazing
        </span>{" "}
        <span className="text-slate-900 dark:text-white">Products</span>
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Shop the latest trends with unbeatable prices, premium quality, and
        lightning-fast delivery. Your perfect purchase is just one click away.
      </motion.p>

      <HeroStats />

      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          asChild
        >
          <Link href="/products">
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
          asChild
        >
          <Link href="/deals">View Deals</Link>
        </Button>
      </motion.div>

      <HeroFeatures />
    </motion.div>
  );
}
