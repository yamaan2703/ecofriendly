import React from "react";
import { motion } from "framer-motion";

const ProductDetailingSection: React.FC = () => {
  const features = [
    {
      title: "Soft & BPA-Free Bristles",
      description: "Gentle on gums while providing effective cleaning",
      position: "top-left",
    },
    {
      title: "Charcoal-Infused Bristles",
      description: "Deep cleaning power with natural whitening",
      position: "top-right",
    },
    {
      title: "Ergonomic Handle",
      description: "Comfortable grip for better control",
      position: "bottom-left",
    },
    {
      title: "Eco-Friendly & Biodegradable",
      description: "100% sustainable bamboo material",
      position: "center-right",
    },
    {
      title: "Lightweight",
      description: "Perfect for travel and daily use",
      position: "bottom-right",
    },
  ];

  return (
    <section className=" px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto ">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-eco-charcoal font-eurotypo mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Product{" "}
            <motion.span
              className="relative inline-block ml-4 text-[#005655] italic"
              whileHover={{ scale: 1.05, color: "#A0C474" }}
              transition={{ duration: 0.3 }}
            >
              Detailing
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-xl text-eco-charcoal opacity-70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover the premium features that make our bamboo toothbrush
            exceptional
          </motion.p>
        </motion.div>

        {/* Main Content - Desktop Layout */}
        <div className="hidden lg:block ">
          <div className="flex items-center justify-center">
            {/* Left Side Cards */}
            <div className="flex flex-col gap-5">
              {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#E7F0CE] rounded-md p-2 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs"
                >
                  <h3 className="font-semibold text-gray-900 text-xs text-center">
                    {feature.title}
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* Central Product Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <div className="w-[700px] relative">
                <img
                  src="/images/brush_rock.png"
                  alt="Bamboo toothbrush with rock formation"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Right Side Cards */}
            <div className="flex flex-col gap-6">
              {features.slice(3).map((feature, index) => (
                <motion.div
                  key={index + 3}
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#E7F0CE] rounded-md p-2 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs"
                >
                  <h3 className="font-semibold text-gray-900 text-xs text-center">
                    {feature.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          {/* Product Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="w-80 sm:w-96 md:w-[400px] ">
              <img
                src="/images/brush_rock.png"
                alt="Bamboo toothbrush with rock formation"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Features Grid Below Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-semibold text-gray-900 text-sm text-center">
                  {feature.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailingSection;
