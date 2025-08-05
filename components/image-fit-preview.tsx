"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ImageFitMode = "cover" | "contain" | "fill" | "scale-down"

interface ImageFitPreviewProps {
  src: string
  alt: string
  className?: string
  showControls?: boolean
  defaultFitMode?: ImageFitMode
  onFitModeChange?: (mode: ImageFitMode) => void
}

const imageFitOptions = [
  {
    value: "cover" as const,
    label: "Cover",
    description: "Fills the frame completely, may crop parts of the image",
    icon: "🔲",
  },
  {
    value: "contain" as const,
    label: "Contain",
    description: "Shows the entire image, may leave empty space",
    icon: "📦",
  },
  {
    value: "fill" as const,
    label: "Fill",
    description: "Stretches image to fill frame exactly",
    icon: "↔️",
  },
  {
    value: "scale-down" as const,
    label: "Scale Down",
    description: "Uses contain or original size, whichever is smaller",
    icon: "🔽",
  },
]

export default function ImageFitPreview({
  src,
  alt,
  className,
  showControls = true,
  defaultFitMode = "cover",
  onFitModeChange,
}: ImageFitPreviewProps) {
  const [fitMode, setFitMode] = useState<ImageFitMode>(defaultFitMode)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const handleFitModeChange = (newMode: ImageFitMode) => {
    setFitMode(newMode)
    onFitModeChange?.(newMode)
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

  const currentOption = imageFitOptions.find((opt) => opt.value === fitMode)

  return (
    <div className={cn("space-y-4", className)}>
      {/* Image Preview */}
      <div className="relative">
        <div className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden border-2 border-dashed border-gray-200">
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
              <span className="text-sm">Failed to load image</span>
            </div>
          )}

          {/* Main Image */}
          <Image
            src={src || "/placeholder.svg?height=400&width=400"}
            alt={alt}
            fill
            className={cn(
              "transition-all duration-300",
              getObjectFitClass(fitMode),
              imageLoading && "opacity-0",
              imageError && "opacity-0",
            )}
            onLoad={() => {
              setImageLoading(false)
              setImageError(false)
            }}
            onError={() => {
              setImageLoading(false)
              setImageError(true)
            }}
            sizes="400px"
          />

          {/* Fit Mode Indicator */}
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-black/70 text-white border-none">
              {currentOption?.icon} {currentOption?.label}
            </Badge>
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Image Fit Options</CardTitle>
            <CardDescription className="text-sm">Choose how the image should fit within the frame</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={fitMode} onValueChange={handleFitModeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {imageFitOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <span>{option.icon}</span>
                      <div className="flex flex-col">
                        <span className="font-medium">{option.label}</span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Quick Toggle Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {imageFitOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={fitMode === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFitModeChange(option.value)}
                  className="justify-start"
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </Button>
              ))}
            </div>

            {/* Current Mode Description */}
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>{currentOption?.label}:</strong> {currentOption?.description}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
