"use client";

import {
  Sparkles,
  Leaf,
  ArrowRight,
  Trophy,
  Users,
  Package,
} from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { motion, Variants } from "framer-motion";

const HeroSection = () => {
  const { content } = useContent();

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div
        className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-12 py-32 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image First */}
          <motion.div className="order-2 lg:order-1" variants={itemVariants}>
            <div className="relative max-w-lg mx-auto">
              {/* Decorative background shape */}
              <motion.div
                className="absolute -inset-4 bg-primary/5 rounded-[4rem] rotate-3"
                animate={{ rotate: [3, 8, 3] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.div
                className="absolute -inset-4 bg-primary-light/10 rounded-[4rem] -rotate-3"
                animate={{ rotate: [-3, -8, -3] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              ></motion.div>

              {/* Main image */}
              <motion.div
                className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-primary/10"
                variants={imageVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={content.hero.heroImage}
                  alt={`${content.hero.title} ${content.hero.subtitle}`}
                  className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="order-1 lg:order-2 space-y-3"
            variants={containerVariants}
          >
            {/* Small badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-transparent border-2 border-primary px-4 py-2 rounded-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Leaf className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-xs font-bold text-primary">
                {content.hero.badge}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div className="" variants={itemVariants}>
              <motion.h1
                className="text-4xl sm:text-5xl font-notulen font-black text-foreground leading-none"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {content.hero.title}
              </motion.h1>
              <motion.h2
                className="text-3xl sm:text-4xl font-eurotypo italic text-primary"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {content.hero.subtitle}
              </motion.h2>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-md text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              {content.hero.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              variants={itemVariants}
            >
              <motion.button
                className="group bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold shadow-eco hover:shadow-xl transition-all flex items-center gap-2 text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Explore Products
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Features list */}
            <motion.div className="pt-2 space-y-2" variants={containerVariants}>
              {[
                {
                  icon: Trophy,
                  title: "Premium Quality",
                  desc: "Award-winning sustainable products",
                },
                {
                  icon: Users,
                  title: "Trusted by Thousands",
                  desc: "Join our eco-conscious community",
                },
                {
                  icon: Package,
                  title: "Wide Selection",
                  desc: "50+ eco-friendly products to choose from",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  variants={itemVariants}
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-10 h-10  rounded-lg flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <div className="font-bold text-foreground">
                      {feature.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {feature.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
