"use client";

import React from "react";
import { Play } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Content */}
        <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
          <div>
            <span className="inline-block bg-[#E7F0CE] text-eco-green text-sm sm:text-base font-semibold px-4 py-1.5 rounded-full shadow-sm animate-bounce">
              100% Plastic-Free Packaging
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-notulen font-black text-[#005655] leading-tight animate-fade-in">
            Ecofriendly
          </h1>
          <h2 className="text-4xl font-eurotypo italic text-eco-charcoal animate-fade-in-delayed">
            Bamboo Toothbrushes
          </h2>

          <p className="text-base sm:text-lg text-eco-charcoal leading-relaxed  max-w-md mx-auto lg:mx-0 mt-2">
            Soft BPA-free bristles, sustainable bamboo handles, and packaging
            that’s kind to our planet. A better smile starts here.
          </p>
        </div>

        {/* Center Image */}
        <div className="lg:col-span-4 flex justify-center relative">
          <div className="relative w-72 sm:w-80 lg:w-[22rem]">
            <div className="absolute inset-0 bg-eco-green rounded-3xl rotate-6 shadow-xl border-4 border-[#A0C474] bg-[#A0C474]"></div>
            <img
              src="/images/hero_image.png"
              alt="Ecofriendly Bamboo Toothbrush"
              width={800}
              height={800}
              className="relative rounded-2xl shadow-2xl object-cover z-10 bg-[#E7F0CE]"
            />
          </div>
        </div>

        {/* Right Side Info */}
        <div className="lg:col-span-3 flex flex-col justify-center gap-6 text-center lg:text-right">
          <div className="bg-[#E7F0CE] p-6 rounded-2xl shadow-md">
            <h3 className="text-eco-dark font-eurotypo font-black text-xl sm:text-2xl mb-2">
              Why Bamboo?
            </h3>
            <p className="text-sm sm:text-base text-eco-charcoal leading-relaxed">
              Bamboo grows quickly, requires no pesticides, and naturally
              biodegrades. It’s nature’s gift to a greener tomorrow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
