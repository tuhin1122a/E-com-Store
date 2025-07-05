"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FloatingCardProps {
  title: string;
  subtitle: string;
  className?: string;
  color?: string;
  delay?: number;
}

export default function FloatingCard({
  title,
  subtitle,
  className,
  color = "from-blue-500 to-cyan-500",
  delay = 0,
}: FloatingCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-xl px-4 py-2 text-white shadow-lg backdrop-blur-lg",
        "bg-gradient-to-r",
        color,
        className
      )}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6 }}
    >
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs opacity-90">{subtitle}</div>
    </motion.div>
  );
}
