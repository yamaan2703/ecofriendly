"use client";

import React from "react";
import { useContent } from "@/contexts/ContentContext";
import { Sparkles } from "lucide-react";

const HeroSection: React.FC = () => {
  const { content } = useContent();
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 bg-primary-lighter text-primary px-5 py-2 rounded-full text-sm font-semibold shadow-soft">
                <Sparkles className="w-4 h-4" />
                {content.hero.badge}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-notulen font-black text-primary leading-tight">
                {content.hero.title}
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-eurotypo italic text-foreground-eco">
                {content.hero.subtitle}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              {content.hero.description}
            </p>

            {/* Info Card */}
            <div className="bg-primary-lighter border-l-4 border-primary p-6 rounded-lg max-w-xl mx-auto lg:mx-0">
              <h3 className="text-primary font-eurotypo font-bold text-xl mb-2">
                Why Bamboo?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bamboo grows quickly, requires no pesticides, and naturally
                biodegrades. It's nature's gift to a greener tomorrow.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Decorative Background */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-primary-lighter rounded-3xl opacity-50"></div>

              {/* Main Image Container */}
              <div className="relative bg-background-cream rounded-3xl p-8 shadow-eco">
                <img
                  src={content.hero.heroImage}
                  alt={`${content.hero.title} ${content.hero.subtitle}`}
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
