"use client";
import React from "react";
import { useContent } from "@/contexts/ContentContext";

const ProductSpecSection: React.FC = () => {
  const { content } = useContent();
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute right-0 bottom-0 w-64 h-64 lg:w-96 lg:h-96 opacity-30 pointer-events-none">
        <img
          src="/images/leaf_2.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-eurotypo">
              {content.specificationsSection.title}{" "}
              <span className="text-primary italic">
                {content.specificationsSection.subtitle}
              </span>
            </h2>
          </div>

          {/* Specifications List */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-soft">
            <div className="divide-y divide-border">
              {content.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row py-5 gap-2 sm:gap-6 hover:bg-primary-lighter/30 transition-colors rounded-lg px-3"
                >
                  <div className="sm:w-1/3">
                    <h3 className="font-bold text-primary text-sm sm:text-base">
                      {spec.label}
                    </h3>
                  </div>
                  <div className="sm:w-2/3">
                    <p className="text-foreground text-sm sm:text-base leading-relaxed">
                      {spec.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecSection;
