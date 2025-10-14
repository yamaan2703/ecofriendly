import React, { useState } from "react";
import {
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles,
  Shield,
  Feather,
  Package,
  Gem,
  Crown,
  Gift,
  Award,
  ChevronRight,
} from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const iconMap = {
  Sparkles,
  Shield,
  Feather,
  Package,
  Gem,
  Crown,
  Gift,
  Award,
};

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const { content } = useContent();

  return (
    <section
      id="features"
      className="py-20 relative overflow-hidden bg-gradient-subtle"
    >
      {/* Decorative Background */}
      <div className="absolute right-0 top-0 w-64 h-64 lg:w-96 lg:h-96 opacity-30 pointer-events-none">
        <img
          src="/images/leaf_2.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-eurotypo mb-2">
            {content.features.title}
            <span className="block sm:inline ml-0 sm:ml-3 text-primary italic">
              {content.features.subtitle}
            </span>
          </h2>
        </div>

        {/* Features Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Feature List */}
          <div className="space-y-3">
            {content.features.items.map((feature, index) => (
              <div
                key={index}
                className={`group cursor-pointer p-5 rounded-xl border-2 transition-all ${
                  activeFeature === index
                    ? "border-primary bg-primary-lighter shadow-eco"
                    : "border-transparent bg-card hover:border-primary-light hover:shadow-soft"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                    {typeof feature.icon === "string"
                      ? (() => {
                          const IconComponent =
                            iconMap[feature.icon as keyof typeof iconMap];
                          return IconComponent ? (
                            <IconComponent className="w-5 h-5" />
                          ) : (
                            <Star className="w-5 h-5" />
                          );
                        })()
                      : feature.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-primary text-lg mb-1">
                      {feature.title}
                    </h3>

                    {activeFeature === index && (
                      <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                        {feature.description}
                      </p>
                    )}

                    {activeFeature !== index && (
                      <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Decorative Background */}
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-primary-lighter rounded-3xl opacity-60"></div>

              {/* Main Image Container */}
              <div className="relative bg-background-cream rounded-3xl p-8 shadow-eco">
                <img
                  src={content.features.items[activeFeature].image}
                  alt={content.features.items[activeFeature].title}
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain rounded-2xl transition-opacity duration-300"
                  key={`feature-${activeFeature}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
