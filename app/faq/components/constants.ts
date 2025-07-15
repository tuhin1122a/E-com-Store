import {
  CreditCard,
  HelpCircle,
  RotateCcw,
  Shield,
  ShoppingBag,
  Truck,
} from "lucide-react";

export const faqCategories = [
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
];

export const faqs = [
  {
    id: 1,
    category: "general",
    question: "What is EcomStore?",
    answer:
      "EcomStore is your trusted online shopping destination offering quality products at competitive prices...",
  },
  {
    id: 2,
    category: "general",
    question: "How do I create an account?",
    answer: "You can create an account by clicking the 'Sign Up' button...",
  },
  // ⏩ (add the rest here, same as your original list)
];
