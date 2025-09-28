"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Save, X, Check, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";

const ProfilePage: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("John Doe");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditName("John Doe");
  };

  const handleSaveName = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditModalOpen(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Simulate logout process
    setIsLogoutModalOpen(false);
    // Redirect to login page
    window.location.href = "/login";
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
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
                <h3 className="font-medium text-gray-900">John Doe</h3>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">john.doe@example.com</p>{" "}
                  |<p className="text-sm text-gray-500">Status: Active</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 items-center justify-between">
                {/* Join Date */}
                <div className="text-right">
                  <p className="font-semibold text-xl text-[#005655]">
                    Jan 2024
                  </p>
                  <p className="text-xs text-gray-500">Join Date</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEditClick}
                    className="bg-[#005655] hover:bg-[#004444] text-white px-3 py-1.5 text-sm rounded-lg transition-colors"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogoutClick}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </div>
            </div>
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

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50"
            >
              <Check className="w-5 h-5" />
              <span>Name updated successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilePage;
