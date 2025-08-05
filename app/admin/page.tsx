"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductManager from "@/components/admin/product-manager"
import ContentEditor from "@/components/admin/content-editor"
import OrderInquiries from "@/components/admin/order-inquiries"
import { Package, FileText, MessageSquare, Shield } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [isClient, setIsClient] = useState(false)

  // This ensures we only render client-side components after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - in production, use proper authentication
    if (password === "primesmart2024") {
      setIsAuthenticated(true)
      // Store authentication in sessionStorage
      sessionStorage.setItem("admin-authenticated", "true")
    } else {
      alert("Incorrect password")
    }
  }

  // Check for existing authentication
  useEffect(() => {
    const authenticated = sessionStorage.getItem("admin-authenticated") === "true"
    setIsAuthenticated(authenticated)
  }, [])

  // Don't render anything during SSR to prevent hydration errors
  if (!isClient) {
    return <div className="min-h-screen flex items-center justify-center">Loading admin panel...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter password to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                Login
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Prime Smart Admin Panel</h1>
        <p className="text-muted-foreground mt-2">Manage your store content and track customer inquiries</p>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="inquiries" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Inquiries
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductManager />
        </TabsContent>

        <TabsContent value="content">
          <ContentEditor />
        </TabsContent>

        <TabsContent value="inquiries">
          <OrderInquiries />
        </TabsContent>
      </Tabs>
    </div>
  )
}
