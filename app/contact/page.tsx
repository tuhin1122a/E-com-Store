import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import QuickHelp from "./components/QuickHelp";
import StoreMap from "./components/StoreMap";

export const metadata = {
  title: "Contact Us - EcomStore",
  description:
    "Get in touch with EcomStore for support, questions, and feedback.",
  openGraph: {
    title: "Contact Us - EcomStore",
    description:
      "Reach out to EcomStore customer service for assistance and inquiries.",
    url: "https://yourdomain.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us - EcomStore",
    description:
      "Reach out to EcomStore customer service for assistance and inquiries.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            We're here to help! Reach out to us with any questions, concerns, or
            feedback.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left sidebar */}
          <div className="space-y-8">
            <ContactInfo />
            <QuickHelp />
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <ContactForm />
            <StoreMap />
          </div>
        </div>
      </div>
    </div>
  );
}
