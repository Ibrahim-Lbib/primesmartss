export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock?: number
}

export interface Inquiry {
  id: string
  timestamp: string
  productName: string
  productPrice: number
  message: string
  type: "product" | "contact" | "general"
}
