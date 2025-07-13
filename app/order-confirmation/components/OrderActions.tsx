"use client";

import { Button } from "@/components/ui/button";
import { downloadInvoice } from "@/utility/downloadInvoice";

import { ArrowLeft, Download } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface OrderActionsProps {
  orderNumber: string;
}

export default function OrderActions({ orderNumber }: OrderActionsProps) {
  const { data: session } = useSession();

  const handleDownload = () => {
    if (!orderNumber || !session?.user?.accessToken) {
      alert("Missing order number or access token");
      return;
    }

    downloadInvoice(orderNumber, session.user.accessToken);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button variant="outline" className="flex-1" asChild>
        <Link href="/products">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>
      </Button>

      <Button variant="outline" className="flex-1" onClick={handleDownload}>
        <Download className="h-4 w-4 mr-2" />
        Download Invoice
      </Button>

      <Button className="flex-1" asChild>
        <Link href="/account">View Order Details</Link>
      </Button>
    </div>
  );
}
