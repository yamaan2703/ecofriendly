"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, User, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Toothbrush", action: "home1", type: "page" },
  { label: "Dishwasher", action: "home2", type: "page" },
  { label: "Blog", action: "blog", type: "route" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentPage, switchToHome1, switchToHome2 } = useContent();
  const { user, logout } = useAuth();

  const handleNavigation = (item: {
    label: string;
    action: string;
    type: string;
  }) => {
    if (item.type === "page") {
      if (item.action === "home1") {
        switchToHome1();
      } else if (item.action === "home2") {
        switchToHome2();
      }
    } else if (item.type === "route") {
      window.location.href = `/${item.action}`;
    } else {
      scrollToSection(item.action);
    }
    setIsOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    window.location.href = "/";
    setIsOpen(false);
  };

  const handleUserClick = () => {
    if (user) {
      window.location.href = "/profile";
    } else {
      window.location.href = "/login";
    }
    setIsOpen(false);
  };

  const handleShopClick = () => {
    window.location.href = "/shop";
    setIsOpen(false);
  };

  // Check current page for active states
  const isShopPage = window.location.pathname === "/shop";
  const isProfilePage = window.location.pathname === "/profile";
  const isLoginPage = window.location.pathname === "/login";
  const isSignupPage = window.location.pathname === "/signup";
  const isBlogPage = window.location.pathname === "/blog";

  // Only show nav items as active when on home page
  const isHomePage = window.location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      const scrollSections = navItems
        .filter((item) => item.type === "scroll")
        .map((item) => item.action);
      const currentSection = scrollSections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isOpen
          ? "bg-[#E7F0CE]/60 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center"
          >
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="/images/ecofriendly_dark.png"
                alt="EcoFriendly"
                className="h-8 w-auto"
              />
            </button>
          </motion.div>

          {/* Navigation Items - Center */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.action}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.1, duration: 0.6 }}
              >
                <button
                  onClick={() => handleNavigation(item)}
                  className="relative px-4 py-2 font-medium text-[#005655] transition-all duration-300 hover:scale-105"
                >
                  <span className="relative inline-block text-center">
                    {item.label}
                    {((isHomePage &&
                      ((item.type === "scroll" &&
                        activeSection === item.action) ||
                        (item.type === "page" &&
                          currentPage === item.action))) ||
                      (item.type === "route" &&
                        isBlogPage &&
                        item.action === "blog")) && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="block h-0.5 bg-[#005655] rounded mt-1 w-1/2 mx-auto"
                        transition={{
                          type: "spring",
                          bounce: 0.25,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </span>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Icons - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center space-x-2"
          >
            {/* User Icon */}
            <button
              onClick={handleUserClick}
              className={`p-2 transition-all duration-300 hover:scale-110 hover:bg-[#E7F0CE] rounded-full ${
                user ? "text-green-600" : "text-[#005655]"
              }`}
              aria-label={user ? "Profile" : "Login"}
              title={user ? "Profile" : "Login"}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shop Icon */}
            <button
              onClick={handleShopClick}
              className={`p-2 transition-all duration-300 hover:scale-110 hover:bg-[#E7F0CE] rounded-full ${
                isShopPage ? "text-[#005655] bg-[#E7F0CE]" : "text-[#005655]"
              }`}
              aria-label="Shop"
              title="Shop"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#005655] transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-screen bg-[#005655] z-50 shadow-xl flex flex-col"
            >
              <div className="flex justify-between items-center p-5 border-b border-white/20">
                <img
                  src="/images/ecofriendly_light.png"
                  alt="Logo"
                  className="h-6"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              <div className="bg-[#005655] flex-1 flex flex-col items-start justify-start px-6 py-8 space-y-6">
                {/* Navigation Items */}
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.action}
                    onClick={() => handleNavigation(item)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`text-xl font-semibold tracking-wide text-white w-full text-left transition-colors duration-300 ${
                      (isHomePage &&
                        ((item.type === "scroll" &&
                          activeSection === item.action) ||
                          (item.type === "page" &&
                            currentPage === item.action))) ||
                      (item.type === "route" &&
                        isBlogPage &&
                        item.action === "blog")
                        ? "underline underline-offset-4"
                        : "hover:text-[#A0C474]"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* User and Shop Icons for Mobile */}
                <div className="w-full flex flex-col space-y-4 pt-4 border-t border-white/20">
                  <motion.button
                    onClick={handleUserClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: navItems.length * 0.1,
                    }}
                    className="flex items-center space-x-3 text-white hover:text-[#A0C474] transition-colors duration-300"
                    aria-label={user ? "Profile" : "Login"}
                  >
                    <User className="w-6 h-6" />
                    <span className="text-lg font-medium">
                      {user ? "Profile" : "Login"}
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={handleShopClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: (navItems.length + 1) * 0.1,
                    }}
                    className="flex items-center space-x-3 text-white hover:text-[#A0C474] transition-colors duration-300"
                    aria-label="Shop"
                  >
                    <ShoppingBag className="w-6 h-6" />
                    <span className="text-lg font-medium">Shop</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
