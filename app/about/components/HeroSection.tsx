export default function HeroSection() {
  return (
    <section className="relative w-full isolate mb-16">
      {/* Gradient background */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#EC4899] dark:from-[#1e3a8a] dark:via-[#4f46e5] dark:to-[#db2777]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-20 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          About <span className="text-yellow-300">EcomStore</span>
        </h1>
        <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Your trusted online shopping destination for quality products at
          unbeatable prices.
        </p>
      </div>
    </section>
  );
}
