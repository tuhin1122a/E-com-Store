"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface OrderActionsProps {
  orderNumber: string;
}

export default function OrderActions({ orderNumber }: OrderActionsProps) {
  const { data: session } = useSession();

  async function handleDownloadInvoice() {
    if (!session?.user?.accessToken) {
      alert("You must be logged in to download the invoice.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/invoice/${orderNumber}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to download invoice");

      // Get the blob data from response
      const blob = await res.blob();

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice_${orderNumber}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      alert(error.message || "Failed to download invoice");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button variant="outline" className="flex-1" asChild>
        <Link href="/products">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>
      </Button>

      <Button
        variant="outline"
        className="flex-1"
        onClick={handleDownloadInvoice}
      >
        <Download className="h-4 w-4 mr-2" />
        Download Invoice
      </Button>

      <Button className="flex-1" asChild>
        <Link href="/account">View Order Details</Link>
      </Button>
    </div>
  );
}
