"use client";
import { Card, CardContent } from "@/components/ui/card";

export function FAQSupportCard() {
  return (
    <div className="max-w-2xl mx-auto mt-16 text-center">
      <Card>
        <CardContent className="py-8">
          <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Our customer support team
            is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@ecomstore.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Email Us
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
