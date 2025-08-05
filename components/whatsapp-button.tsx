"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { WhatsappIcon } from "@/components/icons"

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show button after scrolling down a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    const message = "Hello, I'm interested in your products. Can you provide more information?"
    const whatsappUrl = `https://wa.me/211919962999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isVisible) return null

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 bg-[#25D366] hover:bg-[#128C7E] shadow-lg"
      aria-label="Contact us on WhatsApp"
    >
      <WhatsappIcon className="w-7 h-7 text-white" />
    </Button>
  )
}
