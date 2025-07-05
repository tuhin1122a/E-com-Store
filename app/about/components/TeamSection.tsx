export default function TeamSection() {
  return (
    <section className="mb-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        Meet Our Team
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          {
            name: "John Smith",
            role: "CEO & Founder",
            emoji: "👨‍💼",
            description:
              "Passionate about creating exceptional shopping experiences for our customers.",
          },
          {
            name: "Sarah Johnson",
            role: "CTO",
            emoji: "👩‍💻",
            description:
              "Leading our technology initiatives to build the best e-commerce platform.",
          },
          {
            name: "Mike Chen",
            role: "Head of Design",
            emoji: "👨‍🎨",
            description:
              "Crafting beautiful and intuitive user experiences that delight our customers.",
          },
        ].map(({ name, role, emoji, description }) => (
          <div
            key={name}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="w-32 h-32 bg-gradient-to-tr from-indigo-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-lg text-5xl">
              <span>{emoji}</span>
            </div>
            <h3 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-gray-100">
              {name}
            </h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
              {role}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
