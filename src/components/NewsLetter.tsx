import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, CheckCircle, Mail, Gift } from "lucide-react";
import Button from "./Button/Button";
import { IoIosStar } from "react-icons/io";
function NewsLetter() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden"
      >
        <div className=" bg-[#E7F0CE] rounded-3xl p-8 lg:p-12 relative">
          <div className="relative z-10 text-center">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.h2
                  className="text-4xl font-black text-eco-charcoal font-eurotypo mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Subscribe Our
                  <motion.span
                    className="relative inline-block ml-4 text-[#005655] italic"
                    whileHover={{ scale: 1.05, color: "#A0C474" }}
                    transition={{ duration: 0.3 }}
                  >
                    Newsletter
                  </motion.span>
                </motion.h2>
              </motion.div>

              <motion.p
                className="text-md text-eco-charcoal max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Be the first to know about new arrivals, exclusive deals, and
                sustainable living tips.
                <span className="font-medium"> Join 10,000+ eco-warriors!</span>
              </motion.p>
            </motion.div>

            <motion.form
              className="max-w-lg mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <motion.input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#005655] focus:border-[#005655] shadow-sm hover:shadow-md transition-all duration-300"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
                <Button
                  variant="solid"
                  size="sm"
                  className="text-sm sm:text-base py-2 sm:py-1.5"
                >
                  Subscribe
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default NewsLetter;
