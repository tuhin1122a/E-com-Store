export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Returns & Exchanges</h1>

      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
          <p className="mb-4">
            We want you to be completely satisfied with your purchase. If you're not happy with your order, you can
            return most items within 30 days of delivery for a full refund.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Eligible Items</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Items must be in original condition with tags attached</li>
            <li>Items must be returned within 30 days of delivery</li>
            <li>Items must include original packaging and accessories</li>
            <li>Items must not show signs of wear or damage</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Personalized or customized items</li>
            <li>Perishable goods</li>
            <li>Intimate or sanitary goods</li>
            <li>Items damaged by misuse</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Return</h2>
          <ol className="list-decimal pl-6 mb-4">
            <li>Log into your account and go to Order History</li>
            <li>Select the order containing the item you want to return</li>
            <li>Click "Return Item" and follow the instructions</li>
            <li>Print the prepaid return label</li>
            <li>Package the item securely and attach the label</li>
            <li>Drop off at any authorized shipping location</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
          <p className="mb-4">
            Once we receive your return, we'll inspect the item and process your refund within 5-7 business days.
            Refunds will be issued to your original payment method.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
          <p className="mb-4">
            We currently don't offer direct exchanges. To exchange an item, please return the original item for a refund
            and place a new order for the desired item.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
          <p className="mb-4">
            If you have any questions about returns or need assistance, please contact our customer service team:
          </p>
          <ul className="list-none mb-4">
            <li>Email: returns@ecomstore.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Live Chat: Available 24/7 on our website</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
