"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/context/UserContext";
import type React from "react";
import { useState } from "react";

interface ShippingFormProps {
  onComplete: (data: any) => void;
  initialData: any;
}

export function ShippingForm({ onComplete, initialData }: ShippingFormProps) {
  const { userData } = useUser();

  const [formData, setFormData] = useState({
    firstName: initialData.shippingAddress?.firstName || "",
    lastName: initialData.shippingAddress?.lastName || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: initialData.shippingAddress?.addressLine1 || "",
    apartment: initialData.shippingAddress?.addressLine2 || "",
    city: initialData.shippingAddress?.city || "",
    state: initialData.shippingAddress?.state || "",
    zipCode: initialData.shippingAddress?.postalCode || "",
    country: initialData.shippingAddress?.country || "US",
    sameAsBilling: initialData.sameAsBilling ?? true,
  });

  const [billingData, setBillingData] = useState({
    firstName: initialData.billingAddress?.firstName || "",
    lastName: initialData.billingAddress?.lastName || "",
    address: initialData.billingAddress?.addressLine1 || "",
    apartment: initialData.billingAddress?.addressLine2 || "",
    city: initialData.billingAddress?.city || "",
    state: initialData.billingAddress?.state || "",
    zipCode: initialData.billingAddress?.postalCode || "",
    country: initialData.billingAddress?.country || "US",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const shippingAddress = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      addressLine1: formData.address,
      addressLine2: formData.apartment,
      city: formData.city,
      state: formData.state,
      postalCode: formData.zipCode,
      country: formData.country,
    };

    const billingAddress = formData.sameAsBilling
      ? shippingAddress
      : {
          firstName: billingData.firstName,
          lastName: billingData.lastName,
          addressLine1: billingData.address,
          addressLine2: billingData.apartment,
          city: billingData.city,
          state: billingData.state,
          postalCode: billingData.zipCode,
          country: billingData.country,
        };

    onComplete({
      shippingAddress,
      billingAddress,
      sameAsBilling: formData.sameAsBilling,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={formData.firstName} disabled />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={formData.lastName} disabled />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} disabled />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" value={formData.phone} disabled />
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={formData.address} disabled />
          </div>
          <div>
            <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
            <Input id="apartment" value={formData.apartment} disabled />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" value={formData.city} disabled />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" value={formData.state} disabled />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input id="zipCode" value={formData.zipCode} disabled />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select value={formData.country} disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="sameAsBilling" checked={formData.sameAsBilling} />
            <Label htmlFor="sameAsBilling">Same as shipping address</Label>
          </div>

          {!formData.sameAsBilling && (
            <div className="space-y-4 pt-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingFirstName">First Name</Label>
                  <Input
                    id="billingFirstName"
                    value={billingData.firstName}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="billingLastName">Last Name</Label>
                  <Input
                    id="billingLastName"
                    value={billingData.lastName}
                    disabled
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="billingAddress">Address</Label>
                <Input
                  id="billingAddress"
                  value={billingData.address}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="billingApartment">
                  Apartment, suite, etc. (optional)
                </Label>
                <Input
                  id="billingApartment"
                  value={billingData.apartment}
                  disabled
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingCity">City</Label>
                  <Input id="billingCity" value={billingData.city} disabled />
                </div>
                <div>
                  <Label htmlFor="billingState">State</Label>
                  <Input id="billingState" value={billingData.state} disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingZipCode">ZIP Code</Label>
                  <Input
                    id="billingZipCode"
                    value={billingData.zipCode}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="billingCountry">Country</Label>
                  <Select value={billingData.country} disabled>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
}
