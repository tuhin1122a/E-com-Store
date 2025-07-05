"use client";

import { motion } from "framer-motion";
import { CreditCard, Shield, Truck } from "lucide-react";

const features = [
  { icon: Shield, text: "Secure Shopping" },
  { icon: Truck, text: "Free Shipping" },
  { icon: CreditCard, text: "Easy Returns" },
];

export default function HeroFeatures() {
  return (
    <motion.div
      className="flex flex-wrap gap-6 pt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {feature.text}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
