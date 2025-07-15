export const metadata = {
  title: "Terms of Service - EcomStore",
  description:
    "Read the terms of service for EcomStore, including use license, product information, pricing, shipping, and liability.",
  openGraph: {
    title: "Terms of Service - EcomStore",
    description:
      "Read the terms of service for EcomStore, including use license, product information, pricing, shipping, and liability.",
    url: "https://yourdomain.com/terms",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service - EcomStore",
    description:
      "Read the terms of service for EcomStore, including use license, product information, pricing, shipping, and liability.",
  },
  robots: "index, follow",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">
        Last updated: December 14, 2024
      </p>

      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By accessing and using EcomStore, you accept and agree to be bound
            by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p className="mb-4">
            Permission is granted to temporarily download one copy of the
            materials on EcomStore's website for personal, non-commercial
            transitory viewing only.
          </p>
          <p className="mb-4">
            This license shall automatically terminate if you violate any of
            these restrictions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Product Information
          </h2>
          <p className="mb-4">
            We strive to provide accurate product information, but we do not
            warrant that product descriptions or other content is accurate,
            complete, reliable, current, or error-free.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Pricing and Payment
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>All prices are subject to change without notice</li>
            <li>Payment is due at the time of purchase</li>
            <li>We reserve the right to refuse or cancel orders</li>
            <li>Additional charges may apply for expedited shipping</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Shipping and Returns
          </h2>
          <p className="mb-4">
            Shipping times are estimates and not guaranteed. Returns are
            accepted within 30 days of purchase in original condition.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitation of Liability
          </h2>
          <p className="mb-4">
            EcomStore shall not be liable for any damages arising from the use
            or inability to use our website or products.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Contact Information
          </h2>
          <p className="mb-4">
            Questions about the Terms of Service should be sent to us at
            legal@ecomstore.com.
          </p>
        </section>
      </div>
    </div>
  );
}
