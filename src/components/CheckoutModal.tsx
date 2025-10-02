"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  X,
  CreditCard,
  MapPin,
  User as UserIcon,
  Mail,
  Building,
  Package,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/contexts/CartContext";
import { supabase } from "@/lib/supabase";

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone_Number: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
  onCheckoutSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
  onCheckoutSuccess,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Delivery fee calculation
  const deliveryFee = 5.99; // $5.99 delivery fee
  const freeDeliveryThreshold = 50; // Free delivery over $50
  const subtotal = totalPrice;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const finalTotal = isFreeDelivery ? subtotal : subtotal + deliveryFee;

  // Load saved card details from localStorage
  const loadSavedCardDetails = () => {
    try {
      const savedCard = localStorage.getItem("ecofriendly_saved_card");
      if (savedCard) {
        return JSON.parse(savedCard);
      }
    } catch (error) {
      console.error("Error loading saved card:", error);
    }
    return null;
  };

  const savedCard = loadSavedCardDetails();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone_Number: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    cardNumber: savedCard?.cardNumber || "",
    cardName: savedCard?.cardName || "",
    expiryDate: savedCard?.expiryDate || "",
    cvv: savedCard?.cvv || "",
  });

  const getImageUrl = (filename: string) => {
    // Remove any leading slashes or "product-images/" prefix from filename
    const cleanFilename = filename
      .replace(/^\/+/, "")
      .replace(/^product-images\//, "");
    return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/${cleanFilename}`;
  };

  // Update form data when user changes or modal opens
  useEffect(() => {
    if (user) {
      const savedCard = loadSavedCardDetails();
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        country: "USA", // Set default to USA
        cardNumber: savedCard?.cardNumber || prev.cardNumber,
        cardName: savedCard?.cardName || prev.cardName,
        expiryDate: savedCard?.expiryDate || prev.expiryDate,
        cvv: savedCard?.cvv || prev.cvv,
      }));
    }
  }, [user, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to complete your purchase.",
        duration: 3000,
      });
      window.location.href = "/login";
      return;
    }

    setIsProcessing(true);

    try {
      // Save card details to localStorage (for future use)
      const cardDetails = {
        cardNumber: formData.cardNumber,
        cardName: formData.cardName,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
      };
      localStorage.setItem(
        "ecofriendly_saved_card",
        JSON.stringify(cardDetails)
      );

      // Create ONE order entry for all products in cart
      // product_id will be an array of all product IDs
      // quantity will be an array of quantities for each product
      const productIds = cartItems.map((item) => item.id);
      const quantities = cartItems.map((item) => item.quantity);
      const totalQuantity = quantities.reduce((sum, qty) => sum + qty, 0);
      const totalAmount = finalTotal; // Use final total including delivery fee

      const orderData = {
        user_id: user.id,
        product_id: productIds, // Array of product IDs [1, 2, 3]
        quantity: quantities, // Array of quantities [2, 1, 3]
        status: "pending",
        country: formData.country,
        state: formData.state,
        city: formData.city,
        street_address: formData.address,
        phone_Number: formData.phone_Number,
        total_price: totalAmount,
      };

      console.log("📦 Creating order with multiple products:", {
        productIds,
        quantities,
        totalQuantity,
        totalAmount,
        phone_Number: formData.phone_Number,
        fullOrderData: orderData,
      });

      const { data, error } = await supabase
        .from("order")
        .insert([orderData])
        .select();

      if (error) {
        console.error("❌ Error creating order:", error);
        throw error;
      }

      console.log("✅ Order created successfully:", data);

      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your order of $${finalTotal.toFixed(
          2
        )} has been confirmed. Card details saved for future use.`,
        duration: 5000,
      });

      setIsProcessing(false);
      onCheckoutSuccess();

      // Reset form but keep card details
      const savedCard = loadSavedCardDetails();
      setFormData({
        fullName: user?.name || "",
        email: user?.email || "",
        phone_Number: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "USA",
        cardNumber: savedCard?.cardNumber || "",
        cardName: savedCard?.cardName || "",
        expiryDate: savedCard?.expiryDate || "",
        cvv: savedCard?.cvv || "",
      });
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Order Failed",
        description:
          "There was an error processing your order. Please try again.",
        duration: 3000,
      });
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto scrollbar-hide"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto scrollbar-hide">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#005655] to-[#004544] text-white p-6 rounded-t-2xl flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Checkout</h2>
                    <p className="text-white/80 text-sm">
                      Complete your purchase
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isProcessing}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Shipping Information */}
                <div>
                  <h3 className="text-xl font-bold text-[#005655] mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <UserIcon className="w-4 h-4 inline mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        readOnly
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed"
                        placeholder="John Doe"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        From your account
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        readOnly
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed"
                        placeholder="john@example.com"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        From your account
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📞 phone_Number Number *
                      </label>
                      <input
                        type="tel"
                        name="phone_Number"
                        value={formData.phone_Number}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Building className="w-4 h-4 inline mr-1" />
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        readOnly
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed"
                        placeholder="USA"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Currently shipping to USA only
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none transition-colors"
                        placeholder="NY"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none transition-colors"
                        placeholder="New York"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ZIP/Postal Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none transition-colors"
                        placeholder="10001"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none transition-colors"
                        placeholder="123 Main Street, Apt 4B"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="text-xl font-bold text-[#005655] mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        maxLength={16}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none transition-colors"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        maxLength={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none transition-colors"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isProcessing}
                    className="flex-1 h-14 text-base font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 h-14 text-base font-bold bg-gradient-to-r from-[#005655] to-[#004544] hover:from-[#004544] hover:to-[#003433]"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order ${finalTotal.toFixed(2)}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
