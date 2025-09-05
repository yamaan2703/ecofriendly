"use client";

import React, { useState } from "react";
import { Menu, X, ShoppingBag, User } from "lucide-react";
// import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";

export const navItems = [
  { label: "Home", id: "home" },
  { label: "Benefits", id: "benefits" },
  { label: "Features", id: "features" },
  { label: "FAQ", id: "faq" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-eco-cream backdrop-blur-sm">
      <div className="mx-10 px-0 pt-1">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="w-44">
            <img
              src="/images/ecofriendly_dark.png"
              alt="EcoFriendly Logo"
              width={1000}
              height={1000}
              // className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline gap-8">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-[#1E1E1E] px-3 py-2 text-xs transition-all duration-200 cursor-pointer tracking-wider font-medium hover:bg-eco-green/10 hover:text-eco-green rounded-lg"
                  >
                    {item.label}
                  </button>
                  {/* Animated underline using Framer Motion */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1E1E1E] rounded-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: item.id === "home" ? 1 : 0,
                      opacity: item.id === "home" ? 1 : 0,
                    }}
                    whileHover={{
                      scaleX: 1,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Icons - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            <button className="text-eco-green hover:text-eco-dark p-2 transition-colors duration-200 cursor-pointer">
              <FaUserAlt size={15} />
            </button>
            <button className="text-eco-green hover:text-eco-dark p-2 transition-colors duration-200 cursor-pointer">
              <MdShoppingCart size={20} />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-website-dark hover:text-eco-green p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-eco-cream border-t border-eco-green/10">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-[#1E1E1E] hover:text-eco-green hover:bg-eco-green/10 block px-3 py-2 text-base w-full text-left transition-all duration-200 cursor-pointer font-medium rounded-lg"
                  >
                    {item.label}
                  </button>
                  {/* Animated underline using Framer Motion */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1E1E1E] rounded-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: item.id === "home" ? 1 : 0,
                      opacity: item.id === "home" ? 1 : 0,
                    }}
                    whileHover={{
                      scaleX: 1,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              ))}
              {/* Mobile Icons */}
              <div className="flex items-center space-x-4 pt-4 px-3">
                <button className="text-eco-green hover:text-eco-dark p-2 transition-colors duration-200 cursor-pointer">
                  <FaUserAlt size={15} />
                </button>
                <button className="text-eco-green hover:text-eco-dark p-2 transition-colors duration-200 cursor-pointer">
                  <MdShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
