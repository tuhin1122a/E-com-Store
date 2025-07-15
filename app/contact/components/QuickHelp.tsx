"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, MessageSquare, ShoppingBag } from "lucide-react";

export default function QuickHelp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Quick Help
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="/faq">
              <MessageSquare className="h-4 w-4 mr-2" />
              Frequently Asked Questions
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="/orders">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Track Your Order
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="/returns">
              <HelpCircle className="h-4 w-4 mr-2" />
              Returns & Exchanges
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
