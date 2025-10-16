import React from "react";
import { Check, Leaf, Shield, Heart, Users, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";

const BenefitsSection: React.FC = () => {
  const { content } = useContent();
  return (
    <section id="benefits" className="py-20 bg-background relative">
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

      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className="text-4xl font-bold text-foreground font-eurotypo"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Why Choose Our
            </motion.span>
            <motion.div
              className="rounded-full"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/images/teeth.png"
                alt="Leaf"
                className="w-full h-full rounded-full object-contain"
              />
            </motion.div>
            <motion.span
              className="text-4xl font-bold text-primary font-eurotypo italic"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Bamboo Toothbrushes?
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {content.benefits.items.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-[#DCE7C8] rounded-2xl p-3 shadow-lg hover:shadow-xl transition-shadow hover:border border-primary"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              <div className="space-y-2">
                {/* Icon */}
                <motion.div
                  className="size-12 bg-primary rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <benefit.icon className="size-6 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary font-eurotypo">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section - Modern Gradient Style */}
        <motion.div
          className="relative bg-[#DCE7C8] rounded-3xl p-12 text-center shadow-2xl overflow-hidden backdrop-blur-md border border-primary/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Subtle background decorative blur */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-70 pointer-events-none" />

          {/* Heading */}
          <motion.h3
            className="text-4xl font-extrabold text-primary-dark mb-4 font-eurotypo italic drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Take the Step Toward a Greener Smile 🌱
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            className="text-gray-600 mb-6 text-md max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Switch to sustainable oral care and join thousands who've made the
            planet-friendly choice.
          </motion.p>

          {/* Features List */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {[
              "30-day money back guarantee",
              "Free worldwide shipping",
              "Eco-certified materials",
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-white/70 px-5 py-3 rounded-full shadow-sm border border-primary/20 backdrop-blur-sm transition-all hover:bg-primary-light/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.4 + 0.1 * index }}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="w-7 h-7 bg-primary flex items-center justify-center rounded-full shadow-md"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
                <span className="font-medium text-gray-700 text-sm">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className="group relative bg-primary text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.8 }}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              <motion.div
                whileHover={{ rotate: 12 }}
                transition={{ duration: 0.3 }}
              >
                <Leaf className="w-6 h-6" />
              </motion.div>
              Start Your Eco Journey
            </span>
            {/* Gradient glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-light to-primary-dark opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
