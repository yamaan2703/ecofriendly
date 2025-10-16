"use client";
import React from "react";
import { motion } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";

const ProductSpecSection: React.FC = () => {
  const { content } = useContent();
  return (
    <section className="relative py-20">
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
      <div className="max-w-5xl mx-auto border rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8">
        <motion.div
          className="text-start mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl sm:text-2xl lg:text-5xl font-black text-eco-charcoal font-eurotypo mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {content.specificationsSection.title}{" "}
            <motion.span
              className="relative inline-block ml-4 text-[#005655] italic"
              whileHover={{ scale: 1.05, color: "#A0C474" }}
              transition={{ duration: 0.3 }}
            >
              {content.specificationsSection.subtitle}
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Specifications Table */}
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="divide-y divide-gray-100">
            {content.specifications.map((spec, index) => (
              <motion.div
                key={index}
                className="flex flex-col sm:flex-row py-3 sm:py-4 gap-2 sm:gap-4 hover:bg-gray-50/50 transition-all duration-300 rounded-lg px-2 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.01,
                  x: 5,
                  backgroundColor: "rgba(231, 240, 206, 0.3)",
                }}
                whileTap={{ scale: 0.99 }}
              >
                <motion.div
                  className="sm:w-1/3 lg:w-1/3"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.h3
                    className="font-semibold text-[#1E1E1E] text-xs sm:text-sm mb-1 sm:mb-0 group-hover:text-[#005655] transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {spec.label}
                  </motion.h3>
                </motion.div>
                <motion.div
                  className="sm:w-2/3 lg:w-2/3"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.p
                    className="text-[#1E1E1E] text-xs sm:text-sm leading-relaxed group-hover:text-[#005655]/80 transition-colors duration-300"
                    whileHover={{ scale: 1.01 }}
                  >
                    {spec.value}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSpecSection;
