export default function MissionSection() {
  return (
    <section className="mb-16 text-center container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">Quality First</h3>
          <p className="text-muted-foreground">
            We carefully curate every product to ensure it meets our high
            standards for quality and value.
          </p>
        </div>
        <div className="p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
          <p className="text-muted-foreground">
            Quick and reliable shipping to get your orders to you as fast as
            possible.
          </p>
        </div>
        <div className="p-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💝</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">Customer Care</h3>
          <p className="text-muted-foreground">
            Exceptional customer service and support whenever you need it.
          </p>
        </div>
      </div>
    </section>
  );
}
