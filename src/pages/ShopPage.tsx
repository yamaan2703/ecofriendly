"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Truck, Clock, CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

const ShopPage: React.FC = () => {
  // Sample order history data - only showing orders from pending to delivered
  const orderHistory = [
    {
      id: 1,
      productName: "Eco-Friendly Toothbrush Set",
      productImage: "/images/brush_set.png",
      price: "$24.99",
      date: "2024-01-15",
      status: "Delivered",
      trackingNumber: "TRK123456789",
      quantity: 1,
    },
    {
      id: 2,
      productName: "Biodegradable Dish Sponge",
      productImage: "/images/dish-1.png",
      price: "$8.99",
      date: "2024-01-10",
      status: "Delivered",
      trackingNumber: "TRK987654321",
      quantity: 2,
    },
    {
      id: 3,
      productName: "Sustainable Dish Set",
      productImage: "/images/dish-set.png",
      price: "$45.99",
      date: "2024-01-05",
      status: "Delivered",
      trackingNumber: "TRK456789123",
      quantity: 1,
    },
    {
      id: 4,
      productName: "Bamboo Toothbrush",
      productImage: "/images/brush.png",
      price: "$12.99",
      date: "2024-01-20",
      status: "Shipped",
      trackingNumber: "TRK789123456",
      quantity: 3,
    },
    {
      id: 5,
      productName: "Eco-Friendly Toothbrush Set",
      productImage: "/images/brush_set.png",
      price: "$24.99",
      date: "2024-01-25",
      status: "Processing",
      trackingNumber: null,
      quantity: 1,
    },
    {
      id: 6,
      productName: "Natural Dish Soap",
      productImage: "/images/dish-2.png",
      price: "$15.99",
      date: "2024-01-28",
      status: "Pending",
      trackingNumber: null,
      quantity: 2,
    },
    {
      id: 7,
      productName: "Bamboo Cutlery Set",
      productImage: "/images/dish-3.png",
      price: "$32.99",
      date: "2024-01-30",
      status: "Pending",
      trackingNumber: null,
      quantity: 1,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Shipped":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "Processing":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-red-100 text-red-800";
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
        {/* Order History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-[#E7F0CE] rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-[#005655]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Orders
                </h2>
                <p className="text-gray-500 text-sm">
                  Track orders from pending to delivered
                </p>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-2">
              {orderHistory.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-2 rounded-lg shadow-sm border border-[#005655] transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-[#E7F0CE] rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {order.productName}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">Order #{order.id}</p>{" "}
                      |
                      <p className="text-sm text-gray-500">
                        Qty: {order.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 items-center justify-between">
                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-xl text-[#005655]">
                        {order.price}
                      </p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>

                    {/* Status */}
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopPage;
