import Image from "next/image";

export default function OurStory() {
  return (
    <section className="mb-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center container mx-auto px-4">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2020, EcomStore began as a small startup with a big
              vision: to make quality products accessible to everyone,
              everywhere. What started as a passion project has grown into a
              trusted e-commerce platform serving thousands of customers
              worldwide.
            </p>
            <p>
              We believe that shopping online should be simple, secure, and
              enjoyable. That's why we've built our platform with cutting-edge
              technology and a customer-first approach that puts your needs at
              the center of everything we do.
            </p>
            <p>
              Today, we're proud to offer over 10,000 products across multiple
              categories, from electronics and fashion to home goods and beyond.
              Our commitment to quality, affordability, and exceptional customer
              service remains unchanged.
            </p>
          </div>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="Company Story"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
