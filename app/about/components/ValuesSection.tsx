export default function ValuesSection() {
  const values = [
    {
      title: "Integrity",
      description:
        "We conduct business with honesty and transparency in everything we do.",
    },
    {
      title: "Innovation",
      description:
        "We continuously improve and innovate to serve our customers better.",
    },
    {
      title: "Excellence",
      description:
        "We strive for excellence in every product and service we offer.",
    },
    {
      title: "Community",
      description:
        "We believe in building strong relationships with our customers and partners.",
    },
  ];

  return (
    <section className="text-center container mx-auto px-4 mb-16">
      <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-gray-100">
        Our Values
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map(({ title, description }) => (
          <div
            key={title}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
