"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/lib/types"
import { WhatsappIcon } from "@/components/icons"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  showImageControls?: boolean
}

type ImageFitMode = "cover" | "contain" | "fill" | "scale-down"

const imageFitOptions = [
  { value: "cover", label: "Cover", description: "Fill frame, may crop" },
  { value: "contain", label: "Contain", description: "Fit entirely, may have gaps" },
  { value: "fill", label: "Fill", description: "Stretch to fill frame" },
  { value: "scale-down", label: "Scale Down", description: "Smaller of contain or original" },
] as const

export default function ProductCard({ product, showImageControls = false }: ProductCardProps) {
  const [imageFitMode, setImageFitMode] = useState<ImageFitMode>("cover")
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleBuyNow = () => {
    const message = `Hello, I'm interested in buying the ${product.name} for $${product.price}. Can you provide more information?`
    const whatsappUrl = `https://wa.me/211919962999?text=${encodeURIComponent(message)}`

    // Log the inquiry
    const inquiry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      productName: product.name,
      productPrice: product.price,
      message: message,
      type: "product" as const,
    }

    const existingInquiries = JSON.parse(localStorage.getItem("prime-smart-inquiries") || "[]")
    localStorage.setItem("prime-smart-inquiries", JSON.stringify([inquiry, ...existingInquiries]))

    window.open(whatsappUrl, "_blank")
  }

  const getObjectFitClass = (mode: ImageFitMode) => {
    switch (mode) {
      case "cover":
        return "object-cover"
      case "contain":
        return "object-contain"
      case "fill":
        return "object-fill"
      case "scale-down":
        return "object-scale-down"
      default:
        return "object-cover"
    }
  }

  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  return (
    <Card className="overflow-hidden flex flex-col h-full group hover:shadow-lg transition-all duration-300">
      <div className="relative">
        {/* Image Container with Fixed Aspect Ratio */}
        <div className="aspect-square relative bg-gray-50 overflow-hidden">
          {/* Loading State */}
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Error State */}
          {imageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
              <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">Image not available</span>
            </div>
          )}

          {/* Main Image */}
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className={cn(
              "transition-all duration-300 group-hover:scale-105",
              getObjectFitClass(imageFitMode),
              imageLoading && "opacity-0",
              imageError && "opacity-0",
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />

          {/* Image Fit Controls Overlay */}
          {showImageControls && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Select value={imageFitMode} onValueChange={(value: ImageFitMode) => setImageFitMode(value)}>
                <SelectTrigger className="w-auto h-8 text-xs bg-white/90 backdrop-blur-sm border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {imageFitOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{option.label}</span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Stock Badge */}
          {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 left-2">
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Only {product.stock} left
              </span>
            </div>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full font-medium">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Image Fit Mode Indicator */}
        {showImageControls && (
          <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
              {imageFitOptions.find((opt) => opt.value === imageFitMode)?.label}
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 flex-grow">{product.name}</h3>
        </div>

        <p className="text-muted-foreground text-sm mb-2">{product.category}</p>

        <p className="text-sm text-gray-600 line-clamp-2 flex-grow mb-3">{product.description}</p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-primary">${product.price}</span>
          {product.stock !== undefined && <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleBuyNow}
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white transition-colors duration-200"
          disabled={product.stock === 0}
        >
          <WhatsappIcon className="w-5 h-5 mr-2" />
          {product.stock === 0 ? "Out of Stock" : "Buy Now on WhatsApp"}
        </Button>
      </CardFooter>
    </Card>
  )
}
