import type { Product } from "@/lib/types"
import { SectionHeading } from "@/components/section-heading"
import ProductCard from "@/components/product-card"
import { AnimatedSection } from "@/components/animated-section"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface FeaturedProductsProps {
  products: Product[]
  loading?: boolean
}

export default function FeaturedProducts({ products, loading = false }: FeaturedProductsProps) {
  if (loading) {
    return (
      <section>
        <AnimatedSection animation="fade-up">
          <SectionHeading
            title="Featured Products"
            description="Check out our most popular electronics and tech gadgets"
          />
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section>
      <AnimatedSection animation="fade-up">
        <SectionHeading
          title="Featured Products"
          description="Check out our most popular electronics and tech gadgets"
        />
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
        {products.map((product, index) => (
          <AnimatedSection key={product.id} animation="fade-up" delay={100 * index} duration={800}>
            <ProductCard product={product} />
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection animation="fade-up" delay={400} className="mt-10 text-center">
        <Button asChild variant="outline" size="lg" className="group">
          <Link href="/products">
            View All Products
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </AnimatedSection>
    </section>
  )
}
