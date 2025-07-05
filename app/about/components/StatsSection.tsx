export default function StatsSection() {
  return (
    <section className="mb-16 rounded-lg p-8 container mx-auto px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        By the Numbers
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-2">
            50K+
          </div>
          <div className="text-blue-800 dark:text-blue-200 font-medium">
            Happy Customers
          </div>
        </div>
        <div className="bg-green-100 dark:bg-green-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="text-4xl font-extrabold text-green-700 dark:text-green-300 mb-2">
            10K+
          </div>
          <div className="text-green-800 dark:text-green-200 font-medium">
            Products
          </div>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="text-4xl font-extrabold text-purple-700 dark:text-purple-300 mb-2">
            99.9%
          </div>
          <div className="text-purple-800 dark:text-purple-200 font-medium">
            Uptime
          </div>
        </div>
        <div className="bg-pink-100 dark:bg-pink-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="text-4xl font-extrabold text-pink-700 dark:text-pink-300 mb-2">
            24/7
          </div>
          <div className="text-pink-800 dark:text-pink-200 font-medium">
            Support
          </div>
        </div>
      </div>
    </section>
  );
}
