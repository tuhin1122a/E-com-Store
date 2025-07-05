"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Search, HelpCircle, ShoppingBag, Truck, RotateCcw, CreditCard, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const faqCategories = [
  {
    id: "general",
    name: "General",
    icon: HelpCircle,
    color: "bg-blue-500",
  },
  {
    id: "orders",
    name: "Orders",
    icon: ShoppingBag,
    color: "bg-green-500",
  },
  {
    id: "shipping",
    name: "Shipping",
    icon: Truck,
    color: "bg-orange-500",
  },
  {
    id: "returns",
    name: "Returns",
    icon: RotateCcw,
    color: "bg-purple-500",
  },
  {
    id: "payment",
    name: "Payment",
    icon: CreditCard,
    color: "bg-red-500",
  },
  {
    id: "security",
    name: "Security",
    icon: Shield,
    color: "bg-gray-500",
  },
]

const faqs = [
  {
    id: 1,
    category: "general",
    question: "What is EcomStore?",
    answer:
      "EcomStore is your trusted online shopping destination offering quality products at competitive prices. We provide a wide range of items from electronics to fashion, home goods, and more.",
  },
  {
    id: 2,
    category: "general",
    question: "How do I create an account?",
    answer:
      "You can create an account by clicking the 'Sign Up' button in the top right corner of our website. Fill in your details including name, email, and password, then verify your email address.",
  },
  {
    id: 3,
    category: "orders",
    question: "How do I place an order?",
    answer:
      "To place an order, browse our products, add items to your cart, proceed to checkout, enter your shipping and payment information, and confirm your order.",
  },
  {
    id: 4,
    category: "orders",
    question: "Can I modify or cancel my order?",
    answer:
      "You can modify or cancel your order within 1 hour of placing it, provided it hasn't been processed yet. Contact our customer service team for assistance.",
  },
  {
    id: 5,
    category: "orders",
    question: "How do I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.",
  },
  {
    id: 6,
    category: "shipping",
    question: "What are your shipping options?",
    answer:
      "We offer standard shipping (5-7 business days), expedited shipping (2-3 business days), and overnight shipping. Free standard shipping is available on orders over $50.",
  },
  {
    id: 7,
    category: "shipping",
    question: "Do you ship internationally?",
    answer:
      "Currently, we ship to the United States, Canada, United Kingdom, and Australia. International shipping rates and delivery times vary by location.",
  },
  {
    id: 8,
    category: "returns",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some restrictions apply to certain product categories.",
  },
  {
    id: 9,
    category: "returns",
    question: "How do I return an item?",
    answer:
      "To return an item, log into your account, go to your order history, select the item you want to return, and follow the return instructions. We'll provide a prepaid return label.",
  },
  {
    id: 10,
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely.",
  },
  {
    id: 11,
    category: "payment",
    question: "Is my payment information secure?",
    answer:
      "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.",
  },
  {
    id: 12,
    category: "security",
    question: "How do you protect my personal information?",
    answer:
      "We take privacy seriously and use advanced security measures to protect your data. We never sell your personal information to third parties and only use it to process your orders and improve our services.",
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [openItems, setOpenItems] = useState<number[]>([])

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and policies.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "p-4 rounded-lg border text-center transition-colors",
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white hover:bg-gray-50",
              )}
            >
              <div className="text-2xl mb-2">📋</div>
              <div className="font-medium text-sm">All</div>
              <div className="text-xs text-muted-foreground">{faqs.length} questions</div>
            </button>

            {faqCategories.map((category) => {
              const IconComponent = category.icon
              const categoryCount = faqs.filter((faq) => faq.category === category.id).length

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "p-4 rounded-lg border text-center transition-colors",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white hover:bg-gray-50",
                  )}
                >
                  <div
                    className={cn("w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center", category.color)}
                  >
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <div className="font-medium text-sm">{category.name}</div>
                  <div className="text-xs text-muted-foreground">{categoryCount} questions</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {searchTerm && (
            <div className="mb-6">
              <p className="text-muted-foreground">
                Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? "s" : ""} for "{searchTerm}"
              </p>
            </div>
          )}

          {filteredFAQs.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <HelpCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No questions found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or browse different categories.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}
                  className="text-primary hover:underline"
                >
                  Clear search and show all questions
                </button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => {
                const isOpen = openItems.includes(faq.id)
                const category = faqCategories.find((cat) => cat.id === faq.category)

                return (
                  <Card key={faq.id}>
                    <Collapsible open={isOpen} onOpenChange={() => toggleItem(faq.id)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-left">
                              {category && (
                                <Badge variant="secondary" className="text-xs">
                                  {category.name}
                                </Badge>
                              )}
                              <CardTitle className="text-lg">{faq.question}</CardTitle>
                            </div>
                            <ChevronDown
                              className={cn("h-5 w-5 transition-transform", isOpen && "transform rotate-180")}
                            />
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <Card>
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our customer support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="mailto:support@ecomstore.com"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Email Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
