import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles,
  Shield,
  Feather,
  Package,
  Gem,
  Crown,
  Gift,
  Award,
} from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const iconMap = {
  Sparkles,
  Shield,
  Feather,
  Package,
  Gem,
  Crown,
  Gift,
  Award,
};

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const { content } = useContent();

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Animated Background Elements */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
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
            {content.features.title}
            <motion.span
              className="relative inline-block ml-4 text-[#005655] italic"
              whileHover={{ scale: 1.05, color: "#A0C474" }}
              transition={{ duration: 0.3 }}
            >
              {content.features.subtitle}
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-xl text-eco-charcoal opacity-70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Every detail crafted with sustainability and your oral health in
            mind
          </motion.p>
        </motion.div>

        {/* Interactive Features Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center mb-6">
          {/* Feature Navigation */}
          <motion.div
            className="lg:col-span-5 space-y-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {content.features.items.map((feature, index) => (
              <motion.div
                key={index}
                className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeFeature === index
                    ? "border-[#A0C474] bg-[#FDFDEA] shadow-xl scale-105"
                    : "border-transparent hover:border-[#A0C474]/30 hover:bg-[#E7F0CE]/30"
                }`}
                onClick={() => setActiveFeature(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{
                  scale: activeFeature === index ? 1.05 : 1.02,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`p-3 rounded-xl bg-[#005655] text-white flex-shrink-0`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      backgroundColor: "#A0C474",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {typeof feature.icon === "string"
                      ? (() => {
                          const IconComponent =
                            iconMap[feature.icon as keyof typeof iconMap];
                          return IconComponent ? (
                            <IconComponent className="size-4" />
                          ) : (
                            <Star className="size-4" />
                          );
                        })()
                      : feature.icon}
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3
                      className="font-bold text-[#005655] text-lg mb-1 transition-colors"
                      whileHover={{ color: "#A0C474" }}
                    >
                      {feature.title}
                    </motion.h3>

                    {activeFeature === index && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.p
                          className="text-eco-charcoal opacity-70 text-sm leading-relaxed mb-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {feature.description}
                        </motion.p>
                      </motion.div>
                    )}

                    {activeFeature !== index && (
                      <motion.div
                        className="flex items-center text-[#A0C474] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        Learn more <ArrowRight className="size-4 ml-1" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Image */}
          <motion.div
            className="lg:col-span-7 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div
                className="relative w-72 sm:w-80 lg:w-[22rem] group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={activeFeature} // This will trigger animation when activeFeature changes
              >
                <motion.div
                  className="absolute inset-0 bg-eco-green rounded-3xl shadow-xl border-4 border-[#A0C474] bg-[#A0C474]"
                  initial={{ rotate: 6 }}
                  animate={{ rotate: 6 }}
                  whileHover={{
                    rotate: 8,
                    scale: 1.05,
                    x: 5,
                    y: -5,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                ></motion.div>

                <motion.img
                  src={content.features.items[activeFeature].image}
                  alt={`${content.features.items[activeFeature].title}`}
                  width={800}
                  height={800}
                  className="relative rounded-2xl shadow-2xl object-cover z-10 bg-[#E7F0CE]"
                  whileHover={{
                    scale: 1.03,
                    rotate: 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  key={`image-${activeFeature}`} // Animate when image changes
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
