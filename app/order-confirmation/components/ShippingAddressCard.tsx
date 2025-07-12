import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShippingAddressCard({ address }: any) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          <p className="font-medium">
            {address.firstName} {address.lastName}
          </p>
          <p>{address.addressLine1}</p>
          <p>
            {address.city}, {address.state} {address.postalCode}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
