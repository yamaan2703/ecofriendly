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

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
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
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const getImageUrl = (filename: string) => {
    // Remove any leading slashes or "product-images/" prefix from filename
    const cleanFilename = filename
      .replace(/^\/+/, "")
      .replace(/^product-images\//, "");
    return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/${cleanFilename}`;
  };

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

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

    // Simulate order processing
    setTimeout(() => {
      // Create order data
      const orderData = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        items: cartItems.map((item) => ({
          productId: item.id,
          productName: item.product_name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        })),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: {
          cardName: formData.cardName,
          cardLastFour: formData.cardNumber.slice(-4),
        },
        totalAmount: totalPrice,
        orderDate: new Date().toISOString(),
      };

      console.log("Order placed:", orderData);

      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your order of $${totalPrice.toFixed(
          2
        )} has been confirmed.`,
        duration: 5000,
      });

      setIsProcessing(false);
      onCheckoutSuccess();

      // Reset form
      setFormData({
        fullName: user?.name || "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
      });
    }, 2000);
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
                {/* Order Summary */}
                <div className="bg-gradient-to-br from-[#E7F0CE] to-[#F3F7DE] rounded-xl p-6">
                  <h3 className="text-xl font-bold text-[#005655] mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
                            <img
                              src={getImageUrl(item.product_images[0])}
                              alt={item.product_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-[#005655]">
                              {item.product_name}
                            </p>
                            <p className="text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-[#005655]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="border-t-2 border-[#005655]/20 pt-3 flex items-center justify-between">
                      <p className="text-lg font-bold text-[#005655]">Total:</p>
                      <p className="text-2xl font-bold text-[#005655]">
                        ${totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

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
                        <Building className="w-4 h-4 inline mr-1" />
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none transition-colors"
                        placeholder="United States"
                      />
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
                        Place Order ${totalPrice.toFixed(2)}
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
