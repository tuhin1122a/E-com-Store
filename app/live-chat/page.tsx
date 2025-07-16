"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Star,
  ThumbsDown,
  ThumbsUp,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  sender: "user" | "agent";
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file";
}

interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "away" | "busy";
  title: string;
  rating: number;
}

const mockAgent: Agent = {
  id: "1",
  name: "Sarah Johnson",
  avatar: "/placeholder.svg?height=40&width=40",
  status: "online",
  title: "Senior Support Specialist",
  rating: 4.9,
};

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "agent",
    content:
      "Hello! I'm Sarah from EcomStore support. How can I help you today?",
    timestamp: new Date(Date.now() - 60000),
    type: "text",
  },
];

const quickReplies = [
  "Track my order",
  "Return an item",
  "Payment issue",
  "Product question",
  "Shipping info",
  "Account help",
];

const suggestedQuestions = [
  "How do I track my order?",
  "What is your return policy?",
  "How can I change my shipping address?",
  "Do you offer international shipping?",
  "How do I apply a discount code?",
];

export default function LiveChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "agent",
        content: getAgentResponse(newMessage),
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAgentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    if (message.includes("order") || message.includes("track")) {
      return "I can help you track your order! Please provide your order number, and I'll look it up for you right away.";
    } else if (message.includes("return") || message.includes("refund")) {
      return "I'd be happy to help with your return. Our return policy allows returns within 30 days. Do you have your order number handy?";
    } else if (message.includes("payment") || message.includes("billing")) {
      return "I can assist with payment-related questions. What specific issue are you experiencing with your payment?";
    } else if (message.includes("shipping")) {
      return "For shipping questions, I can provide tracking info, delivery estimates, or help change shipping addresses. What would you like to know?";
    } else {
      return "Thank you for your message! I'm here to help. Could you provide a bit more detail about what you need assistance with?";
    }
  };

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!chatStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">Start Live Chat</CardTitle>
            <p className="text-muted-foreground">
              Connect with our support team
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Avatar className="h-16 w-16 mx-auto mb-4">
                <AvatarImage
                  src={mockAgent.avatar || "/placeholder.svg"}
                  alt={mockAgent.name}
                />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{mockAgent.name}</h3>
              <p className="text-sm text-muted-foreground">{mockAgent.title}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{mockAgent.rating}</span>
                <Badge variant="secondary" className="ml-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                  Online
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Quick Questions:</h4>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.slice(0, 4).map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setChatStarted(true);
                      setTimeout(() => handleQuickReply(reply), 500);
                    }}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={() => setChatStarted(true)} className="w-full">
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-2rem)]">
          {/* Chat Window */}
          <Card className="lg:col-span-3 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="flex-row items-center space-y-0 pb-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="mr-2 lg:hidden"
              >
                <Link href="/support">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>

              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage
                  src={mockAgent.avatar || "/placeholder.svg"}
                  alt={mockAgent.name}
                />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="font-semibold">{mockAgent.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    Online • Typically replies in minutes
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowFeedback(true)}>
                      Rate this chat
                    </DropdownMenuItem>
                    <DropdownMenuItem>Email transcript</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      End chat
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <Separator />

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                    >
                      {message.sender === "agent" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={mockAgent.avatar || "/placeholder.svg"}
                            alt={mockAgent.name}
                          />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={mockAgent.avatar || "/placeholder.svg"}
                          alt={mockAgent.name}
                        />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="p-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  Quick replies:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <Button
                      key={reply}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Input
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="resize-none"
                  />
                </div>
                <Button variant="ghost" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Sidebar */}
          <Card className="hidden lg:block">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Agent Info */}
              <div className="text-center p-4 bg-muted rounded-lg">
                <Avatar className="h-12 w-12 mx-auto mb-2">
                  <AvatarImage
                    src={mockAgent.avatar || "/placeholder.svg"}
                    alt={mockAgent.name}
                  />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <h4 className="font-semibold">{mockAgent.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {mockAgent.title}
                </p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{mockAgent.rating}</span>
                </div>
              </div>

              {/* Suggested Questions */}
              <div>
                <h4 className="font-medium mb-2">Suggested Questions</h4>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-2"
                      onClick={() => handleQuickReply(question)}
                    >
                      <span className="text-xs">{question}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Help Links */}
              <div>
                <h4 className="font-medium mb-2">Quick Links</h4>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/support">Support Center</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/faq">FAQ</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/returns">Return Policy</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feedback Dialog */}
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Your Chat Experience</DialogTitle>
            <DialogDescription>
              How was your experience with {mockAgent.name}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button key={rating} variant="ghost" size="icon">
                  <Star className="h-6 w-6" />
                </Button>
              ))}
            </div>
            <Textarea placeholder="Leave a comment (optional)" />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                <ThumbsDown className="h-4 w-4 mr-2" />
                Not Helpful
              </Button>
              <Button className="flex-1">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Very Helpful
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
