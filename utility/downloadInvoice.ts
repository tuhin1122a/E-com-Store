export async function downloadInvoice(
  orderNumber: string,
  accessToken: string
) {
  if (!accessToken) {
    alert("You must be logged in to download the invoice.");
    return;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/invoice/${orderNumber}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to download invoice");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice_${orderNumber}.pdf`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    alert(error.message || "Failed to download invoice");
  }
}
