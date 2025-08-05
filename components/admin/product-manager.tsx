"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, RefreshCw, AlertCircle, CheckCircle } from "lucide-react"
import { useProducts, useProductCategories } from "@/hooks/use-products"
import { addProduct, updateProduct, deleteProduct, resetProductsToDefaults, getProductStats } from "@/lib/product-store"
import ResponsiveProductForm from "./responsive-product-form"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function ProductManager() {
  const { products, loading, error, refreshProducts } = useProducts()
  const { categories } = useProductCategories()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const stats = getProductStats()

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const handleFormSubmit = async (productData: Omit<Product, "id">) => {
    try {
      if (editingProduct) {
        const updated = updateProduct(editingProduct.id, productData)
        if (updated) {
          setSuccessMessage(`Product "${updated.name}" updated successfully!`)
          setEditingProduct(null) // Clear editing state
        } else {
          throw new Error("Failed to update product")
        }
      } else {
        const newProduct = addProduct(productData)
        setSuccessMessage(`Product "${newProduct.name}" added successfully!`)
      }
    } catch (error) {
      console.error("Error saving product:", error)
      throw error
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
    setSuccessMessage(null) // Clear any existing messages
  }

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        const success = deleteProduct(id)
        if (success) {
          setSuccessMessage(`Product "${name}" deleted successfully!`)
        } else {
          alert("Failed to delete product")
        }
      } catch (error) {
        console.error("Error deleting product:", error)
        alert("An error occurred while deleting the product")
      }
    }
  }

  const handleResetToDefaults = () => {
    if (confirm("Are you sure you want to reset all products to defaults? This will remove all custom products.")) {
      try {
        resetProductsToDefaults()
        setSuccessMessage("Products reset to defaults successfully!")
      } catch (error) {
        console.error("Error resetting products:", error)
        alert("An error occurred while resetting products")
      }
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
    setSuccessMessage(null)
  }

  const handleOpenAddForm = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="text-center">
          <Button onClick={refreshProducts} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {successMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories}</div>
          </CardContent>
        </Card>
      </div>

      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Product Manager</h2>
          <p className="text-muted-foreground">Add, edit, and manage your product inventory</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={refreshProducts} variant="outline" size="sm" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleResetToDefaults} variant="outline" size="sm" className="w-full sm:w-auto">
            Reset to Defaults
          </Button>
          <Button onClick={handleOpenAddForm} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className={cn(
              "overflow-hidden transition-all duration-200",
              editingProduct?.id === product.id && "ring-2 ring-primary shadow-lg",
            )}
          >
            <CardHeader className="pb-3">
              <div className="aspect-square bg-gray-100 rounded-md mb-3 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-lg truncate flex items-center gap-2">
                    {product.name}
                    {editingProduct?.id === product.id && (
                      <Badge variant="secondary" className="text-xs">
                        Editing
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm">{product.category}</CardDescription>
                </div>
                <Badge variant={product.stock && product.stock > 0 ? "default" : "destructive"} className="shrink-0">
                  Stock: {product.stock || 0}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={editingProduct?.id === product.id ? "default" : "outline"}
                    onClick={() => handleEdit(product)}
                    disabled={isFormOpen && editingProduct?.id !== product.id}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit {product.name}</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={isFormOpen}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete {product.name}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">Start by adding your first product to the inventory.</p>
          <Button onClick={handleOpenAddForm}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Product
          </Button>
        </div>
      )}

      {/* Responsive Product Form */}
      <ResponsiveProductForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        editingProduct={editingProduct}
        categories={categories}
      />
    </div>
  )
}
