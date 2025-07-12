"use client";

import {
  CheckCircle,
  Clock,
  Eye,
  Filter,
  MoreHorizontal,
  Package,
  RotateCcw,
  Search,
  Truck,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Sample order data
const orders = [
  {
    id: "ORD-001",
    date: "December 23, 2024",
    status: "delivered",
    total: "$245.00",
    items: [
      {
        name: "Samsung Galaxy Buds",
        price: "$120.00",
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        name: "Phone Case",
        price: "$85.00",
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        name: "Screen Protector",
        price: "$40.00",
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    trackingNumber: "TRK123456789",
    deliveryAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-002",
    date: "December 20, 2024",
    status: "shipped",
    total: "$380.00",
    items: [
      {
        name: "Wireless Mouse",
        price: "$150.00",
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        name: "Mechanical Keyboard",
        price: "$230.00",
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    trackingNumber: "TRK987654321",
    deliveryAddress: "456 Oak Ave, Los Angeles, CA 90210",
  },
  {
    id: "ORD-003",
    date: "December 18, 2024",
    status: "processing",
    total: "$180.00",
    items: [
      {
        name: "Premium T-Shirt",
        price: "$90.00",
        quantity: 2,
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    trackingNumber: null,
    deliveryAddress: "789 Pine St, Chicago, IL 60601",
  },
  {
    id: "ORD-004",
    date: "December 15, 2024",
    status: "pending",
    total: "$520.00",
    items: [
      {
        name: "Laptop Stand",
        price: "$280.00",
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        name: "USB-C Hub",
        price: "$240.00",
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    trackingNumber: null,
    deliveryAddress: "321 Elm St, Houston, TX 77001",
  },
  {
    id: "ORD-005",
    date: "December 10, 2024",
    status: "cancelled",
    total: "$120.00",
    items: [
      {
        name: "Wireless Headphones",
        price: "$120.00",
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    trackingNumber: null,
    deliveryAddress: "654 Maple Dr, Miami, FL 33101",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    color: "bg-blue-100 text-blue-800",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-800",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelOrderId, setCancelOrderId] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCancelOrder = (orderId) => {
    // API call to cancel order would go here
    console.log("Cancelling order:", orderId);
    setCancelOrderId(null);
  };

  const handleReorder = (order) => {
    // Reorder logic would go here
    console.log("Reordering:", order);
  };

  const canCancelOrder = (status) => {
    return status === "pending" || status === "processing";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">
          View and manage all your orders and their status
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by order number or product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500">
                No orders match your current search criteria.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            return (
              <Card
                key={order.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <Badge
                        className={`${statusConfig[order.status].color} flex items-center gap-1`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[order.status].label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">
                        {order.total}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Order Details - {order.id}
                                </DialogTitle>
                                <DialogDescription>
                                  Order placed on {order.date}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Items:</h4>
                                  <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-3 p-2 border rounded"
                                      >
                                        <Image
                                          src={item.image || "/placeholder.svg"}
                                          alt={item.name}
                                          width={40}
                                          height={40}
                                          className="rounded"
                                        />
                                        <div className="flex-1">
                                          <p className="font-medium">
                                            {item.name}
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            Quantity: {item.quantity}
                                          </p>
                                        </div>
                                        <span className="font-medium">
                                          {item.price}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="font-medium">
                                      Delivery Address:
                                    </p>
                                    <p className="text-gray-600">
                                      {order.deliveryAddress}
                                    </p>
                                  </div>
                                  {order.trackingNumber && (
                                    <div>
                                      <p className="font-medium">
                                        Tracking Number:
                                      </p>
                                      <p className="text-gray-600">
                                        {order.trackingNumber}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center font-medium text-lg">
                                  <span>Total:</span>
                                  <span>{order.total}</span>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {order.status === "delivered" && (
                            <DropdownMenuItem
                              onClick={() => handleReorder(order)}
                            >
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Reorder
                            </DropdownMenuItem>
                          )}

                          {canCancelOrder(order.status) && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-red-600"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Cancel Order
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Cancel Order</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to cancel this order?
                                    This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline">Keep Order</Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleCancelOrder(order.id)}
                                  >
                                    Yes, Cancel Order
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded border"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} × {item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-sm text-gray-500 pl-14">
                        +{order.items.length - 2} more items...
                      </p>
                    )}

                    {order.trackingNumber && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-blue-900">
                              Tracking Number
                            </p>
                            <p className="text-sm text-blue-700">
                              {order.trackingNumber}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Track Package
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Load More Button */}
      {filteredOrders.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Orders
          </Button>
        </div>
      )}
    </div>
  );
}
