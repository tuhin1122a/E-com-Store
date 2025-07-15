export const metadata = {
  title: "Privacy Policy - EcomStore",
  description:
    "Learn how EcomStore collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy - EcomStore",
    description:
      "Learn how EcomStore collects, uses, and protects your personal information.",
    url: "https://yourdomain.com/privacy-policy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - EcomStore",
    description:
      "Learn how EcomStore collects, uses, and protects your personal information.",
  },
  robots: "index, follow",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">
        Last updated: December 14, 2024
      </p>

      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you
            create an account, make a purchase, or contact us for support.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Personal information (name, email, phone number)</li>
            <li>Billing and shipping addresses</li>
            <li>
              Payment information (processed securely by our payment providers)
            </li>
            <li>Order history and preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders and account</li>
            <li>Provide customer support</li>
            <li>Send you promotional emails (with your consent)</li>
            <li>Improve our products and services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Information Sharing
          </h2>
          <p className="mb-4">
            We do not sell, trade, or otherwise transfer your personal
            information to third parties except as described in this policy:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Service providers who assist us in operating our website and
              conducting business
            </li>
            <li>Payment processors for transaction processing</li>
            <li>Shipping companies for order fulfillment</li>
            <li>When required by law or to protect our rights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, disclosure, or
            destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access and update your personal information</li>
            <li>Delete your account and personal data</li>
            <li>Opt out of marketing communications</li>
            <li>Request a copy of your data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <ul className="list-none mb-4">
            <li>Email: privacy@ecomstore.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Commerce Street, New York, NY 10001</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
