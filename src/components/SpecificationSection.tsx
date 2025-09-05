"use client";
import React from "react";

const ProductSpecSection: React.FC = () => {
  const specifications = [
    {
      label: "Features & Specs",
      value:
        "eco-friendly, biodegradable, travel toothbrush, soft BPA-free, natural wooden bristles, Travel Size, Bamboo Handle, Plant-Based Bristles",
    },
    {
      label: "Power Source",
      value: "Battery Powered",
    },
    {
      label: "Item Firmness",
      value: "Soft",
    },
    {
      label: "Toothbrush head shape",
      value: "Rectangle",
    },
    {
      label: "Description Style",
      value: "Natural",
    },
    {
      label: "Color",
      value: "Natural",
    },
    {
      label: "Material Features",
      value: "Natural",
    },
    {
      label: "Bristle Material",
      value: "Nylon",
    },
    {
      label: "Handle Material",
      value: "Wood",
    },
    {
      label: "Number of Items",
      value: "10",
    },
    {
      label: "Unit Count",
      value: "10.00 Count",
    },
    {
      label: "Number of Items",
      value: "Number of Pieces",
    },
  ];

  return (
    <section className="p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto border rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-eurotypo-italic text-[#1E1E1E] mb-1 sm:mb-2">
            Product Specification
          </h2>
        </div>

        {/* Specifications Table */}
        <div className="overflow-hidden">
          <div className="divide-y divide-gray-100">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row py-3 sm:py-4 gap-2 sm:gap-4"
              >
                <div className="sm:w-1/3 lg:w-1/3">
                  <h3 className="font-semibold text-[#1E1E1E] text-xs sm:text-sm mb-1 sm:mb-0">
                    {spec.label}
                  </h3>
                </div>
                <div className="sm:w-2/3 lg:w-2/3">
                  <p className="text-[#1E1E1E] text-xs sm:text-sm leading-relaxed">
                    {spec.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecSection;
