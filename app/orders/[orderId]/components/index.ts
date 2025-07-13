export type OrderItem = {
  id: string;
  productName: string;
  imageUrl: string;
  quantity: number;
  price: number;
  sku: string;
};

export type TimelineStep = {
  status: string;
  date: string | null;
  description: string;
  completed: boolean;
};

export type Address = {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  status: string;
  createdAt: string;
  estimatedDelivery: string;
  totalAmount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  trackingNumber: string;
  paymentMethod: string;
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  timeline: TimelineStep[];
};
