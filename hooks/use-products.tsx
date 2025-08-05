"use client"

import { useState, useEffect, useCallback } from "react"
import { productStore, productEvents, type Product } from "@/lib/product-store"
import { updateProduct } from "@/lib/product-store"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize products
  useEffect(() => {
    try {
      const initialProducts = productStore.getProducts()
      setProducts(initialProducts)
      setLoading(false)
    } catch (err) {
      console.error("Error loading products:", err)
      setError("Failed to load products")
      setLoading(false)
    }
  }, [])

  // Listen for product updates
  useEffect(() => {
    const unsubscribe = productEvents.on("products-updated", (event) => {
      setProducts(event.products)
    })

    return unsubscribe
  }, [])

  const refreshProducts = useCallback(() => {
    try {
      const updatedProducts = productStore.getProducts()
      setProducts(updatedProducts)
      setError(null)
    } catch (err) {
      console.error("Error refreshing products:", err)
      setError("Failed to refresh products")
    }
  }, [])

  return {
    products,
    loading,
    error,
    refreshProducts,
  }
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const foundProduct = productStore.getProductById(id)
      setProduct(foundProduct)
      setLoading(false)
    } catch (err) {
      console.error("Error loading product:", err)
      setError("Failed to load product")
      setLoading(false)
    }
  }, [id])

  // Listen for product updates
  useEffect(() => {
    const unsubscribe = productEvents.on("product-updated", (event) => {
      if (event.changedProduct?.id === id) {
        setProduct(event.changedProduct)
      }
    })

    return unsubscribe
  }, [id])

  return {
    product,
    loading,
    error,
  }
}

export function useProductCategories() {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const productCategories = productStore.getCategories()
      setCategories(productCategories)
      setLoading(false)
    } catch (err) {
      console.error("Error loading categories:", err)
      setLoading(false)
    }
  }, [])

  // Listen for product updates that might change categories
  useEffect(() => {
    const unsubscribe = productEvents.on("products-updated", () => {
      const updatedCategories = productStore.getCategories()
      setCategories(updatedCategories)
    })

    return unsubscribe
  }, [])

  return {
    categories,
    loading,
  }
}

export function useProductEdit() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const startEdit = useCallback((product: Product) => {
    setEditingProduct(product)
    setIsEditing(true)
  }, [])

  const cancelEdit = useCallback(() => {
    setEditingProduct(null)
    setIsEditing(false)
  }, [])

  const saveEdit = useCallback(
    async (updates: Partial<Omit<Product, "id">>) => {
      if (!editingProduct) {
        throw new Error("No product is being edited")
      }

      try {
        const updatedProduct = updateProduct(editingProduct.id, updates)
        if (!updatedProduct) {
          throw new Error("Failed to update product")
        }

        setEditingProduct(null)
        setIsEditing(false)
        return updatedProduct
      } catch (error) {
        console.error("Error saving product edit:", error)
        throw error
      }
    },
    [editingProduct],
  )

  return {
    editingProduct,
    isEditing,
    startEdit,
    cancelEdit,
    saveEdit,
  }
}
