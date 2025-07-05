"use client";

import { motion } from "framer-motion";
import FloatingCard from "./FloatingCard";

export default function HeroImage() {
  return (
    <motion.div
      className="relative w-full max-w-full mx-auto lg:mx-0" // max-w-md ➝ max-w-2xl
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Product Image */}
      <motion.img
        src="/shop banner.jpg" // replace with your image
        alt="Featured Product"
        className="w-full h-auto rounded-xl shadow-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating Cards */}
      <FloatingCard
        className="absolute -top-6 left-0"
        title="Limited Offer"
        subtitle="20% OFF"
        color="from-purple-500 to-indigo-500"
        delay={0.3}
      />

      <FloatingCard
        className="absolute -bottom-6 right-0"
        title="Free Shipping"
        subtitle="On all orders"
        color="from-pink-500 to-red-500"
        delay={0.5}
      />
    </motion.div>
  );
}
