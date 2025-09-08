"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";

const navItems = [
  { label: "Home", action: "home", type: "scroll" },
  { label: "Benefits", action: "benefits", type: "scroll" },
  { label: "Features", action: "features", type: "scroll" },
  { label: "Products", action: "products", type: "scroll" },
  { label: "FAQ", action: "faq", type: "scroll" },
];

const productTypes = [
  { label: "Toothbrush", action: "home1", type: "page" },
  { label: "Dishwasher", action: "home2", type: "page" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentPage, switchToHome1, switchToHome2 } = useContent();

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
    } else {
      scrollToSection(item.action);
    }
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
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
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="w-40 h-20 flex items-center justify-center">
            <img
              src="/images/ecofriendly_dark.png"
              alt="EcoFriendly"
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Products Dropdown */}
            <motion.div
              className="relative dropdown-container"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.6 }}
            >
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative px-4 py-2 font-medium text-[#005655] transition-all duration-300 hover:scale-105 flex items-center gap-1"
              >
                <span className="relative inline-block text-center">
                  Home
                  {productTypes.some((item) => currentPage === item.action) && (
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
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  >
                    {productTypes.map((item, index) => (
                      <button
                        key={item.action}
                        onClick={() => handleNavigation(item)}
                        className={`w-full text-left px-4 py-2 hover:bg-[#E7F0CE] transition-colors duration-200 ${
                          currentPage === item.action
                            ? "bg-[#E7F0CE] text-[#005655] font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Regular Navigation Items */}
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
                    {item.type === "scroll" &&
                      activeSection === item.action && (
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
                {/* Products Section */}
                <div className="w-full">
                  <h3 className="text-lg font-bold text-white mb-3">Home</h3>
                  {productTypes.map((item, index) => (
                    <motion.button
                      key={item.action}
                      onClick={() => handleNavigation(item)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`text-lg font-medium tracking-wide text-white w-full text-left transition-colors duration-300 mb-2 pl-4 ${
                        currentPage === item.action
                          ? "underline underline-offset-4"
                          : "hover:text-[#A0C474]"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                {/* Regular Navigation */}
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.action}
                    onClick={() => handleNavigation(item)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + productTypes.length) * 0.1 }}
                    className={`text-xl font-semibold tracking-wide text-white w-full text-left transition-colors duration-300 ${
                      item.type === "scroll" && activeSection === item.action
                        ? "underline underline-offset-4"
                        : "hover:text-[#A0C474]"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
