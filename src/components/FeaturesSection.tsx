import React, { useState } from "react";
import { Star, Sparkles, Shield, Feather, Package } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const iconMap = {
  Sparkles,
  Shield,
  Feather,
  Package,
};

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const { content } = useContent();

  return (
    <section id="features" className="relative py-20 overflow-hidden">
      {/* Decorative Leaf in corner */}
      {/* <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
        <img
          src="/images/leaf_2.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div> */}

      <div className="container mx-auto max-w-5xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 font-eurotypo">
            Why Choose{" "}
            <span className="text-primary italic">Our Bamboo Brush</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Thoughtfully designed for sustainability, comfort, and care —
            because small changes make a big difference.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Feature List */}
          <div className="flex flex-col gap-3">
            {content.features.items.map((feature, index) => {
              const IconComponent =
                iconMap[feature.icon as keyof typeof iconMap] || Star;

              return (
                <div
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`flex items-center gap-2 p-2 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? "bg-[#DCE7C8] border-primary shadow-lg scale-[1.02]"
                      : " hover:bg-[#DCE7C8] border-primary hover:shadow-md"
                  }`}
                >
                  <div
                    className={`size-10 flex items-center justify-center rounded-xl transition-all ${
                      activeFeature === index
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <IconComponent className="size-5" />
                  </div>
                  <div className="">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {feature.title}
                    </h3>
                    {activeFeature === index && (
                      <p className="text-gray-600 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image Section */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Multiple Decorative Backgrounds */}
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#84B350] rounded-[2rem] opacity-20"></div>
              <div className="absolute -bottom-2 -left-2 w-full h-full bg-[#DCE7C8] rounded-[1.5rem] opacity-40"></div>

              {/* Main Image Container */}
              <div className="relative bg-background-cream rounded-[1.5rem] p-6 shadow-2xl border border-primary/10">
                <div className="w-full h-80 flex items-center justify-center">
                  <img
                    src={content.features.items[activeFeature].image}
                    alt={content.features.items[activeFeature].title}
                    className="max-w-full max-h-full object-contain transition-all duration-500"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-3 -right-3 bg-primary text-white px-3 py-1.5 rounded-full shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold">Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
