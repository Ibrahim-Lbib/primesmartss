"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { WhatsappIcon } from "./icons"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Format the message for WhatsApp
    const whatsappMessage = `
*New Contact Form Submission*
---------------------------
*Name:* ${formData.name}
*Email:* ${formData.email}
${formData.phone ? `*Phone:* ${formData.phone}` : ""}
---------------------------
*Message:*
${formData.message}
---------------------------
Sent from Prime Smart website
`.trim()

    // Open WhatsApp with the formatted message
    const whatsappUrl = `https://wa.me/211919962999?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, "_blank")

    // Reset form after short delay
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start gap-3">
        <WhatsappIcon className="h-5 w-5 mt-0.5 text-[#25D366] flex-shrink-0" />
        <p className="text-sm text-gray-700">
          Your message will be sent directly to our WhatsApp. We'll respond as soon as possible!
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center justify-between">
          <span>
            Full Name <span className="text-red-500">*</span>
          </span>
          {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className={errors.name ? "border-red-300 focus-visible:ring-red-200" : ""}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center justify-between">
          <span>
            Email Address <span className="text-red-500">*</span>
          </span>
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className={errors.email ? "border-red-300 focus-visible:ring-red-200" : ""}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+211 XXXX XXXXX" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="flex items-center justify-between">
          <span>
            Message <span className="text-red-500">*</span>
          </span>
          {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          className={errors.message ? "border-red-300 focus-visible:ring-red-200" : ""}
          rows={5}
          required
        />
      </div>

      <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#128C7E]" disabled={isSubmitting}>
        <WhatsappIcon className="mr-2 h-5 w-5" />
        {isSubmitting ? "Opening WhatsApp..." : "Send via WhatsApp"}
      </Button>
    </form>
  )
}
