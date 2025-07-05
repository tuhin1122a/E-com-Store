import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function DealsBanner() {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <Badge className="mb-4 bg-yellow-400 text-yellow-900">🔥 Limited Time Offers</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Mega Sale Event</h1>
          <p className="text-xl md:text-2xl mb-6 text-purple-100">
            Up to 70% off on selected items. Flash deals, daily specials, and clearance items.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="#flash-deals">Shop Flash Deals</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600"
              asChild
            >
              <Link href="#daily-deals">View All Deals</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 translate-x-24" />
    </div>
  )
}
