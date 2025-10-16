import React, { useState } from "react";
import { Star, Sparkles, Shield, Feather, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";

const iconMap = {
  Sparkles,
  Shield,
  Feather,
  Package,
};

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const { content } = useContent();

  return (
    <section id="features" className="relative py-20 overflow-hidden">
      {/* Decorative Leaf in corner */}
      <div className="absolute left-0 top-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 z-0 pointer-events-none">
        <img
          src="/images/leaf_1.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-left"
        />
      </div>
      <div className="absolute right-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 z-0 pointer-events-none">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>

      <div className="container mx-auto max-w-5xl relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-extrabold text-gray-900 font-eurotypo"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Why Choose{" "}
            <motion.span
              className="text-primary italic"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Our Bamboo Brush
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Thoughtfully designed for sustainability, comfort, and care —
            because small changes make a big difference.
          </motion.p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Feature List */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {content.features.items.map((feature, index) => {
              const IconComponent =
                iconMap[feature.icon as keyof typeof iconMap] || Star;

              return (
                <motion.div
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`flex items-center gap-2 p-2 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? "bg-[#DCE7C8] border-primary shadow-lg scale-[1.02]"
                      : " hover:bg-[#DCE7C8] border-primary hover:shadow-md"
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 + 0.1 * index }}
                  whileHover={{
                    scale: 1.02,
                    x: 5,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`size-10 flex items-center justify-center rounded-xl transition-all ${
                      activeFeature === index
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="size-5" />
                  </motion.div>
                  <div className="">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {feature.title}
                    </h3>
                    {activeFeature === index && (
                      <motion.p
                        className="text-gray-600 text-xs leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.5 }}
                      >
                        {feature.description}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="relative w-full max-w-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Multiple Decorative Backgrounds */}
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#84B350] rounded-[2rem] opacity-20"></div>
              <div className="absolute -bottom-2 -left-2 w-full h-full bg-[#DCE7C8] rounded-[1.5rem] opacity-40"></div>

              {/* Main Image Container */}
              <motion.div
                className="relative bg-background-cream rounded-[1.5rem] p-6 shadow-2xl border border-primary/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="w-full h-80 flex items-center justify-center">
                  <motion.img
                    src={content.features.items[activeFeature].image}
                    alt={content.features.items[activeFeature].title}
                    className="max-w-full max-h-full object-contain transition-all duration-500"
                    key={activeFeature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute -top-3 -right-3 bg-primary text-white px-3 py-1.5 rounded-full shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold">Premium</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
