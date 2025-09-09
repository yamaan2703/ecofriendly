import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, CheckCircle, Mail, Gift } from "lucide-react";
import Button from "./Button/Button";
import { IoIosStar } from "react-icons/io";
import { useContent } from "@/contexts/ContentContext";

const ProductShowcaseSection: React.FC = () => {
  const { content } = useContent();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-2 sm:right-4 md:right-6 lg:right-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-[#A0C474]/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-2 sm:left-4 md:left-6 lg:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#005655]/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          {/* Left Side - Product Image with HeroSection styling */}
          <motion.div
            className="lg:col-span-6 flex justify-center order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="relative w-64 xs:w-72 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-eco-green rounded-2xl sm:rounded-3xl shadow-xl border-2 sm:border-4 border-[#A0C474] bg-[#A0C474]"
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
                src={content.productShowcase.image}
                alt={content.productShowcase.imageAlt}
                width={800}
                height={800}
                className="relative rounded-xl sm:rounded-2xl shadow-2xl object-cover z-10 bg-[#E7F0CE] w-full h-auto"
                whileHover={{
                  scale: 1.03,
                  rotate: 1,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Product Information */}
          <motion.div
            className="lg:col-span-6 space-y-3 sm:space-y-4 md:space-y-5 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex"
            >
              <h1 className="text-xl sm:text-xl md:text-4xl font-semibold text-eco-charcoal leading-tight flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                {content.productShowcase.title}
                <span className="font-eurotypo italic text-[#005655]">
                  {content.productShowcase.subtitle}
                </span>
              </h1>
            </motion.div>

            {/* Rating */}
            <motion.div
              className="flex items-center gap-2 sm:gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * star,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <IoIosStar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <span className="text-gray-600 font-semibold text-sm sm:text-base md:text-lg">
                {content.productShowcase.rating} (
                {content.productShowcase.reviewCount})
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed font-eurotypo max-w-full sm:max-w-sm md:max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              {
                content.productShowcase.description.split(
                  content.productShowcase.highlightText
                )[0]
              }
              <span className="text-[#005655] font-semibold">
                {content.productShowcase.highlightText}
              </span>
              {
                content.productShowcase.description.split(
                  content.productShowcase.highlightText
                )[1]
              }
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start"
            >
              <Button
                variant="solid"
                size="xs"
                className="w-full sm:w-auto text-xs sm:text-sm md:text-base py-2 sm:py-1.5 px-4 sm:px-6"
              >
                {content.productShowcase.buttonText}
              </Button>
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6">
              {content.productShowcase.guarantees.map((guarantee, index) => (
                <span
                  key={index}
                  className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 sm:gap-2 mt-1"
                >
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                  {guarantee.text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Feature Icons - Benefits Section Style */}
        <motion.div
          className="mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {content.features3.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-transparent hover:bg-[#E7F0CE] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-start gap-2 sm:gap-3 md:gap-4">
                  {/* Icon */}
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#005655] group-hover:bg-white rounded-lg flex items-center justify-center transition-all duration-500 ease-in-out">
                      <img
                        src={feature.icon}
                        alt={feature.label}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500 ease-in-out"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg md:text-xl font-eurotypo font-bold text-[#005655] leading-tight transition-colors duration-500 ease-in-out">
                      {feature.label}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="leading-relaxed font-eurotypo text-xs sm:text-sm md:text-base text-gray-600 transition-colors duration-500 ease-in-out">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
