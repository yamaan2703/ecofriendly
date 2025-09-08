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
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-10 w-32 h-32 bg-[#A0C474]/10 rounded-full"
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
          className="absolute bottom-1/4 left-10 w-24 h-24 bg-[#005655]/10 rounded-full"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Side - Product Image with HeroSection styling */}
          <motion.div
            className="lg:col-span-6 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="relative w-72 sm:w-80 lg:w-[28rem] group"
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
                src="/images/brush_set.png"
                alt="Premium Bamboo Toothbrush Set"
                width={800}
                height={800}
                className="relative rounded-2xl shadow-2xl object-cover z-10 bg-[#E7F0CE]"
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
            className="lg:col-span-6 space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex"
            >
              <h1 className="text-4xl font-semibold text-eco-charcoal leading-tight flex items-baseline gap-2">
                BAMBOO
                <span className="font-eurotypo italic text-[#005655]">
                  Toothbrushes
                </span>
              </h1>
            </motion.div>

            {/* Rating */}
            <motion.div
              className="flex items-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
                    <IoIosStar className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <span className="text-gray-600 font-semibold text-lg">
                4.9 (1,100+ Reviews)
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-md text-gray-600 leading-relaxed font-eurotypo max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              A cleaner way to brush is here.{" "}
              <span className="text-[#005655] font-semibold">
                Natural. Eco-friendly. Gentle.
              </span>
              Enjoy a sustainable toothbrush that's soft on your gums and safe
              for the planet.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <Button
                variant="solid"
                size="xs"
                className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-1.5"
              >
                Shop Collection
              </Button>
            </motion.div>
            <div className="flex gap-6">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                100% Money back guarantee
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Free shipping on orders $25+
              </span>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Feature Icons - Benefits Section Style */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.features3.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-transparent hover:bg-[#E7F0CE] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-start gap-4">
                  {/* Icon */}
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-[#005655] group-hover:bg-white rounded-lg flex items-center justify-center transition-all duration-500 ease-in-out">
                      <img
                        src={feature.icon}
                        alt={feature.label}
                        className="size-10 object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500 ease-in-out"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-eurotypo font-bold text-[#005655] leading-tight transition-colors duration-500 ease-in-out">
                      {feature.label}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="leading-relaxed font-eurotypo text-sm text-gray-600 transition-colors duration-500 ease-in-out">
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
