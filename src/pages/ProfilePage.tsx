"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiEdit2,
  FiLogOut,
  FiPackage,
  FiShoppingBag,
  FiClock,
  FiCheck,
  FiTruck,
  FiDownload,
  FiX,
  FiSave,
  FiCalendar,
} from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { pdf } from "@react-pdf/renderer";
import OrderPDF from "@/components/OrderPDF";

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
  phone_Number: string;
  total_price: number;
  user_id?: number;
  updated_at?: string | null;
}

interface ProductDetails {
  id: number;
  product_name: string;
  actual_price: number;
  discounted_price: number;
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

  const handleDownloadInvoice = async (order: Order) => {
    try {
      // Prepare order data for PDF
      const orderForPDF = {
        ...order,
        user_id: order.user_id || user?.id || 0,
        updated_at: order.updated_at || null,
        customer_name: user?.name || "N/A",
        customer_email: user?.email || "N/A",
        products: order.product_id.map((productId, index) => {
          const product = productsMap.get(productId);
          return {
            id: productId,
            product_name: product?.product_name || `Product #${productId}`,
            discounted_price: product?.discounted_price || 0,
          };
        }),
      };

      // Generate PDF
      const blob = await pdf(<OrderPDF order={orderForPDF} />).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-order-${order.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
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
            .select(
              "id, product_name, actual_price, discounted_price, product_images"
            )
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
        return <FiCheck className="w-4 h-4 text-white" />;
      case "shipped":
        return <FiTruck className="w-4 h-4 text-white" />;
      case "processing":
        return <FiPackage className="w-4 h-4 text-white" />;
      case "pending":
        return <FiClock className="w-4 h-4 text-white" />;
      default:
        return <FiClock className="w-4 h-4 text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "shipped":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      case "pending":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

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
            <span className="text-primary font-bold text-sm">My Account</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground font-eurotypo mb-3">
            Welcome Back,{" "}
            <span className="text-primary italic">
              {user?.name?.split(" ")[0] || "User"}
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your profile and track your eco-friendly journey
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-primary/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center border-4 border-white shadow-lg">
                <FiUser className="w-16 h-16 text-primary" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-white">
                <HiOutlineSparkles className="w-5 h-5 text-white" />
              </div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-foreground font-eurotypo mb-2">
                {user?.name || "Loading..."}
              </h2>
              <p className="text-muted-foreground mb-4">
                {user?.email || "Loading..."}
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                <div className="flex items-center gap-2 bg-[#DCE7C8] px-4 py-2 rounded-full">
                  <FiCalendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Joined{" "}
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "..."}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <FiCheck className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-primary">Active</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <motion.button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-light transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiEdit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </motion.button>
                <motion.button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order History Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground font-eurotypo mb-2">
                Order <span className="text-primary italic">History</span>
              </h2>
              <p className="text-muted-foreground">
                Track and manage all your purchases
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#DCE7C8] px-4 py-2 rounded-full">
              <FiShoppingBag className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">
                {orders.length} Orders
              </span>
            </div>
          </div>

          {/* Orders List */}
          {loadingOrders ? (
            <div className="flex items-center justify-center py-20">
              <motion.div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>
                <p className="text-muted-foreground font-medium">
                  Loading orders...
                </p>
              </motion.div>
            </div>
          ) : orders.length === 0 ? (
            <motion.div
              className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BsBoxSeam className="w-20 h-20 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-3">
                No Orders Yet
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                Start shopping to see your orders here!
              </p>
              <motion.button
                onClick={() => (window.location.href = "/")}
                className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-light transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Shopping
              </motion.button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-lg border-2 border-primary/10 overflow-hidden hover:shadow-xl transition-all"
                  whileHover={{ y: -5 }}
                >
                  {/* Order Header */}
                  <div className="bg-[#DCE7C8] p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                          <FiPackage className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-foreground font-eurotypo">
                            Order #{order.id}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FiCalendar className="w-4 h-4" />
                            <span>
                              {new Date(order.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center gap-2 ${getStatusColor(
                            order.status
                          )} text-white px-4 py-2 rounded-xl font-bold text-sm`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDownloadInvoice(order)}
                          className="bg-primary hover:bg-primary-light text-white p-3 rounded-xl transition-colors"
                          title="Download Invoice"
                        >
                          <FiDownload className="w-5 h-5" />
                        </motion.button>
                        <div className="text-right bg-white px-4 py-2 rounded-xl">
                          <p className="text-xs text-muted-foreground">Total</p>
                          <p className="text-xl font-bold text-primary">
                            ${order.total_price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Products */}
                  <div className="p-6 space-y-4">
                    {Array.isArray(order.product_id) &&
                      order.product_id.map((productId, idx) => {
                        const product = productsMap.get(productId);
                        const quantity = Array.isArray(order.quantity)
                          ? order.quantity[idx]
                          : 1;

                        return (
                          <div
                            key={`${order.id}-${productId}-${idx}`}
                            className="flex items-center gap-4 p-4 bg-background-cream rounded-2xl hover:bg-[#DCE7C8]/30 transition-colors"
                          >
                            {/* Product Image */}
                            <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden flex-shrink-0 border-2 border-primary/10">
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
                                  <BsBoxSeam className="w-8 h-8 text-primary" />
                                </div>
                              )}
                            </div>

                            {/* Product Details */}
                            <div className="flex-1">
                              <h4 className="font-bold text-foreground font-eurotypo mb-1">
                                {product?.product_name ||
                                  `Product #${productId}`}
                              </h4>
                              <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-muted-foreground">
                                    Qty:
                                  </span>
                                  <span className="font-bold text-foreground">
                                    {quantity}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-muted-foreground">
                                    Price:
                                  </span>
                                  {product?.actual_price &&
                                  product?.discounted_price &&
                                  product.actual_price >
                                    product.discounted_price ? (
                                    <>
                                      <span className="text-muted-foreground line-through">
                                        ${product.actual_price}
                                      </span>
                                      <span className="font-bold text-primary">
                                        ${product.discounted_price}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="font-bold text-foreground">
                                      ${product?.discounted_price || 0}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-sm ml-auto">
                                  <span className="text-muted-foreground">
                                    Subtotal:
                                  </span>
                                  <span className="font-bold text-primary text-lg">
                                    $
                                    {(
                                      (product?.discounted_price || 0) *
                                      quantity
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    {/* Shipping Address */}
                    <div className="mt-4 pt-4 border-t-2 border-primary/10">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FiTruck className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground mb-1">
                            Shipping Address
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {order.street_address}, {order.city}, {order.state},{" "}
                            {order.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                      <FiEdit2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground font-eurotypo">
                      Edit Profile
                    </h3>
                  </div>
                  <motion.button
                    onClick={handleCloseModal}
                    className="text-muted-foreground hover:text-foreground transition-colors p-2"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-primary/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveName}
                      disabled={isLoading}
                      className="flex-1 bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-light disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="relative w-5 h-5">
                          <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                        </div>
                      ) : (
                        <FiSave className="w-5 h-5" />
                      )}
                      <span>{isLoading ? "Saving..." : "Save Changes"}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCloseModal}
                      className="px-6 py-3 border-2 border-primary/20 text-foreground rounded-xl font-semibold hover:bg-primary/5"
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="text-center mb-6">
                  <motion.div
                    className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FiLogOut className="w-8 h-8 text-red-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-2">
                    Confirm Logout
                  </h3>
                  <p className="text-muted-foreground">
                    Are you sure you want to logout? You will need to sign in
                    again to access your account.
                  </p>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogoutConfirm}
                    className="flex-1 bg-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-600 flex items-center justify-center gap-2"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span>Yes, Logout</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogoutCancel}
                    className="px-6 py-3 border-2 border-primary/20 text-foreground rounded-xl font-semibold hover:bg-primary/5"
                  >
                    Cancel
                  </motion.button>
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
