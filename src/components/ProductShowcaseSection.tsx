import React from "react";
import {
  Star,
  CheckCircle,
  Globe,
  Feather,
  ShieldOff,
  RotateCcw,
} from "lucide-react";
import { IoIosStar } from "react-icons/io";
import { useContent } from "@/contexts/ContentContext";

// Icon mapping for features
const featureIconMap: Record<string, React.ElementType> = {
  "Eco Friendly": Globe,
  "Super Soft": Feather,
  "Plastic Free": ShieldOff,
  "30 Days Return": RotateCcw,
  "Premium Quality": Star,
  "Ultra Gentle": Feather,
  "Whitening Effect": Star,
  "Luxury Guarantee": CheckCircle,
};

const ProductShowcaseSection: React.FC = () => {
  const { content } = useContent();

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Product Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Decorative Background */}
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-primary-lighter rounded-3xl opacity-60"></div>

              {/* Main Image Container */}
              <div className="relative bg-background-cream rounded-3xl p-8 shadow-eco">
                <img
                  src={content.productShowcase.image}
                  alt={content.productShowcase.imageAlt}
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
                {content.productShowcase.title}{" "}
                <span className="font-eurotypo italic text-primary">
                  {content.productShowcase.subtitle}
                </span>
              </h2>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <IoIosStar
                    key={star}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-muted-foreground font-semibold text-lg">
                {content.productShowcase.rating} (
                {content.productShowcase.reviewCount})
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {
                content.productShowcase.description.split(
                  content.productShowcase.highlightText
                )[0]
              }
              <span className="text-primary font-semibold">
                {content.productShowcase.highlightText}
              </span>
              {
                content.productShowcase.description.split(
                  content.productShowcase.highlightText
                )[1]
              }
            </p>

            {/* Guarantees */}
            <div className="flex flex-col sm:flex-row gap-4">
              {content.productShowcase.guarantees.map((guarantee, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground font-medium"
                >
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  {guarantee.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Icons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.features3.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-eco transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    {featureIconMap[feature.label] &&
                      React.createElement(featureIconMap[feature.label], {
                        className: "w-6 h-6 text-primary-foreground",
                      })}
                  </div>

                  <h3 className="text-lg font-eurotypo font-bold text-primary">
                    {feature.label}
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
