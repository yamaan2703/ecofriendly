import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import Button from "./Button/Button";

const StickyBottomBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;

        // Show the bar when user scrolls past the home section
        setIsVisible(scrollPosition > homeBottom + 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleBuyNow = () => {
    // Handle buy now action
    console.log(`Buying ${quantity} bamboo toothbrush(es)`);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#005655] shadow-2xl border-t border-[#A0C474]/20"
        >
          <div className="max-w-7xl mx-auto px-4 py-1">
            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center justify-between">
              {/* Product Info */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#E7F0CE] rounded-lg flex items-center justify-center flex-shrink-0">
                  <img
                    src="/images/brush.png"
                    alt="Bamboo Toothbrush"
                    className="w-8 h-8 object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-white font-semibold text-base leading-tight">
                    Bamboo Toothbrushes
                  </h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-bold text-white">$14.99</span>
                    <span className="text-white/60 line-through text-sm">
                      $19.99
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-white/10 rounded-lg border border-white/20">
                  <motion.button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 text-white hover:text-[#A0C474] transition-colors disabled:opacity-50"
                    whileTap={{ scale: 0.95 }}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>

                  <span className="px-3 py-2 text-white font-semibold min-w-[2rem] text-center">
                    {quantity}
                  </span>

                  <motion.button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 text-white hover:text-[#A0C474] transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <Button variant="white" size="xs" className="">
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="sm:hidden">
              {/* Product Info Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#E7F0CE] rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src="/images/brush.png"
                      alt="Bamboo Toothbrush"
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-white font-semibold text-sm leading-tight">
                      Bamboo Toothbrushes
                    </h3>
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="text-lg font-bold text-white">
                        $14.99
                      </span>
                      <span className="text-white/60 line-through text-xs">
                        $19.99
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center bg-white/10 rounded-lg border border-white/20">
                  <motion.button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 text-white hover:text-[#A0C474] transition-colors disabled:opacity-50"
                    whileTap={{ scale: 0.95 }}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3 h-3" />
                  </motion.button>

                  <span className="px-3 py-2 text-white font-semibold min-w-[2rem] text-center text-sm">
                    {quantity}
                  </span>

                  <motion.button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 text-white hover:text-[#A0C474] transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-3 h-3" />
                  </motion.button>
                </div>

                <Button variant="white" size="sm" className="ml-4">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBottomBar;
