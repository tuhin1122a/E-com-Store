"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ShippingFormProps {
  onComplete: (data: any) => void
  initialData: any
}

export function ShippingForm({ onComplete, initialData }: ShippingFormProps) {
  const [formData, setFormData] = useState({
    firstName: initialData.shippingAddress?.firstName || "",
    lastName: initialData.shippingAddress?.lastName || "",
    email: initialData.shippingAddress?.email || "",
    phone: initialData.shippingAddress?.phone || "",
    address: initialData.shippingAddress?.address || "",
    apartment: initialData.shippingAddress?.apartment || "",
    city: initialData.shippingAddress?.city || "",
    state: initialData.shippingAddress?.state || "",
    zipCode: initialData.shippingAddress?.zipCode || "",
    country: initialData.shippingAddress?.country || "US",
    sameAsBilling: initialData.sameAsBilling ?? true,
  })

  const [billingData, setBillingData] = useState({
    firstName: initialData.billingAddress?.firstName || "",
    lastName: initialData.billingAddress?.lastName || "",
    address: initialData.billingAddress?.address || "",
    apartment: initialData.billingAddress?.apartment || "",
    city: initialData.billingAddress?.city || "",
    state: initialData.billingAddress?.state || "",
    zipCode: initialData.billingAddress?.zipCode || "",
    country: initialData.billingAddress?.country || "US",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const shippingAddress = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      apartment: formData.apartment,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
    }

    const billingAddress = formData.sameAsBilling ? shippingAddress : billingData

    onComplete({
      shippingAddress,
      billingAddress,
      sameAsBilling: formData.sameAsBilling,
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBillingChange = (field: string, value: string) => {
    setBillingData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
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
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
            <Input
              id="apartment"
              value={formData.apartment}
              onChange={(e) => handleInputChange("apartment", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
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
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAsBilling"
              checked={formData.sameAsBilling}
              onCheckedChange={(checked) => handleInputChange("sameAsBilling", checked.toString())}
            />
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
                    onChange={(e) => handleBillingChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="billingLastName">Last Name</Label>
                  <Input
                    id="billingLastName"
                    value={billingData.lastName}
                    onChange={(e) => handleBillingChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="billingAddress">Address</Label>
                <Input
                  id="billingAddress"
                  value={billingData.address}
                  onChange={(e) => handleBillingChange("address", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="billingApartment">Apartment, suite, etc. (optional)</Label>
                <Input
                  id="billingApartment"
                  value={billingData.apartment}
                  onChange={(e) => handleBillingChange("apartment", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingCity">City</Label>
                  <Input
                    id="billingCity"
                    value={billingData.city}
                    onChange={(e) => handleBillingChange("city", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="billingState">State</Label>
                  <Input
                    id="billingState"
                    value={billingData.state}
                    onChange={(e) => handleBillingChange("state", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingZipCode">ZIP Code</Label>
                  <Input
                    id="billingZipCode"
                    value={billingData.zipCode}
                    onChange={(e) => handleBillingChange("zipCode", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="billingCountry">Country</Label>
                  <Select value={billingData.country} onValueChange={(value) => handleBillingChange("country", value)}>
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
  )
}
