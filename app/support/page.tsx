"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Star,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How can I track my order?",
        answer:
          "You can track your order by logging into your account and visiting the 'Order History' section. You'll find tracking information and real-time updates there.",
      },
      {
        question: "What are your shipping options?",
        answer:
          "We offer Standard (5-7 business days), Express (2-3 business days), and Overnight shipping. Free shipping is available on orders over $50.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "Orders can be modified or cancelled within 1 hour of placement. After that, please contact our support team for assistance.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Some restrictions apply to certain categories.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Visit your account dashboard, find the order, and click 'Return Items'. Follow the prompts to print a return label and schedule pickup.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Refunds are processed within 3-5 business days after we receive your returned item. The amount will be credited to your original payment method.",
      },
    ],
  },
  {
    category: "Account & Payment",
    questions: [
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions in the reset email we send you.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, we use industry-standard SSL encryption and comply with PCI DSS standards to protect your payment information.",
      },
    ],
  },
];

const supportArticles = [
  {
    title: "Getting Started with Your Account",
    description: "Learn how to set up and manage your EcomStore account",
    category: "Account",
    readTime: "3 min read",
    helpful: 45,
    rating: 4.8,
  },
  {
    title: "Understanding Our Shipping Policies",
    description:
      "Complete guide to shipping options, costs, and delivery times",
    category: "Shipping",
    readTime: "5 min read",
    helpful: 38,
    rating: 4.6,
  },
  {
    title: "How to Use Discount Codes",
    description: "Step-by-step guide to applying coupons and promotional codes",
    category: "Promotions",
    readTime: "2 min read",
    helpful: 52,
    rating: 4.9,
  },
  {
    title: "Product Care Instructions",
    description: "Tips for maintaining and caring for your purchases",
    category: "Products",
    readTime: "4 min read",
    helpful: 29,
    rating: 4.5,
  },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFAQ = faqData.filter(
    (category) =>
      selectedCategory === "all" ||
      category.category.toLowerCase().includes(selectedCategory)
  );

  const filteredArticles = supportArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to your questions or get in touch with our support
              team
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Search for help articles, FAQs, or topics..."
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our support team
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/live-chat">Start Chat</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Mail className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get help via email
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    <a href="mailto:support@ecomstore.com">Send Email</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call us directly
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    <a href="tel:+1-800-ECOM-HELP">Call Now</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="faq" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
              <TabsTrigger value="articles">Help Articles</TabsTrigger>
              <TabsTrigger value="contact">Contact Options</TabsTrigger>
            </TabsList>

            <TabsContent value="faq">
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-muted-foreground">
                    Quick answers to common questions
                  </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("all")}
                    size="sm"
                  >
                    All Categories
                  </Button>
                  {faqData.map((category) => (
                    <Button
                      key={category.category}
                      variant={
                        selectedCategory === category.category.toLowerCase()
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setSelectedCategory(category.category.toLowerCase())
                      }
                      size="sm"
                    >
                      {category.category}
                    </Button>
                  ))}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-6">
                  {filteredFAQ.map((category) => (
                    <Card key={category.category}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Badge variant="secondary">{category.category}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {category.questions.map((faq, index) => (
                            <AccordionItem
                              key={index}
                              value={`${category.category}-${index}`}
                            >
                              <AccordionTrigger className="text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="articles">
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Help Articles</h2>
                  <p className="text-muted-foreground">
                    Detailed guides and tutorials
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((article, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-shadow cursor-pointer group"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <Badge variant="outline">{article.category}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {article.rating}
                          </div>
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {article.title}
                        </CardTitle>
                        <CardDescription>{article.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {article.readTime}
                          </div>
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="h-4 w-4" />
                            {article.helpful} helpful
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          Read Article
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact">
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Contact Our Support Team
                  </h2>
                  <p className="text-muted-foreground">
                    Choose the best way to reach us
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Live Chat */}
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <MessageCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <CardTitle>Live Chat</CardTitle>
                      <CardDescription>
                        Get instant help from our support team
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-center gap-2 text-sm">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-600">Available Now</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Average response: 2 minutes
                        </p>
                      </div>
                      <Button asChild className="w-full">
                        <Link href="/live-chat">Start Live Chat</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Email Support */}
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Mail className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <CardTitle>Email Support</CardTitle>
                      <CardDescription>
                        Send us a detailed message
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium">
                          support@ecomstore.com
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Response within 24 hours
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        <a href="mailto:support@ecomstore.com">Send Email</a>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Phone Support */}
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Phone className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                      <CardTitle>Phone Support</CardTitle>
                      <CardDescription>
                        Speak directly with our team
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium">
                          +1 (800) ECOM-HELP
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Mon-Fri: 9AM-6PM EST
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        <a href="tel:+1-800-ECOM-HELP">Call Now</a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Business Hours */}
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Support Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">
                          Live Chat & Phone
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>Monday - Friday: 9:00 AM - 6:00 PM EST</li>
                          <li>Saturday: 10:00 AM - 4:00 PM EST</li>
                          <li>Sunday: Closed</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Email Support</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>Available 24/7</li>
                          <li>Response within 24 hours</li>
                          <li>Priority support for urgent issues</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
