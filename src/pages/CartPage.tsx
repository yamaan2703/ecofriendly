"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Package,
  Leaf,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import CheckoutModal from "@/components/CheckoutModal";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { FaLeaf } from "react-icons/fa";

const CartPage: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart();
  const { toast } = useToast();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const getImageUrl = (filename: string) => {
    const cleanFilename = filename
      .replace(/^\/+/, "")
      .replace(/^product-images\//, "");
    return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/${cleanFilename}`;
  };

  const handleRemoveItem = (productId: number, productName: string) => {
    removeFromCart(productId);
    toast({
      title: "Removed from Cart",
      description: `${productName} has been removed from your cart.`,
      duration: 2000,
    });
  };

  const handleClearCart = () => {
    if (cartItems.length > 0) {
      clearCart();
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
        duration: 2000,
      });
    }
  };

  const handleCheckoutSuccess = () => {
    clearCart();
    setShowCheckoutModal(false);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFDEA] via-[#FEFEF5] to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#005655] mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600 text-lg">
                {cartItems.length > 0
                  ? `${totalItems} ${
                      totalItems === 1 ? "item" : "items"
                    } ready for checkout`
                  : "Your cart is waiting for items"}
              </p>
            </div>
            {cartItems.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearCart}
                className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center gap-2 border-2 border-red-200"
              >
                <Trash2 className="w-5 h-5" />
                Clear All
              </motion.button>
            )}
          </div>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 px-4"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative mb-8"
            >
              <div className="w-48 h-48 bg-gradient-to-br from-[#E7F0CE] to-[#A0C474] rounded-full flex items-center justify-center shadow-2xl">
                <ShoppingCart className="w-24 h-24 text-[#005655]" />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#005655] rounded-full flex items-center justify-center">
                <span className="text-3xl text-[#fefef2]">
                  <FaLeaf />
                </span>
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-[#005655] mb-3">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
              Start shopping for eco-friendly products and make a difference for
              our planet!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/")}
              className="px-8 py-4 bg-[#005655] text-white rounded-xl font-semibold hover:bg-[#004544] transition-colors flex items-center gap-3 shadow-lg"
            >
              <Package className="w-5 h-5" />
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#A0C474]"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-full sm:w-40 h-40 bg-gradient-to-br from-[#F3F7DE] to-[#E7F0CE] rounded-xl overflow-hidden flex-shrink-0"
                      >
                        {item.product_images &&
                        item.product_images.length > 0 ? (
                          <img
                            src={getImageUrl(item.product_images[0])}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl">
                            🖼️
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <span className="px-3 py-1 bg-[#005655] text-white text-xs font-bold rounded-full shadow-lg">
                            {item.category}
                          </span>
                        </div>
                      </motion.div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-xl font-bold text-[#005655] group-hover:text-[#A0C474] transition-colors">
                              {item.product_name}
                            </h3>
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleRemoveItem(item.id, item.product_name)
                              }
                              className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {item.product_description}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-[#005655]">
                                ${item.price}
                              </span>
                              <span className="text-gray-500 text-sm">
                                each
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Total:{" "}
                              <span className="font-bold text-[#005655]">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-600">
                              Qty:
                            </span>
                            <div className="flex items-center bg-[#E7F0CE] rounded-full shadow-md">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-3 text-[#005655] hover:bg-[#A0C474] rounded-full transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              <span className="px-6 py-2 font-bold text-lg text-[#005655] min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-3 text-[#005655] hover:bg-[#A0C474] rounded-full transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[#005655] to-[#004544] rounded-2xl shadow-2xl p-6 sm:p-8 text-white sticky top-24"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-white/20">
                    <span className="text-white/80">Items ({totalItems})</span>
                    <span className="font-bold text-lg">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-bold text-[#A0C474]">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCheckoutModal(true)}
                  className="w-full py-3 bg-[#A0C474] text-[#005655] rounded-xl font-bold text-md hover:bg-[#B5D487] transition-colors shadow-lg flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        cartItems={cartItems}
        totalPrice={getTotalPrice()}
        onCheckoutSuccess={handleCheckoutSuccess}
      />
    </div>
  );
};

export default CartPage;
