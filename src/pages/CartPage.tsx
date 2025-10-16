"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiArrowRight,
  FiPackage,
  FiTruck,
  FiTag,
} from "react-icons/fi";
import { BsBoxSeam, BsCart3 } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";
import Navbar from "@/components/Navbar";
import CheckoutModal from "@/components/CheckoutModal";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

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

  const deliveryFee = 5.99; // $5.99 delivery fee
  const freeDeliveryThreshold = 50; // Free delivery over $50
  const subtotal = getTotalPrice();
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const finalTotal = isFreeDelivery ? subtotal : subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-6 py-2 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HiOutlineSparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold text-sm">
              Shopping Cart
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground font-eurotypo mb-3">
            Your <span className="text-primary italic">Cart</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {cartItems.length > 0
              ? `${totalItems} ${
                  totalItems === 1 ? "item" : "items"
                } ready for checkout`
              : "Your cart is waiting for eco-friendly items"}
          </p>

          {cartItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearCart}
              className="mt-6 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center gap-2 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FiTrash2 className="w-5 h-5" />
              Clear All Items
            </motion.button>
          )}
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8"
            >
              <BsCart3 className="w-32 h-32 text-primary mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-bold text-foreground font-eurotypo mb-3">
              Your Cart is Empty
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Start shopping for eco-friendly products and make a difference for
              our planet!
            </p>
            <motion.button
              onClick={() => (window.location.href = "/")}
              className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-light transition-colors flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPackage className="w-5 h-5" />
              <span>Browse Products</span>
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-lg border-2 border-primary/10 overflow-hidden hover:shadow-xl transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex flex-col sm:flex-row gap-6 p-6">
                      {/* Product Image */}
                      <motion.div
                        className="relative w-full sm:w-32 h-32 bg-background-cream rounded-2xl overflow-hidden flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
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
                          <div className="w-full h-full flex items-center justify-center">
                            <BsBoxSeam className="w-12 h-12 text-primary" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <div className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                            <FiTag className="w-3 h-3" />
                            <span>{item.category}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-xl font-bold text-foreground font-eurotypo">
                              {item.product_name}
                            </h3>
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleRemoveItem(item.id, item.product_name)
                              }
                              className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {item.product_description}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Price */}
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-primary">
                                ${item.price}
                              </span>
                              <span className="text-muted-foreground text-sm">
                                each
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Total:{" "}
                              <span className="font-bold text-primary text-lg">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-foreground">
                              Qty:
                            </span>
                            <div className="flex items-center bg-[#DCE7C8] rounded-xl shadow-md">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-3 text-primary hover:bg-primary hover:text-white rounded-l-xl transition-colors"
                              >
                                <FiMinus className="w-4 h-4" />
                              </motion.button>
                              <span className="px-6 py-2 font-bold text-lg text-foreground min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-3 text-primary hover:bg-primary hover:text-white rounded-r-xl transition-colors"
                              >
                                <FiPlus className="w-4 h-4" />
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
                className="bg-white rounded-3xl shadow-xl p-8 border-2 border-primary/10 sticky top-24"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                    <FiShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground font-eurotypo">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b-2 border-primary/10">
                    <span className="text-muted-foreground">
                      Items ({totalItems})
                    </span>
                    <span className="font-bold text-lg text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b-2 border-primary/10">
                    <div className="flex items-center gap-2">
                      <FiTruck className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">Delivery</span>
                      {isFreeDelivery && (
                        <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-full">
                          FREE
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-lg text-foreground">
                      {isFreeDelivery ? (
                        <span className="text-primary">FREE</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-xl font-bold text-foreground">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-primary">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Delivery Info Box */}
                  <div className="bg-[#DCE7C8] rounded-2xl p-4 mt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <FiPackage className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-bold">
                        Delivery Time
                      </span>
                    </div>
                    <p className="text-foreground text-sm">
                      Your order will be delivered within{" "}
                      <span className="font-bold text-primary">
                        4-5 business days
                      </span>
                    </p>
                    {!isFreeDelivery && (
                      <p className="text-muted-foreground text-xs mt-2">
                        Add ${(freeDeliveryThreshold - subtotal).toFixed(2)}{" "}
                        more for free delivery
                      </p>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCheckoutModal(true)}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-light transition-colors shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
