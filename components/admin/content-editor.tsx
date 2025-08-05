"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"

interface SiteContent {
  heroTitle: string
  heroDescription: string
  aboutTitle: string
  aboutDescription: string
  featuredProductsTitle: string
  featuredProductsDescription: string
  contactTitle: string
  contactDescription: string
}

export default function ContentEditor() {
  const [content, setContent] = useState<SiteContent>({
    heroTitle: "Your Tech Partner in Juba",
    heroDescription:
      "Discover the latest electronics and tech gadgets at Prime Smart. Quality products at affordable prices.",
    aboutTitle: "About Prime Smart",
    aboutDescription: "Your trusted electronics store in Juba, South Sudan",
    featuredProductsTitle: "Featured Products",
    featuredProductsDescription: "Check out our most popular electronics and tech gadgets",
    contactTitle: "Contact Information",
    contactDescription: "Get in touch with us for any inquiries",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // This ensures we only render client-side components after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load content from localStorage on component mount
  useEffect(() => {
    if (!isClient) return

    try {
      const savedContent = localStorage.getItem("prime-smart-content")
      if (savedContent) {
        setContent(JSON.parse(savedContent))
      }
    } catch (error) {
      console.error("Error loading content:", error)
    }
  }, [isClient])

  const handleSave = () => {
    setIsSaving(true)

    try {
      localStorage.setItem("prime-smart-content", JSON.stringify(content))

      // Simulate save delay
      setTimeout(() => {
        setIsSaving(false)
        alert("Content saved successfully!")
      }, 1000)
    } catch (error) {
      console.error("Error saving content:", error)
      alert("There was an error saving the content. Please try again.")
      setIsSaving(false)
    }
  }

  const handleChange = (field: keyof SiteContent, value: string) => {
    setContent({ ...content, [field]: value })
  }

  // Don't render anything during SSR to prevent hydration errors
  if (!isClient) {
    return <div>Loading content editor...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Content Editor</h2>
          <p className="text-muted-foreground">Update your website content and messaging</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>Main banner content on your homepage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input
                id="heroTitle"
                value={content.heroTitle}
                onChange={(e) => handleChange("heroTitle", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroDescription">Hero Description</Label>
              <Textarea
                id="heroDescription"
                value={content.heroDescription}
                onChange={(e) => handleChange("heroDescription", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Section</CardTitle>
            <CardDescription>About section content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aboutTitle">About Title</Label>
              <Input
                id="aboutTitle"
                value={content.aboutTitle}
                onChange={(e) => handleChange("aboutTitle", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutDescription">About Description</Label>
              <Textarea
                id="aboutDescription"
                value={content.aboutDescription}
                onChange={(e) => handleChange("aboutDescription", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Products Section</CardTitle>
            <CardDescription>Featured products section content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="featuredTitle">Section Title</Label>
              <Input
                id="featuredTitle"
                value={content.featuredProductsTitle}
                onChange={(e) => handleChange("featuredProductsTitle", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredDescription">Section Description</Label>
              <Textarea
                id="featuredDescription"
                value={content.featuredProductsDescription}
                onChange={(e) => handleChange("featuredProductsDescription", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Section</CardTitle>
            <CardDescription>Contact section content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactTitle">Contact Title</Label>
              <Input
                id="contactTitle"
                value={content.contactTitle}
                onChange={(e) => handleChange("contactTitle", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactDescription">Contact Description</Label>
              <Textarea
                id="contactDescription"
                value={content.contactDescription}
                onChange={(e) => handleChange("contactDescription", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
