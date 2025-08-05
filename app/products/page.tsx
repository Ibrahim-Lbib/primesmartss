"use client"

import { useState } from "react"
import { useProducts, useProductCategories } from "@/hooks/use-products"
import ProductCard from "@/components/product-card"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, RefreshCw } from "lucide-react"

export default function ProductsPage() {
  const { products, loading, error, refreshProducts } = useProducts()
  const { categories } = useProductCategories()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter products based on search query and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory ? product.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={refreshProducts} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
      <AnimatedSection animation="fade-up">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">Our Products</h1>
          <div className="flex items-center gap-4">
            <Button onClick={refreshProducts} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        <p className="text-lg text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover the latest tech gadgets and electronics at Prime Smart. We offer a wide range of products to meet
          your technology needs. ({products.length} products available)
        </p>

        {/* Search and filter section */}
        <div className="mb-10 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              All Products ({products.length})
            </Button>
            {categories.map((category) => {
              const categoryCount = products.filter((p) => p.category === category).length
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category} ({categoryCount})
                </Button>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter to find what you're looking for.</p>
          {searchQuery || selectedCategory ? (
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <AnimatedSection key={product.id} animation="fade-up" delay={50 * (index % 8)} duration={600}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  )
}
