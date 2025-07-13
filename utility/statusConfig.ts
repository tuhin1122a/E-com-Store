export const statusConfig = {
  PANDING: {
    label: "PANDING",
    color: "bg-yellow-100 text-yellow-800",
    progress: 20,
    description: "We’ve received your order.",
  },
  processing: {
    label: "Processing",
    color: "bg-blue-100 text-blue-800",
    progress: 40,
    description: "Your order is being prepared.",
  },
  shipped: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-800",
    progress: 70,
    description: "Your order is on the way.",
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    progress: 100,
    description: "Your order has been delivered.",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    progress: 0,
    description: "Your order was cancelled.",
  },
};
