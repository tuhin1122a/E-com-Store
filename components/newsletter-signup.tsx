"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubscribing(false)
    setIsSubscribed(true)
    setEmail("")
  }

  if (isSubscribed) {
    return (
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <Mail className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p>You've successfully subscribed to our newsletter.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <Mail className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
          <p className="mb-6">Subscribe to our newsletter for the latest deals and product updates.</p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-black"
            />
            <Button type="submit" variant="secondary" disabled={isSubscribing}>
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
