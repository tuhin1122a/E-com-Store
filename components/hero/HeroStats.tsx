"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function HeroStats() {
  return (
    <motion.div
      className="flex items-center gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="text-center">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          50K+
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Happy Customers
        </div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          10K+
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Products
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">
          4.9/5
        </span>
      </div>
    </motion.div>
  );
}
