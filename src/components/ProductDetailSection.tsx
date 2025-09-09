import React from "react";
import { motion } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";

const ProductDetailingSection: React.FC = () => {
  const { content } = useContent();
  return (
    <section id="products" className=" px-4 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 z-0 pointer-events-none">
        <img
          src="/images/leaves_1.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-left"
        />
      </div>
      <div className="max-w-7xl mx-auto ">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-center mb-16"
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
              Premium Product{" "}
              <motion.span
                className="relative inline-block text-[#005655] italic"
                whileHover={{ scale: 1.05, color: "#A0C474" }}
                transition={{ duration: 0.3 }}
              >
                Features
              </motion.span>
            </motion.h2>
          </motion.div>
        </motion.div>

        {/* Main Content - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:items-center pb-10">
          {/* Product Image - First on Mobile, Right on Desktop */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, x: 50 }}
              whileInView={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex justify-center relative mb-8 lg:mb-0"
            >
              <motion.div
                className="relative w-72 sm:w-80 md:w-[22rem] lg:w-96 xl:w-[28rem] 2xl:w-[32rem] group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
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
                  src="/images/brush_rock.png"
                  alt="Bamboo toothbrush with rock formation"
                  className="relative rounded-2xl object-cover z-10 bg-[#E7F0CE] w-full h-auto"
                  whileHover={{
                    scale: 1.03,
                    rotate: 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Feature Cards - Second on Mobile, Left on Desktop */}
          <div className="order-2 lg:order-1 lg:col-span-3 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-4 max-w-2xl lg:max-w-xs">
              {content.features2.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-[#FDFDEA] rounded-xl p-3 lg:p-2 shadow-md border border-[#9CBF71] hover:shadow-lg hover:border-[#A0C474]/30 transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="flex items-start space-x-3 lg:space-x-2">
                    <div className="flex-1">
                      <motion.h3
                        className="font-bold text-[#005655] text-sm lg:text-sm mb-1 transition-colors duration-300"
                        whileHover={{ x: 1 }}
                      >
                        {feature.title}
                      </motion.h3>
                      <motion.p
                        className="text-eco-charcoal/70 text-xs leading-relaxed"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailingSection;
