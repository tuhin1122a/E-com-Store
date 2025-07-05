"use client";

import { motion } from "framer-motion";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

      {/* Floating Shapes */}
      <motion.div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse" />
      <motion.div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse delay-1000" />
      <motion.div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-200 dark:bg-pink-800 rounded-full opacity-20 animate-pulse delay-2000" />

      <div className="container relative mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <HeroContent />
        <HeroImage />
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="currentColor"
            className="text-white dark:text-slate-900"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}
