"use client";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FDFDEA] py-10 px-4 sm:px-6 lg:px-8 mb-20 sm:mb-10">
      <div className="max-w-7xl mx-auto text-center">
        {/* Customer Service Text */}
        <p className="text-gray-700 text-sm mb-2">
          Have questions? Contact our customer service team
        </p>

        {/* Contact Information */}
        <div className="text-eco-green text-sm mb-6">
          <a
            href="mailto:support@ecobamboobrush.com"
            className="hover:underline mr-4"
          >
            support@ecobamboobrush.com
          </a>
          <span className="text-eco-green">|</span>
          <a href="tel:1-800-ECO-BRUSH" className="hover:underline ml-4">
            1-800-ECO-BRUSH
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-6">
          <a
            href="https://www.facebook.com/eco.frienddly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-eco-green hover:text-eco-green/80 transition-colors"
            aria-label="Visit our Facebook page"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com/ecofriendlyshop.us"
            target="_blank"
            rel="noopener noreferrer"
            className="text-eco-green hover:text-eco-green/80 transition-colors"
            aria-label="Visit our Instagram page"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
