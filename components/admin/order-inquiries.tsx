"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Calendar, Package, Trash2, Download } from "lucide-react"
import { productEvents } from "@/lib/product-store"

interface Inquiry {
  id: string
  timestamp: string
  productName: string
  productPrice: number
  message: string
  type: "product" | "contact" | "general"
}

export default function OrderInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isClient, setIsClient] = useState(false)

  // This ensures we only render client-side components after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load inquiries from localStorage on component mount
  useEffect(() => {
    if (!isClient) return

    try {
      const savedInquiries = localStorage.getItem("prime-smart-inquiries")
      if (savedInquiries) {
        setInquiries(JSON.parse(savedInquiries))
      } else {
        // Add some sample data
        const sampleInquiries: Inquiry[] = [
          {
            id: "1",
            timestamp: new Date().toISOString(),
            productName: "Wireless Earbuds",
            productPrice: 49.99,
            message:
              "Hello, I'm interested in buying the Wireless Earbuds for $49.99. Can you provide more information?",
            type: "product",
          },
          {
            id: "2",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            productName: "ThinkPad Laptop",
            productPrice: 899.99,
            message:
              "Hello, I'm interested in buying the ThinkPad Laptop for $899.99. Can you provide more information?",
            type: "product",
          },
        ]
        setInquiries(sampleInquiries)
        localStorage.setItem("prime-smart-inquiries", JSON.stringify(sampleInquiries))
      }
    } catch (error) {
      console.error("Error loading inquiries:", error)
    }
  }, [isClient])

  // Add this to track edit activities
  useEffect(() => {
    if (!isClient) return

    const unsubscribe = productEvents.on("product-updated", (event) => {
      if (event.changedProduct) {
        const editInquiry = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          productName: event.changedProduct.name,
          productPrice: event.changedProduct.price,
          message: `Product "${event.changedProduct.name}" was updated in the admin panel`,
          type: "general" as const,
        }

        const existingInquiries = JSON.parse(localStorage.getItem("prime-smart-inquiries") || "[]")
        localStorage.setItem("prime-smart-inquiries", JSON.stringify([editInquiry, ...existingInquiries]))

        // Update local state if needed
        setInquiries((prev) => [editInquiry, ...prev])
      }
    })

    return unsubscribe
  }, [isClient])

  const handleDelete = (id: string) => {
    try {
      if (confirm("Are you sure you want to delete this inquiry?")) {
        const updatedInquiries = inquiries.filter((inquiry) => inquiry.id !== id)
        setInquiries(updatedInquiries)
        localStorage.setItem("prime-smart-inquiries", JSON.stringify(updatedInquiries))
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error)
      alert("There was an error deleting the inquiry. Please try again.")
    }
  }

  const handleExport = () => {
    try {
      const csvContent = [
        ["Date", "Product", "Price", "Type", "Message"],
        ...inquiries.map((inquiry) => [
          new Date(inquiry.timestamp).toLocaleString(),
          inquiry.productName,
          inquiry.productPrice.toString(),
          inquiry.type,
          inquiry.message.replace(/\n/g, " "),
        ]),
      ]
        .map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `prime-smart-inquiries-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting inquiries:", error)
      alert("There was an error exporting the inquiries. Please try again.")
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "product":
        return "default"
      case "contact":
        return "secondary"
      case "general":
        return "outline"
      default:
        return "outline"
    }
  }

  // Don't render anything during SSR to prevent hydration errors
  if (!isClient) {
    return <div>Loading inquiries...</div>
  }

  const totalInquiries = inquiries.length
  const todayInquiries = inquiries.filter(
    (inquiry) => new Date(inquiry.timestamp).toDateString() === new Date().toDateString(),
  ).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Order Inquiries</h2>
          <p className="text-muted-foreground">Track customer interest and WhatsApp interactions</p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInquiries}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Inquiries</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayInquiries}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Inquiries</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiries.filter((i) => i.type === "product").length}</div>
            <p className="text-xs text-muted-foreground">Product interest</p>
          </CardContent>
        </Card>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No inquiries yet</h3>
              <p className="text-muted-foreground text-center">
                Customer inquiries will appear here when they click WhatsApp buttons on your products.
              </p>
            </CardContent>
          </Card>
        ) : (
          inquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{inquiry.productName}</CardTitle>
                      <Badge variant={getTypeColor(inquiry.type)}>{inquiry.type}</Badge>
                    </div>
                    <CardDescription>
                      {new Date(inquiry.timestamp).toLocaleString()} • ${inquiry.productPrice}
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(inquiry.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm whitespace-pre-wrap">{inquiry.message}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
