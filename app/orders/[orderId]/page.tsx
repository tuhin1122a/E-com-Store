import { auth } from "@/auth";
import { getOrderDetails } from "@/utility/getOrderDetails";
import { CustomerInfo } from "./components/CustomerInfo";
import { OrderActions } from "./components/OrderActions";
import { OrderHeader } from "./components/OrderHeader";
import { OrderItemList } from "./components/OrderItemList";
import { OrderProgress } from "./components/OrderProgress";
import { OrderSummary } from "./components/OrderSummary";
import { PaymentInfo } from "./components/PaymentInfo";
import { ShippingInfo } from "./components/ShippingInfo";

// In real scenario, fetch this from API using orderNumber
const orderData = {
  id: "ORD-001",
  orderNumber: "12345",
  status: "shipped",
  createdAt: "2024-12-20T10:30:00Z",
  estimatedDelivery: "2024-12-25T18:00:00Z",
  totalAmount: 245.0,
  subtotal: 220.0,
  shipping: 15.0,
  tax: 10.0,
  trackingNumber: "TRK123456789",
  paymentMethod: "Credit Card ending in 4242",
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  },
  shippingAddress: {
    name: "John Doe",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  },
  billingAddress: {
    name: "John Doe",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  },
  items: [
    {
      id: "1",
      productName: "Samsung Galaxy Buds Pro",
      imageUrl: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      price: 120.0,
      sku: "SGP-001",
    },
    {
      id: "2",
      productName: "Premium Phone Case",
      imageUrl: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      price: 85.0,
      sku: "PPC-002",
    },
    {
      id: "3",
      productName: "Screen Protector",
      imageUrl: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      price: 15.0,
      sku: "SP-003",
    },
  ],
  timeline: [
    {
      status: "Order Placed",
      date: "2024-12-20T10:30:00Z",
      description: "Your order has been received and is being processed",
      completed: true,
    },
    {
      status: "Payment Confirmed",
      date: "2024-12-20T10:35:00Z",
      description: "Payment has been successfully processed",
      completed: true,
    },
    {
      status: "Processing",
      date: "2024-12-21T09:00:00Z",
      description: "Your items are being prepared for shipment",
      completed: true,
    },
    {
      status: "Shipped",
      date: "2024-12-22T14:30:00Z",
      description: "Your order has been shipped and is on its way",
      completed: true,
    },
    {
      status: "Out for Delivery",
      date: null,
      description: "Your order is out for delivery",
      completed: false,
    },
    {
      status: "Delivered",
      date: null,
      description: "Your order has been delivered",
      completed: false,
    },
  ],
};

export default async function OrderDetailsPage({ params }: ProductPageProps) {
  const { orderId } = params;
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  const orderDetails = await getOrderDetails(orderId, accessToken);

  return (
    <div className="container mx-auto px-4 py-8">
      <OrderHeader order={orderDetails?.data} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <OrderProgress order={orderDetails?.data} />
          <OrderItemList items={orderDetails?.data?.items} />
          <ShippingInfo order={orderDetails?.data} />
        </div>
        <div className="space-y-6">
          <OrderSummary order={orderDetails?.data} />
          <PaymentInfo order={orderDetails?.data} />
          <CustomerInfo order={orderDetails?.data} />
          <OrderActions order={orderData} />
        </div>
      </div>
    </div>
  );
}
