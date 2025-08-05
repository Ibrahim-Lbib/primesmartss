"use client"

import type { Product } from "./types"

// Default products that will be used if no localStorage data exists
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation and long battery life.",
    price: 49.99,
    category: "Audio",
    image: "/images/products/earbuds-black.jpeg",
    stock: 15,
  },
  {
    id: "2",
    name: "ThinkPad Laptop",
    description: "Powerful business laptop with high performance and durability.",
    price: 899.99,
    category: "Computers",
    image: "/images/products/laptop.jpeg",
    stock: 5,
  },
  {
    id: "3",
    name: "Rugged Smartwatch",
    description: "Durable smartwatch with fitness tracking and long battery life.",
    price: 129.99,
    category: "Wearables",
    image: "/images/products/smartwatch-rugged.jpeg",
    stock: 8,
  },
  {
    id: "4",
    name: "Wireless Audio Transmitter",
    description: "Bluetooth audio transmitter and receiver for high-quality sound.",
    price: 39.99,
    category: "Audio",
    image: "/images/products/audio-device.jpeg",
    stock: 12,
  },
  {
    id: "5",
    name: "Rose Gold Smartwatch",
    description: "Elegant smartwatch with health monitoring and notifications.",
    price: 89.99,
    category: "Wearables",
    image: "/images/products/smartwatch-pink.webp",
    stock: 6,
  },
  {
    id: "6",
    name: "Phone Stand with Microphone",
    description: "Adjustable phone stand with built-in microphone for content creators.",
    price: 29.99,
    category: "Accessories",
    image: "/images/products/phone-stand.png",
    stock: 20,
  },
  {
    id: "7",
    name: "White Wireless Earbuds",
    description: "Premium wireless earbuds with touch controls and charging case.",
    price: 59.99,
    category: "Audio",
    image: "/images/products/airpods.jpeg",
    stock: 10,
  },
  {
    id: "8",
    name: "Samsung Galaxy S23",
    description: "Latest Samsung flagship smartphone with advanced camera system and powerful processor.",
    price: 799.99,
    category: "Smartphones",
    image: "/placeholder.svg?height=300&width=300",
    stock: 4,
  },
  {
    id: "9",
    name: "iPhone 15",
    description: "Apple's newest iPhone with stunning display and cutting-edge features.",
    price: 899.99,
    category: "Smartphones",
    image: "/placeholder.svg?height=300&width=300",
    stock: 3,
  },
  {
    id: "10",
    name: "Xiaomi Redmi Note 12",
    description: "Affordable smartphone with excellent performance and battery life.",
    price: 249.99,
    category: "Smartphones",
    image: "/placeholder.svg?height=300&width=300",
    stock: 15,
  },
]

// Storage key for localStorage
const STORAGE_KEY = "prime-smart-products"
const STORAGE_VERSION_KEY = "prime-smart-products-version"
const CURRENT_VERSION = "1.0"

// Event system for real-time updates
type ProductEventType = "products-updated" | "product-added" | "product-updated" | "product-deleted"

interface ProductEvent {
  type: ProductEventType
  products: Product[]
  changedProduct?: Product
}

class ProductEventEmitter {
  private listeners: Map<ProductEventType, Set<(event: ProductEvent) => void>> = new Map()

  on(eventType: ProductEventType, callback: (event: ProductEvent) => void) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set())
    }
    this.listeners.get(eventType)!.add(callback)

    // Return unsubscribe function
    return () => {
      this.listeners.get(eventType)?.delete(callback)
    }
  }

  emit(eventType: ProductEventType, event: ProductEvent) {
    this.listeners.get(eventType)?.forEach((callback) => {
      try {
        callback(event)
      } catch (error) {
        console.error(`Error in product event listener for ${eventType}:`, error)
      }
    })
  }
}

export const productEvents = new ProductEventEmitter()

// Product store class for managing product data
class ProductStore {
  private products: Product[] = []
  private initialized = false

  // Initialize the store with data from localStorage or defaults
  init(): Product[] {
    if (this.initialized) {
      return this.products
    }

    try {
      // Check if we're in a browser environment
      if (typeof window === "undefined") {
        this.products = [...DEFAULT_PRODUCTS]
        return this.products
      }

      const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY)
      const storedProducts = localStorage.getItem(STORAGE_KEY)

      // If no stored data or version mismatch, use defaults
      if (!storedProducts || storedVersion !== CURRENT_VERSION) {
        this.products = [...DEFAULT_PRODUCTS]
        this.saveToStorage()
        localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION)
      } else {
        const parsedProducts = JSON.parse(storedProducts)
        // Validate the data structure
        if (Array.isArray(parsedProducts) && this.validateProducts(parsedProducts)) {
          this.products = parsedProducts
        } else {
          console.warn("Invalid product data in localStorage, using defaults")
          this.products = [...DEFAULT_PRODUCTS]
          this.saveToStorage()
        }
      }

      this.initialized = true
      console.log(`ProductStore initialized with ${this.products.length} products`)
      return this.products
    } catch (error) {
      console.error("Error initializing ProductStore:", error)
      this.products = [...DEFAULT_PRODUCTS]
      this.initialized = true
      return this.products
    }
  }

  // Validate product data structure
  private validateProducts(products: any[]): boolean {
    return products.every(
      (product) =>
        typeof product === "object" &&
        typeof product.id === "string" &&
        typeof product.name === "string" &&
        typeof product.description === "string" &&
        typeof product.price === "number" &&
        typeof product.category === "string" &&
        typeof product.image === "string",
    )
  }

  // Save products to localStorage
  private saveToStorage() {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products))
        localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION)
      }
    } catch (error) {
      console.error("Error saving products to localStorage:", error)
    }
  }

  // Get all products
  getProducts(): Product[] {
    if (!this.initialized) {
      this.init()
    }
    return [...this.products]
  }

  // Get product by ID
  getProductById(id: string): Product | undefined {
    if (!this.initialized) {
      this.init()
    }
    return this.products.find((product) => product.id === id)
  }

  // Get products by category
  getProductsByCategory(category: string): Product[] {
    if (!this.initialized) {
      this.init()
    }
    return this.products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  }

  // Get all categories
  getCategories(): string[] {
    if (!this.initialized) {
      this.init()
    }
    const categories = new Set(this.products.map((product) => product.category))
    return Array.from(categories)
  }

  // Add a new product
  addProduct(product: Omit<Product, "id">): Product {
    if (!this.initialized) {
      this.init()
    }

    const newProduct: Product = {
      ...product,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    }

    this.products.push(newProduct)
    this.saveToStorage()

    // Emit events
    productEvents.emit("product-added", {
      type: "product-added",
      products: this.getProducts(),
      changedProduct: newProduct,
    })
    productEvents.emit("products-updated", {
      type: "products-updated",
      products: this.getProducts(),
    })

    console.log("Product added:", newProduct.name)
    return newProduct
  }

  // Update an existing product
  updateProduct(id: string, updates: Partial<Omit<Product, "id">>): Product | null {
    if (!this.initialized) {
      this.init()
    }

    const index = this.products.findIndex((product) => product.id === id)
    if (index === -1) {
      console.error("Product not found for update:", id)
      throw new Error(`Product with ID ${id} not found`)
    }

    // Validate the updates
    const currentProduct = this.products[index]
    const updatedProduct = { ...currentProduct, ...updates }

    // Basic validation
    if (updatedProduct.name && updatedProduct.name.trim().length < 2) {
      throw new Error("Product name must be at least 2 characters")
    }
    if (updatedProduct.price !== undefined && (isNaN(updatedProduct.price) || updatedProduct.price <= 0)) {
      throw new Error("Price must be a valid positive number")
    }
    if (updatedProduct.stock !== undefined && (isNaN(updatedProduct.stock) || updatedProduct.stock < 0)) {
      throw new Error("Stock must be a valid non-negative number")
    }
    if (updatedProduct.description && updatedProduct.description.trim().length < 10) {
      throw new Error("Description must be at least 10 characters")
    }
    if (updatedProduct.category && !updatedProduct.category.trim()) {
      throw new Error("Category is required")
    }

    try {
      this.products[index] = updatedProduct
      this.saveToStorage()

      // Emit events
      productEvents.emit("product-updated", {
        type: "product-updated",
        products: this.getProducts(),
        changedProduct: updatedProduct,
      })
      productEvents.emit("products-updated", {
        type: "products-updated",
        products: this.getProducts(),
      })

      console.log("Product updated successfully:", updatedProduct.name)
      return updatedProduct
    } catch (error) {
      console.error("Error updating product:", error)
      throw new Error("Failed to save product updates")
    }
  }

  // Delete a product
  deleteProduct(id: string): boolean {
    if (!this.initialized) {
      this.init()
    }

    const index = this.products.findIndex((product) => product.id === id)
    if (index === -1) {
      console.error("Product not found for deletion:", id)
      return false
    }

    const deletedProduct = this.products[index]
    this.products.splice(index, 1)
    this.saveToStorage()

    // Emit events
    productEvents.emit("product-deleted", {
      type: "product-deleted",
      products: this.getProducts(),
      changedProduct: deletedProduct,
    })
    productEvents.emit("products-updated", {
      type: "products-updated",
      products: this.getProducts(),
    })

    console.log("Product deleted:", deletedProduct.name)
    return true
  }

  // Reset to default products
  resetToDefaults(): Product[] {
    this.products = [...DEFAULT_PRODUCTS]
    this.saveToStorage()

    productEvents.emit("products-updated", {
      type: "products-updated",
      products: this.getProducts(),
    })

    console.log("Products reset to defaults")
    return this.getProducts()
  }

  // Get store statistics
  getStats() {
    if (!this.initialized) {
      this.init()
    }

    const totalProducts = this.products.length
    const totalStock = this.products.reduce((sum, product) => sum + (product.stock || 0), 0)
    const outOfStock = this.products.filter((product) => (product.stock || 0) === 0).length
    const categories = this.getCategories().length

    return {
      totalProducts,
      totalStock,
      outOfStock,
      categories,
    }
  }

  // Get product update history (for future audit trail)
  getProductHistory(id: string): any[] {
    // This could be expanded to track changes over time
    const product = this.getProductById(id)
    return product
      ? [
          {
            timestamp: new Date().toISOString(),
            action: "view",
            product: product,
          },
        ]
      : []
  }
}

// Create and export a singleton instance
export const productStore = new ProductStore()

// Export convenience functions that use the store
export function getProducts(): Product[] {
  return productStore.getProducts()
}

export function getProductById(id: string): Product | undefined {
  return productStore.getProductById(id)
}

export function getProductsByCategory(category: string): Product[] {
  return productStore.getProductsByCategory(category)
}

export function getCategories(): string[] {
  return productStore.getCategories()
}

export function addProduct(product: Omit<Product, "id">): Product {
  return productStore.addProduct(product)
}

export function updateProduct(id: string, updates: Partial<Omit<Product, "id">>): Product | null {
  return productStore.updateProduct(id, updates)
}

export function deleteProduct(id: string): boolean {
  return productStore.deleteProduct(id)
}

export function resetProductsToDefaults(): Product[] {
  return productStore.resetToDefaults()
}

export function getProductStats() {
  return productStore.getStats()
}

// Initialize the store when the module is imported
if (typeof window !== "undefined") {
  productStore.init()
}
