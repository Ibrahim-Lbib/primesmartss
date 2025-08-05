"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { type HTMLAttributes, forwardRef } from "react"

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  animation?: "fade-up" | "fade-in" | "slide-in" | "zoom-in" | "bounce"
  delay?: number
  duration?: number
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
  (
    {
      children,
      className,
      animation = "fade-up",
      delay = 0,
      duration = 600,
      threshold = 0.1,
      rootMargin = "0px",
      triggerOnce = true,
      ...props
    },
    forwardedRef,
  ) => {
    const { ref, isVisible } = useScrollAnimation({ threshold, rootMargin, triggerOnce })

    const animationClasses = {
      "fade-up": "translate-y-10 opacity-0",
      "fade-in": "opacity-0",
      "slide-in": "translate-x-10 opacity-0",
      "zoom-in": "scale-95 opacity-0",
      bounce: "translate-y-4 opacity-0",
    }

    const activeAnimationClasses = {
      "fade-up": "translate-y-0 opacity-100",
      "fade-in": "opacity-100",
      "slide-in": "translate-x-0 opacity-100",
      "zoom-in": "scale-100 opacity-100",
      bounce: "translate-y-0 opacity-100 animate-bounce",
    }

    return (
      <div
        ref={(node) => {
          // Handle both forwardRef and the internal ref
          if (typeof forwardedRef === "function") {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
          ref.current = node
        }}
        className={cn(
          "transition-all",
          animationClasses[animation],
          isVisible && activeAnimationClasses[animation],
          className,
        )}
        style={{
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
        }}
        {...props}
      >
        {children}
      </div>
    )
  },
)

AnimatedSection.displayName = "AnimatedSection"

export { AnimatedSection }
