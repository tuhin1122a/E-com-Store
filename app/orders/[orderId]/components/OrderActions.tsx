"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Download, MessageSquare, RotateCcw, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import { downloadInvoice } from "@/utility/downloadInvoice";

export function OrderActions({ order, onCancel, onReturn }: any) {
  const { data: session } = useSession();
  const router = useRouter();

  const [cancelReason, setCancelReason] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  const canCancelOrder = () => {
    const status = order.status?.toLowerCase();
    return status === "pending" || status === "processing";
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    await onCancel(cancelReason);
    setIsCancelling(false);
    setCancelReason("");
  };

  const handleReturn = async () => {
    await onReturn(returnReason);
    setReturnReason("");
  };

  const handleDownload = () => {
    if (!session?.user?.accessToken) {
      alert("You must be logged in to download the invoice.");
      return;
    }

    downloadInvoice(order.orderNumber, session.user.accessToken);
  };

  const handleContactSupport = () => {
    router.push("/contact");
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full justify-start bg-transparent"
        onClick={handleDownload}
      >
        <Download className="h-4 w-4 mr-2" />
        Download Invoice
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start bg-transparent"
        onClick={handleContactSupport}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Contact Support
      </Button>

      {canCancelOrder() && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-full justify-start">
              <XCircle className="h-4 w-4 mr-2" />
              Cancel Order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Order</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this order? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cancelReason">Reason (optional)</Label>
                <Textarea
                  id="cancelReason"
                  placeholder="Why are you cancelling?"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Keep Order</Button>
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={isCancelling}
              >
                {isCancelling ? "Cancelling..." : "Yes, Cancel Order"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {order.status?.toLowerCase() === "delivered" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Return Items
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Return Items</DialogTitle>
              <DialogDescription>
                Please provide a reason for returning this order.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="returnReason">Reason</Label>
                <Textarea
                  id="returnReason"
                  placeholder="Why are you returning this order?"
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleReturn}>Submit Return Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
