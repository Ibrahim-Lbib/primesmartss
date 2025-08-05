"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, ImageIcon, AlertCircle, CheckCircle, Camera, FileImage, Loader2, Edit, Plus, Save, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/types"
import ImageFitPreview from "@/components/image-fit-preview"

interface ResponsiveProductFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (productData: Omit<Product, "id">) => Promise<void>
  editingProduct?: Product | null
  categories: string[]
}

interface FormData {
  name: string
  description: string
  price: string
  category: string
  image: string
  stock: string
}

interface ImageUploadState {
  isDragging: boolean
  isUploading: boolean
  preview: string | null
  error: string | null
  fitMode: "cover" | "contain" | "fill" | "scale-down"
}

export default function ResponsiveProductForm({
  isOpen,
  onClose,
  onSubmit,
  editingProduct,
  categories,
}: ResponsiveProductFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: editingProduct?.name || "",
    description: editingProduct?.description || "",
    price: editingProduct?.price?.toString() || "",
    category: editingProduct?.category || "",
    image: editingProduct?.image || "",
    stock: editingProduct?.stock?.toString() || "10",
  })

  const [imageUpload, setImageUpload] = useState<ImageUploadState>({
    isDragging: false,
    isUploading: false,
    preview: editingProduct?.image || null,
    error: null,
    fitMode: "cover",
  })

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [showImagePreview, setShowImagePreview] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounterRef = useRef(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const defaultCategories = ["Audio", "Computers", "Smartphones", "TVs", "Accessories", "Wearables"]
  const allCategories = [...new Set([...defaultCategories, ...categories])]

  // Reset form data when editing product changes
  useEffect(() => {
    if (editingProduct) {
      setIsEditMode(true)
      setFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        price: editingProduct.price?.toString() || "",
        category: editingProduct.category || "",
        image: editingProduct.image || "",
        stock: editingProduct.stock?.toString() || "10",
      })
      setImageUpload((prev) => ({
        ...prev,
        preview: editingProduct.image || null,
      }))
      setFormErrors({})
      setSubmitError(null)
    } else {
      setIsEditMode(false)
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "10",
      })
      setImageUpload((prev) => ({
        ...prev,
        preview: null,
      }))
      setFormErrors({})
      setSubmitError(null)
    }
  }, [editingProduct])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0
      }
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Validation functions
  const validateField = (field: keyof FormData, value: string): string | null => {
    switch (field) {
      case "name":
        return value.trim().length < 2 ? "Product name must be at least 2 characters" : null
      case "description":
        return value.trim().length < 10 ? "Description must be at least 10 characters" : null
      case "price":
        const price = Number.parseFloat(value)
        return isNaN(price) || price <= 0 ? "Price must be a valid positive number" : null
      case "category":
        return !value.trim() ? "Please select a category" : null
      case "stock":
        const stock = Number.parseInt(value)
        return isNaN(stock) || stock < 0 ? "Stock must be a valid non-negative number" : null
      default:
        return null
    }
  }

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {}
    let isValid = true

    Object.keys(formData).forEach((key) => {
      const field = key as keyof FormData
      const error = validateField(field, formData[field])
      if (error) {
        errors[field] = error
        isValid = false
      }
    })

    setFormErrors(errors)
    return isValid
  }

  // Form handlers
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const hasFieldChanged = (field: keyof FormData): boolean => {
    if (!editingProduct) return false

    switch (field) {
      case "name":
        return formData.name !== editingProduct.name
      case "description":
        return formData.description !== editingProduct.description
      case "price":
        return formData.price !== editingProduct.price?.toString()
      case "category":
        return formData.category !== editingProduct.category
      case "stock":
        return formData.stock !== editingProduct.stock?.toString()
      case "image":
        return imageUpload.preview !== editingProduct.image
      default:
        return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validateForm()) {
      const firstErrorField = Object.keys(formErrors)[0]
      if (firstErrorField && scrollContainerRef.current) {
        const errorElement = scrollContainerRef.current.querySelector(`[name="${firstErrorField}"]`)
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }
      return
    }

    setIsSubmitting(true)

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number.parseFloat(formData.price),
        category: formData.category.trim(),
        image: imageUpload.preview || formData.image || "/placeholder.svg?height=300&width=300",
        stock: Number.parseInt(formData.stock),
      }

      // Check if any changes were made in edit mode
      if (isEditMode && editingProduct) {
        const hasChanges = Object.keys(productData).some((key) => {
          const field = key as keyof typeof productData
          if (field === "image") {
            return imageUpload.preview !== editingProduct.image
          }
          return productData[field] !== editingProduct[field]
        })

        if (!hasChanges) {
          setSubmitError("No changes detected. Please modify at least one field to update the product.")
          return
        }
      }

      await onSubmit(productData)
      handleClose()
    } catch (error) {
      console.error("Error submitting form:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to save product. Please try again."
      setSubmitError(errorMessage)

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      stock: "10",
    })
    setImageUpload({
      isDragging: false,
      isUploading: false,
      preview: null,
      error: null,
      fitMode: "cover",
    })
    setFormErrors({})
    setSubmitError(null)
    setShowImagePreview(false)
    onClose()
  }

  // Image upload handlers with automatic resizing
  const resizeImage = (file: File, maxWidth = 800, maxHeight = 800, quality = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        // Draw and resize image
        ctx?.drawImage(img, 0, 0, width, height)

        // Convert to base64 with compression
        const resizedDataUrl = canvas.toDataURL("image/jpeg", quality)
        resolve(resizedDataUrl)
      }

      img.onerror = () => reject(new Error("Failed to load image for resizing"))
      img.src = URL.createObjectURL(file)
    })
  }

  const handleImageSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setImageUpload((prev) => ({ ...prev, error: "Please select a valid image file" }))
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setImageUpload((prev) => ({ ...prev, error: "Image size must be less than 10MB" }))
      return
    }

    setImageUpload((prev) => ({ ...prev, isUploading: true, error: null }))

    try {
      // Resize image automatically
      const resizedImage = await resizeImage(file)

      setImageUpload((prev) => ({
        ...prev,
        preview: resizedImage,
        isUploading: false,
      }))
      setFormData((prev) => ({ ...prev, image: resizedImage }))
    } catch (error) {
      console.error("Error processing image:", error)
      setImageUpload((prev) => ({
        ...prev,
        error: "Failed to process image. Please try a different image.",
        isUploading: false,
      }))
    }
  }, [])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageSelect(file)
    }
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current++
    setImageUpload((prev) => ({ ...prev, isDragging: true }))
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current--
    if (dragCounterRef.current === 0) {
      setImageUpload((prev) => ({ ...prev, isDragging: false }))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current = 0
    setImageUpload((prev) => ({ ...prev, isDragging: false }))

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith("image/"))

    if (imageFile) {
      handleImageSelect(imageFile)
    }
  }

  const removeImage = () => {
    setImageUpload((prev) => ({ ...prev, preview: null, error: null }))
    setFormData((prev) => ({ ...prev, image: "" }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="w-full h-full sm:h-auto sm:max-w-5xl sm:max-h-[90vh] p-0 gap-0 overflow-hidden"
        aria-describedby="product-form-description"
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-b bg-white sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl pr-8 flex items-center gap-2">
              {editingProduct ? (
                <>
                  <Edit className="h-5 w-5" />
                  Edit Product: {editingProduct.name}
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Add New Product
                </>
              )}
            </DialogTitle>
            <DialogDescription id="product-form-description" className="text-sm text-muted-foreground">
              {editingProduct
                ? `Update the information for "${editingProduct.name}". Images are automatically resized and optimized.`
                : "Add a new product to your inventory. Images will be automatically resized for optimal display."}
            </DialogDescription>
          </DialogHeader>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={handleClose}
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overscroll-contain"
          style={{
            maxHeight: "calc(100vh - 140px)",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 pb-0">
            {submitError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column - Basic Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base sm:text-lg">Basic Information</CardTitle>
                    <CardDescription className="text-sm">Enter the basic details about your product</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Product Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Product Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter product name"
                        className={cn(
                          "w-full transition-all duration-200",
                          formErrors.name && "border-red-300 focus-visible:ring-red-200",
                          isEditMode && hasFieldChanged("name") && "border-orange-300 bg-orange-50",
                        )}
                        aria-describedby={formErrors.name ? "name-error" : undefined}
                        required
                      />
                      {isEditMode && hasFieldChanged("name") && (
                        <p className="text-xs text-orange-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Modified from: "{editingProduct?.name}"
                        </p>
                      )}
                      {formErrors.name && (
                        <p id="name-error" className="text-sm text-red-600" role="alert">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Price and Stock */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-sm font-medium">
                          Price (USD) *
                        </Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          placeholder="0.00"
                          className={cn(
                            "w-full transition-all duration-200",
                            formErrors.price && "border-red-300 focus-visible:ring-red-200",
                            isEditMode && hasFieldChanged("price") && "border-orange-300 bg-orange-50",
                          )}
                          aria-describedby={formErrors.price ? "price-error" : undefined}
                          required
                        />
                        {isEditMode && hasFieldChanged("price") && (
                          <p className="text-xs text-orange-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Modified from: "${editingProduct?.price}"
                          </p>
                        )}
                        {formErrors.price && (
                          <p id="price-error" className="text-sm text-red-600" role="alert">
                            {formErrors.price}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stock" className="text-sm font-medium">
                          Stock Quantity *
                        </Label>
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          min="0"
                          value={formData.stock}
                          onChange={(e) => handleInputChange("stock", e.target.value)}
                          placeholder="0"
                          className={cn(
                            "w-full transition-all duration-200",
                            formErrors.stock && "border-red-300 focus-visible:ring-red-200",
                            isEditMode && hasFieldChanged("stock") && "border-orange-300 bg-orange-50",
                          )}
                          aria-describedby={formErrors.stock ? "stock-error" : undefined}
                          required
                        />
                        {isEditMode && hasFieldChanged("stock") && (
                          <p className="text-xs text-orange-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Modified from: {editingProduct?.stock}
                          </p>
                        )}
                        {formErrors.stock && (
                          <p id="stock-error" className="text-sm text-red-600" role="alert">
                            {formErrors.stock}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium">
                        Category *
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger
                          className={cn(
                            "w-full transition-all duration-200",
                            formErrors.category && "border-red-300 focus-visible:ring-red-200",
                            isEditMode && hasFieldChanged("category") && "border-orange-300 bg-orange-50",
                          )}
                          aria-describedby={formErrors.category ? "category-error" : undefined}
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {allCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isEditMode && hasFieldChanged("category") && (
                        <p className="text-xs text-orange-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Modified from: "{editingProduct?.category}"
                        </p>
                      )}
                      {formErrors.category && (
                        <p id="category-error" className="text-sm text-red-600" role="alert">
                          {formErrors.category}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Describe your product features and benefits"
                        rows={4}
                        className={cn(
                          "w-full resize-none transition-all duration-200",
                          formErrors.description && "border-red-300 focus-visible:ring-red-200",
                          isEditMode && hasFieldChanged("description") && "border-orange-300 bg-orange-50",
                        )}
                        aria-describedby={formErrors.description ? "description-error" : undefined}
                        required
                      />
                      {isEditMode && hasFieldChanged("description") && (
                        <p className="text-xs text-orange-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Description modified
                        </p>
                      )}
                      {formErrors.description && (
                        <p id="description-error" className="text-sm text-red-600" role="alert">
                          {formErrors.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">{formData.description.length}/500 characters</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Image Upload and Preview */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base sm:text-lg">Product Image</CardTitle>
                        <CardDescription className="text-sm">
                          Upload and preview your product image with automatic resizing
                        </CardDescription>
                      </div>
                      {imageUpload.preview && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowImagePreview(!showImagePreview)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {showImagePreview ? "Hide" : "Preview"}
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Image Preview with Fit Options */}
                    {imageUpload.preview && showImagePreview && (
                      <ImageFitPreview
                        src={imageUpload.preview || "/placeholder.svg"}
                        alt="Product preview"
                        defaultFitMode={imageUpload.fitMode}
                        onFitModeChange={(mode) => setImageUpload((prev) => ({ ...prev, fitMode: mode }))}
                      />
                    )}

                    {/* Simple Preview */}
                    {imageUpload.preview && !showImagePreview && (
                      <div className="relative">
                        <div className="relative aspect-square max-w-sm mx-auto rounded-lg overflow-hidden border">
                          <img
                            src={imageUpload.preview || "/placeholder.svg"}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={removeImage}
                            aria-label="Remove image"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Badge variant="secondary" className="mt-2 mx-auto block w-fit">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Image uploaded & optimized
                        </Badge>
                        {isEditMode && hasFieldChanged("image") && (
                          <p className="text-xs text-orange-600 flex items-center gap-1 justify-center mt-2">
                            <AlertCircle className="h-3 w-3" />
                            Modified from original image
                          </p>
                        )}
                      </div>
                    )}

                    {/* Upload Area */}
                    {!imageUpload.preview && (
                      <div
                        className={cn(
                          "relative border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors",
                          imageUpload.isDragging
                            ? "border-primary bg-primary/5"
                            : "border-gray-300 hover:border-gray-400",
                          imageUpload.isUploading && "pointer-events-none opacity-50",
                        )}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        {imageUpload.isUploading ? (
                          <div className="flex flex-col items-center space-y-2">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">Processing and optimizing image...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-4">
                            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100">
                              <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm sm:text-base font-medium">
                                Drop your image here, or{" "}
                                <button
                                  type="button"
                                  className="text-primary hover:underline"
                                  onClick={() => fileInputRef.current?.click()}
                                >
                                  browse
                                </button>
                              </p>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                PNG, JPG, GIF up to 10MB • Auto-resized for optimal display
                              </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full sm:w-auto"
                              >
                                <FileImage className="h-4 w-4 mr-2" />
                                Choose File
                              </Button>

                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (fileInputRef.current) {
                                    fileInputRef.current.setAttribute("capture", "environment")
                                    fileInputRef.current.click()
                                  }
                                }}
                                className="w-full sm:w-auto sm:hidden"
                              >
                                <Camera className="h-4 w-4 mr-2" />
                                Take Photo
                              </Button>
                            </div>
                          </div>
                        )}

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          className="hidden"
                          aria-label="Upload product image"
                        />
                      </div>
                    )}

                    {/* Image Upload Error */}
                    {imageUpload.error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{imageUpload.error}</AlertDescription>
                      </Alert>
                    )}

                    {/* URL Input Alternative */}
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl" className="text-sm font-medium">
                        Or enter image URL
                      </Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        value={formData.image}
                        onChange={(e) => handleInputChange("image", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        External images will be displayed as-is without automatic optimization
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Spacer for footer */}
            <div className="h-20 sm:h-4" />
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 border-t bg-white p-4 sm:p-6 sticky bottom-0">
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isEditMode ? "Cancel Changes" : "Cancel"}
            </Button>
            <Button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isEditMode ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>
                  {isEditMode ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Product
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </>
                  )}
                </>
              )}
            </Button>
          </div>

          {isEditMode && (
            <div className="mt-3 text-center">
              <p className="text-xs text-muted-foreground">
                Editing: {editingProduct?.name} • Images auto-optimized for best display
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
