"use client";

import React from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="inline-block bg-[#E7F0CE] text-eco-green text-sm sm:text-base font-semibold px-4 py-1.5 rounded-full shadow-sm animate-bounce">
              100% Plastic-Free Packaging
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-notulen font-black text-[#005655] leading-tight"
          >
            Ecofriendly
          </motion.h1>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-4xl font-eurotypo italic text-eco-charcoal"
          >
            Bamboo Toothbrushes
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-base sm:text-lg text-eco-charcoal leading-relaxed max-w-md mx-auto lg:mx-0 mt-2"
          >
            Soft BPA-free bristles, sustainable bamboo handles, and packaging
            that's kind to our planet. A better smile starts here.
          </motion.p>
        </motion.div>

        {/* Center Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-4 flex justify-center relative"
        >
          <motion.div
            className="relative w-72 sm:w-80 lg:w-[22rem] group"
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
              src="/images/hero_image.png"
              alt="Ecofriendly Bamboo Toothbrush"
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

        {/* Right Side Info */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="lg:col-span-3 flex flex-col justify-center gap-6 text-center lg:text-right"
        >
          <motion.div
            className="bg-[#E7F0CE] p-6 rounded-2xl shadow-md cursor-pointer"
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.h3
              className="text-eco-dark font-eurotypo font-black text-xl sm:text-2xl mb-2"
              whileHover={{ color: "#005655" }}
              transition={{ duration: 0.2 }}
            >
              Why Bamboo?
            </motion.h3>
            <p className="text-sm sm:text-base text-eco-charcoal leading-relaxed">
              Bamboo grows quickly, requires no pesticides, and naturally
              biodegrades. It's nature's gift to a greener tomorrow.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
