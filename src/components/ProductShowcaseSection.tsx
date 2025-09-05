import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";

const ProductShowcaseSection: React.FC = () => {
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: "/images/earth.svg",
      label: "Eco Friendly",
    },
    {
      icon: "/images/Bristles.svg",
      label: "Super Soft",
    },
    {
      icon: "/images/plastic.svg",
      label: "Plastic Free",
    },
    {
      icon: "/images/Biodegradable.svg",
      label: "30 Days Return",
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Side - Product Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src="/images/brush_set.png"
              alt="Bamboo toothbrush set with packaging"
              className="w-full max-w-md h-auto object-contain"
            />
          </motion.div>

          {/* Right Side - Product Information */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-notulen font-black text-gray-900">
              BAMBOO TOOTHBRUSHES
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-600">4.9 (1,100+ Reviews)</span>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed font-eurotypo">
              A cleaner way to brush is here. Natural. Eco-friendly. Gentle.
              Enjoy a sustainable toothbrush that's soft on your gums and safe
              for the planet.
            </p>

            {/* CTA Button */}
            <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-eurotypo font-bold text-lg flex items-center gap-2 hover:bg-emerald-600 transition-colors duration-300">
              <ShoppingCart className="w-5 h-5" />
              Buy Now
            </button>

            <p className="text-sm text-gray-500">100% Money back guarantee</p>

            {/* Feature Icons */}
            <div className="grid grid-cols-4 gap-4 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-2">
                    <img
                      src={feature.icon}
                      alt={feature.label}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="text-xs text-gray-600">{feature.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-emerald-500 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Subscribe Our Newsletter</h2>

          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Be the first to know about new arrivals, limited deals, and fresh
            drops—straight to your inbox. No spam, just quality updates.
          </p>

          {/* Newsletter Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-emerald-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
