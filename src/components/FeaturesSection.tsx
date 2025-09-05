import React from "react";
import { motion } from "framer-motion";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Charcoal-Infused Bristles",
      description:
        "Deep cleaning power with natural whitening properties that remove plaque effectively while being gentle on your gums.",
      image: "/images/Artboard_2.png",
      color: "bg-emerald-50",
    },
    {
      title: "Ergonomic Handle Design",
      description:
        "Comfortable bamboo grip designed for optimal control and comfort during your daily brushing routine.",
      image: "/images/brush.png",
      color: "bg-green-50",
    },
    {
      title: "Travel-Friendly & Lightweight",
      description:
        "Perfect size for travel with eco-friendly packaging that fits easily in your luggage or bag.",
      image: "/images/brush_set.png",
      color: "bg-teal-50",
    },
    {
      title: "Splinter-Free Finish",
      description:
        "Expertly polished bamboo handles ensure safe, splinter-free, and comfortable brushing experience every day.",
      image: "/images/hero_image.png",
      color: "bg-lime-50",
    },
  ];

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>✨ Premium Features</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-notulen font-black text-gray-900 mb-6">
            Premium Product
            <span className="block text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 bg-clip-text">
              Features
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-eurotypo">
            Every detail of our bamboo toothbrushes is designed with
            sustainability and performance in mind.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group ${feature.color} rounded-3xl p-8 hover:shadow-xl transition-all duration-500 cursor-pointer relative overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 right-10 w-20 h-20 border-2 border-emerald-500 rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-green-500 rounded-full"></div>
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
                {/* Image */}
                <div className="flex-shrink-0 w-full lg:w-64 h-48 lg:h-64">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-10 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-eurotypo font-bold mb-4">
                Ready to Switch to Sustainable Oral Care?
              </h3>

              <p className="text-emerald-100 mb-6 max-w-2xl mx-auto font-eurotypo">
                Join thousands of customers who have made the switch to our
                premium bamboo toothbrushes.
              </p>

              <button className="bg-white text-emerald-600 px-8 py-3 rounded-full font-eurotypo font-bold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center gap-2">
                <span>Shop Now</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
