import type { Product } from "./types"

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation and long battery life.",
    price: 49.99,
    category: "Audio",
    image: "/images/products/earbuds-black.jpeg",
  },
  {
    id: "2",
    name: "ThinkPad Laptop",
    description: "Powerful business laptop with high performance and durability.",
    price: 899.99,
    category: "Computers",
    image: "/images/products/laptop.jpeg",
  },
  {
    id: "3",
    name: "Rugged Smartwatch",
    description: "Durable smartwatch with fitness tracking and long battery life.",
    price: 129.99,
    category: "Wearables",
    image: "/images/products/smartwatch-rugged.jpeg",
  },
  {
    id: "4",
    name: "Wireless Audio Transmitter",
    description: "Bluetooth audio transmitter and receiver for high-quality sound.",
    price: 39.99,
    category: "Audio",
    image: "/images/products/audio-device.jpeg",
  },
  {
    id: "5",
    name: "Rose Gold Smartwatch",
    description: "Elegant smartwatch with health monitoring and notifications.",
    price: 89.99,
    category: "Wearables",
    image: "/images/products/smartwatch-pink.webp",
  },
  {
    id: "6",
    name: "Phone Stand with Microphone",
    description: "Adjustable phone stand with built-in microphone for content creators.",
    price: 29.99,
    category: "Accessories",
    image: "/images/products/phone-stand.png",
  },
  {
    id: "7",
    name: "White Wireless Earbuds",
    description: "Premium wireless earbuds with touch controls and charging case.",
    price: 59.99,
    category: "Audio",
    image: "/images/products/airpods.jpeg",
  },
  {
    id: "8",
    name: "Samsung Galaxy S23",
    description: "Latest Samsung flagship smartphone with advanced camera system and powerful processor.",
    price: 799.99,
    category: "Smartphones",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "9",
    name: "iPhone 15",
    description: "Apple's newest iPhone with stunning display and cutting-edge features.",
    price: 899.99,
    category: "Smartphones",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "10",
    name: "Xiaomi Redmi Note 12",
    description: "Affordable smartphone with excellent performance and battery life.",
    price: 249.99,
    category: "Smartphones",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "11",
    name: "Tecno Spark 10",
    description: "Feature-packed smartphone with large display and long-lasting battery.",
    price: 189.99,
    category: "Smartphones",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "12",
    name: "Infinix Hot 30",
    description: "Stylish smartphone with great camera and performance at an affordable price.",
    price: 199.99,
    category: "Smartphones",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "13",
    name: "JBL Bluetooth Speaker",
    description: "Portable Bluetooth speaker with powerful sound and waterproof design.",
    price: 79.99,
    category: "Audio",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "14",
    name: "HP Laptop 15",
    description: "Reliable laptop for work and study with Intel processor and long battery life.",
    price: 549.99,
    category: "Computers",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "15",
    name: "Dell Inspiron Desktop",
    description: "Powerful desktop computer for home or office use.",
    price: 699.99,
    category: "Computers",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "16",
    name: 'Samsung 43" Smart TV',
    description: "4K Ultra HD Smart TV with vibrant colors and smart features.",
    price: 399.99,
    category: "TVs",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "17",
    name: 'LG 32" HD TV',
    description: "Affordable HD TV with good picture quality and multiple connectivity options.",
    price: 249.99,
    category: "TVs",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "18",
    name: "10,000mAh Power Bank",
    description: "High-capacity power bank with fast charging for multiple devices.",
    price: 34.99,
    category: "Accessories",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "19",
    name: "USB-C Fast Charger",
    description: "Fast charging adapter with USB-C port for rapid device charging.",
    price: 19.99,
    category: "Accessories",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "20",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with long battery life and precise tracking.",
    price: 24.99,
    category: "Accessories",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export function getProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

export function getCategories(): string[] {
  const categories = new Set(products.map((product) => product.category))
  return Array.from(categories)
}
