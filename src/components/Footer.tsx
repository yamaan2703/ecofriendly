"use client";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FDFDEA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Customer Service Text */}
        <p className="text-gray-700 text-sm mb-2 font-eurotypo">
          Have questions? Contact our customer service team
        </p>

        {/* Contact Information */}
        <div className="text-eco-green font-eurotypo text-sm">
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
      </div>
    </footer>
  );
};

export default Footer;
