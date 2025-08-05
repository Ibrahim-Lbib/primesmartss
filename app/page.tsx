"use client"

import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import AboutSection from "@/components/about-section"
import ContactInfo from "@/components/contact-info"
import { useProducts } from "@/hooks/use-products"

export default function Home() {
  const { products, loading } = useProducts()
  const featuredProducts = products.slice(0, 6)

  return (
    <div className="flex flex-col">
      <Hero />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-20 py-16">
        <FeaturedProducts products={featuredProducts} loading={loading} />
        <AboutSection />
        <ContactInfo />
      </div>
    </div>
  )
}
