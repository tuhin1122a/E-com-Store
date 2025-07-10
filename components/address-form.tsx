"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface AddressFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

export function AddressForm({ initialData, onSubmit }: AddressFormProps) {
  const [formData, setFormData] = useState({
    type: initialData?.type || "SHIPPING",
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    company: initialData?.company || "",
    address: initialData?.address || "",
    apartment: initialData?.apartment || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zipCode: initialData?.zipCode || "",
    country: initialData?.country || "United States",
    isDefault: initialData?.isDefault || false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Address Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address Type */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Address Type
            </Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => handleInputChange("type", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="shipping" id="shipping" />
                <Label htmlFor="SHIPPING">Shipping Address</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="billing" id="billing" />
                <Label htmlFor="BILLING">Billing Address</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <Label htmlFor="company">Company (Optional)</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
            />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
            />
          </div>

          {/* Apartment */}
          <div>
            <Label htmlFor="apartment">Apartment, suite, etc. (Optional)</Label>
            <Input
              id="apartment"
              value={formData.apartment}
              onChange={(e) => handleInputChange("apartment", e.target.value)}
            />
          </div>

          {/* City, State, ZIP */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <Label htmlFor="country">Country</Label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleInputChange("country", value)}
            >
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

          {/* Default Address */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isDefault"
              checked={formData.isDefault}
              onCheckedChange={(checked) =>
                handleInputChange("isDefault", checked as boolean)
              }
            />
            <Label htmlFor="isDefault">
              Set as default {formData.type} address
            </Label>
          </div>

          <Button type="submit" className="w-full">
            {initialData ? "Update Address" : "Save Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
