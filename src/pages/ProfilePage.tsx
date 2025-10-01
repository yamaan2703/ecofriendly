"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Save,
  X,
  Check,
  LogOut,
  Package,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface Order {
  id: number;
  created_at: string;
  product_id: number[];
  quantity: number[];
  status: string;
  country: string;
  state: string;
  city: string;
  street_address: string;
  total_price: number;
}

interface ProductDetails {
  id: number;
  product_name: string;
  price: number;
  product_images: string[];
}

const ProfilePage: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsMap, setProductsMap] = useState<Map<number, ProductDetails>>(
    new Map()
  );
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Update editName when user changes
  useEffect(() => {
    setEditName(user?.name || "");
  }, [user?.name]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditName(user?.name || "");
  };

  const handleSaveName = async () => {
    setIsLoading(true);

    try {
      const result = await updateProfile({ name: editName });

      if (result.success) {
        setIsEditModalOpen(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        console.error("Update failed:", result.error);
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      setIsLogoutModalOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  // Fetch orders and product details
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;

      try {
        setLoadingOrders(true);

        // Fetch orders for the logged-in user
        const { data: ordersData, error: ordersError } = await supabase
          .from("order")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (ordersError) {
          console.error("Error fetching orders:", ordersError);
          return;
        }

        setOrders(ordersData || []);

        // Collect all unique product IDs
        const allProductIds = new Set<number>();
        ordersData?.forEach((order) => {
          if (Array.isArray(order.product_id)) {
            order.product_id.forEach((id: number) => allProductIds.add(id));
          }
        });

        // Fetch product details for all products
        if (allProductIds.size > 0) {
          const { data: productsData, error: productsError } = await supabase
            .from("products")
            .select("id, product_name, price, product_images")
            .in("id", Array.from(allProductIds));

          if (productsError) {
            console.error("Error fetching products:", productsError);
            return;
          }

          // Create a map for quick product lookup
          const newProductsMap = new Map<number, ProductDetails>();
          productsData?.forEach((product) => {
            newProductsMap.set(product.id, product);
          });
          setProductsMap(newProductsMap);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  const getImageUrl = (filename: string) => {
    const cleanFilename = filename
      .replace(/^\/+/, "")
      .replace(/^product-images\//, "");
    return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/${cleanFilename}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "processing":
        return <Package className="w-4 h-4 text-yellow-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background:
          "linear-gradient(to bottom, #FDFDEA 0%, #FDFDEA 60%, #FEFEF5 75%, #FFFFFF 80%)",
      }}
    >
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20">
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-[#E7F0CE] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#005655]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  My Profile
                </h2>
                <p className="text-gray-500 text-sm">
                  Manage your account settings and preferences
                </p>
              </div>
            </div>

            {/* Profile Card */}
            <div className="flex items-center space-x-4 p-4 rounded-lg shadow-sm border border-[#005655] transition-colors">
              {/* Profile Avatar */}
              <div className="w-16 h-16 bg-[#E7F0CE] rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
                <User className="w-8 h-8 text-[#005655]" />
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {user?.name || "Loading..."}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">
                    {user?.email || "Loading..."}
                  </p>{" "}
                  |
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    {user?.status === "true" ||
                    user?.status === "active" ||
                    (user?.status as any) === true
                      ? "Active"
                      : user?.status || "Loading..."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 items-center justify-between">
                {/* Join Date */}
                <div className="text-right">
                  <p className="font-semibold text-xl text-[#005655]">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "Loading..."}
                  </p>
                  <p className="text-xs text-gray-500">Join Date</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEditClick}
                    className="bg-[#005655] hover:bg-[#004444] text-white px-3 py-1 text-sm rounded-sm transition-colors"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogoutClick}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded-sm transition-colors flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order History Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-[#E7F0CE] rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#005655]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Order History
                </h2>
                <p className="text-gray-500 text-sm">
                  Track and view all your orders
                </p>
              </div>
            </div>

            {/* Orders List */}
            {loadingOrders ? (
              <div className="flex items-center justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-12 h-12 border-4 border-[#005655] border-t-transparent rounded-full"
                />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Orders Yet
                </h3>
                <p className="text-gray-500">
                  Start shopping to see your orders here!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Order Header */}
                    <div className="bg-gradient-to-r from-[#E7F0CE] to-[#F3F7DE] p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm font-semibold text-[#005655]">
                            Order #{order.id}
                          </p>
                          <p className="text-xs text-gray-600">
                            {new Date(order.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="text-lg font-bold text-[#005655]">
                            ${order.total_price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Products */}
                    <div className="p-4 space-y-3">
                      {Array.isArray(order.product_id) &&
                        order.product_id.map((productId, idx) => {
                          const product = productsMap.get(productId);
                          const quantity = Array.isArray(order.quantity)
                            ? order.quantity[idx]
                            : 1;

                          return (
                            <div
                              key={`${order.id}-${productId}-${idx}`}
                              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                            >
                              {/* Product Image */}
                              <div className="w-16 h-16 bg-[#E7F0CE] rounded-lg overflow-hidden flex-shrink-0">
                                {product?.product_images?.[0] ? (
                                  <img
                                    src={getImageUrl(product.product_images[0])}
                                    alt={product.product_name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = "/placeholder.svg";
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package className="w-8 h-8 text-gray-400" />
                                  </div>
                                )}
                              </div>

                              {/* Product Details */}
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">
                                  {product?.product_name ||
                                    `Product #${productId}`}
                                </h4>
                                <div className="flex items-center gap-4 mt-1">
                                  <p className="text-sm text-gray-600">
                                    Quantity:{" "}
                                    <span className="font-semibold">
                                      {quantity}
                                    </span>
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Price:{" "}
                                    <span className="font-semibold">
                                      ${product?.price || 0}
                                    </span>
                                  </p>
                                  <p className="text-sm font-semibold text-[#005655]">
                                    Subtotal: $
                                    {((product?.price || 0) * quantity).toFixed(
                                      2
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                      {/* Shipping Address */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-600 mb-2">
                          Shipping Address:
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.street_address}, {order.city}, {order.state},{" "}
                          {order.country}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-[#005655]">
                    Edit Name
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005655] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveName}
                      disabled={isLoading}
                      className="flex-1 bg-[#005655] text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-[#004444] disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                      <span>{isLoading ? "Saving..." : "Save Changes"}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCloseModal}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logout Confirmation Modal */}
        <AnimatePresence>
          {isLogoutModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <LogOut className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Confirm Logout
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-600">
                    Are you sure you want to logout? You will need to sign in
                    again to access your account.
                  </p>

                  <div className="flex space-x-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogoutConfirm}
                      className="flex-1 bg-red-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-red-600 flex items-center justify-center space-x-2"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Yes, Logout</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogoutCancel}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilePage;
