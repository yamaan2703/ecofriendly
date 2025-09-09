"use client";
import React, { useState } from "react";
// import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import { Plus, Minus } from "lucide-react";
import Button from "./Button/Button";
import { useContent } from "@/contexts/ContentContext";
// import Button from "../Button";

const ProductSection: React.FC = () => {
  const { content } = useContent();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Product Images from content
  const productImages = content.productImages;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <main className="container mx-auto">
      <section className="py-8 sm:py-8 lg:py-16 mx-0 sm:mx-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          <div className="mx-auto w-full sm:w-4/5">
            <div className="sm:hidden bg-[#F3F7DE] rounded-2xl flex items-center justify-center h-[280px] mb-4">
              <div className="relative w-full h-full">
                <img
                  src={productImages[selectedImageIndex]}
                  alt="Bamboo Toothbrush"
                  width={1000}
                  height={1000}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            <div className="flex sm:hidden gap-2 overflow-x-auto pb-2">
              {productImages.map((src, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-20 rounded-lg border-2 overflow-hidden cursor-pointer transition-colors ${
                    selectedImageIndex === index
                      ? "border-eco-green"
                      : "border-gray-200 hover:border-eco-green"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Toothbrush view ${index + 1}`}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="hidden sm:flex gap-3 md:gap-4 w-full max-w-2xl mx-auto lg:max-w-none">
              <div className="flex flex-col gap-3 md:gap-4">
                {productImages.map((src, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-20 md:w-20 md:h-24 rounded-lg border-2 overflow-hidden cursor-pointer transition-colors ${
                      selectedImageIndex === index
                        ? "border-eco-green"
                        : "border-gray-200 hover:border-eco-green"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Toothbrush view ${index + 1}`}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex-1 bg-[#F3F7DE] rounded-2xl flex items-center justify-center h-[300px] sm:h-[350px] md:h-[400px] lg:h-[430px]">
                <div className="relative w-full h-full">
                  <img
                    src={productImages[selectedImageIndex]}
                    alt="Bamboo Toothbrush"
                    width={1000}
                    height={1000}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 lg:space-y-3 w-full max-w-2xl mx-auto lg:max-w-none">
            <h1 className="text-xl sm:text-2xl font-eurotypo font-bold text-[#005655] leading-tight">
              {content.products.title} | {content.products.description}
            </h1>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <IoIosStar
                    key={star}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-xs text-eco-charcoal font-semibold">
                {content.reviews.count}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-4xl font-bold text-[#005655]">
                {content.products.price}
              </span>
              <span className="text-xl text-gray-500 line-through font-semibold">
                {content.products.originalPrice}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                ({content.pricing.packInfo})
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-500">
              ({content.pricing.freeShipping})
            </p>

            <div className="flex flex-row gap-3 sm:gap-2 items-stretch sm:items-center">
              <div className="flex items-center">
                <div className="flex items-center border-2 border-[#005655] rounded-full">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-1.5 sm:p-2 text-eco-charcoal cursor-pointer disabled:opacity-50"
                  >
                    <Minus className="size-5" />
                  </button>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 min-w-[2.5rem] sm:min-w-[3rem] text-center font-semibold text-eco-charcoal text-sm sm:text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="p-1.5 sm:p-2 text-eco-charcoal cursor-pointer"
                  >
                    <Plus className="size-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-row gap-2">
                <div>
                  <Button
                    variant="solid"
                    size="xs"
                    className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-1.5"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-2 sm:pt-3">
              <h3 className="text-base sm:text-lg font-bold text-eco-charcoal mb-2">
                Description
              </h3>
              <p className="text-sm sm:text-base text-eco-charcoal/80 leading-relaxed">
                {content.productDetails.detailedDescription}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductSection;
