import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-[#005A64] to-[#007A87] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <AnimatedSection animation="fade-up" className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Your Tech Partner in Juba</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-md leading-relaxed">
              Discover the latest electronics and tech gadgets at Prime Smart. Quality products at affordable prices.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="bg-white text-[#005A64] hover:bg-gray-100">
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-transparent hover:border-white/80 font-medium shadow-sm"
              >
                <Link href="/contact" className="flex items-center">
                  <span className="drop-shadow-md">Contact Us</span>
                </Link>
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection
            animation="fade-in"
            delay={300}
            className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#005A64]/80 to-black/50 z-10 rounded-lg"></div>
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1200&auto=format&fit=crop"
                alt="Modern Electronics"
                className="w-full h-full object-cover"
              />

              {/* Overlay with logo */}
              <div className="absolute bottom-4 right-4 z-20">
                <div className="bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                  <img src="/images/logo.png" alt="Prime Smart" className="h-8 w-auto" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
