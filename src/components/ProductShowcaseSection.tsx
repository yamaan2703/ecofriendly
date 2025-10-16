import React from "react";
import {
  Star,
  CheckCircle,
  Globe,
  Feather,
  ShieldOff,
  RotateCcw,
} from "lucide-react";
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
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 mb-8">
          {/* Product Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg">
              {/* Multiple Decorative Backgrounds */}
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-[#84B350] rounded-[2.5rem] opacity-20"></div>
              <div className="absolute -bottom-3 -left-3 w-full h-full bg-[#DCE7C8] rounded-[2rem] opacity-40"></div>

              {/* Main Image Container */}
              <div className="relative bg-background-cream rounded-[2rem] p-10 shadow-2xl border border-primary/10">
                <img
                  src={content.productShowcase.image}
                  alt={content.productShowcase.imageAlt}
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain"
                />

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold">Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground font-eurotypo leading-tight">
              {content.productShowcase.title}{" "}
              <span className="text-primary italic">
                {content.productShowcase.subtitle}
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
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
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6">
              {content.productShowcase.guarantees.map((guarantee, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 text-xs bg-[#DCE7C8]/70 text-muted-foreground px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <CheckCircle className="size-4 text-primary" />
                  {guarantee.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {content.features3.map((feature, index) => (
            <div
              key={index}
              className="bg-[#DCE7C8] rounded-2xl p-3 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all border border-transparent hover:border-primary/50"
            >
              <div className="space-y-2">
                {/* Icon */}
                <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg mx-auto lg:mx-0">
                  {featureIconMap[feature.label] &&
                    React.createElement(featureIconMap[feature.label], {
                      className: "size-5 text-white",
                    })}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary font-eurotypo text-center lg:text-left">
                  {feature.label}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed text-center lg:text-left">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#84B350]/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ProductShowcaseSection;
