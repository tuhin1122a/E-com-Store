"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Address</h3>
            <p className="text-muted-foreground">
              123 Commerce Street
              <br />
              Business District
              <br />
              New York, NY 10001
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="h-6 w-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
            <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="h-6 w-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-muted-foreground">support@ecomstore.com</p>
            <p className="text-sm text-muted-foreground">
              We'll respond within 24 hours
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="h-6 w-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Business Hours</h3>
            <div className="text-muted-foreground space-y-1">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
