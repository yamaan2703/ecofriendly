"use client";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-cream border-t border-border py-12 px-4 sm:px-6 lg:px-8 mb-20 sm:mb-10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Customer Service Text */}
          <p className="text-foreground text-base font-medium">
            Have questions? Contact our customer service team
          </p>

          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href="mailto:support@ecobamboobrush.com"
              className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">
                support@ecobamboobrush.com
              </span>
            </a>

            <div className="hidden sm:block w-px h-6 bg-border"></div>

            <a
              href="tel:1-800-ECO-BRUSH"
              className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm font-medium">1-800-ECO-BRUSH</span>
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-4 pt-4">
            <a
              href="https://www.facebook.com/eco.frienddly"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-light transition-colors"
              aria-label="Visit our Facebook page"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/ecofriendlyshop.us"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-light transition-colors"
              aria-label="Visit our Instagram page"
            >
              <FaInstagram size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EcoFriendly. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
