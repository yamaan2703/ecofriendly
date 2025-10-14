import React from "react";
import { useContent } from "@/contexts/ContentContext";

const ProductDetailingSection: React.FC = () => {
  const { content } = useContent();
  return (
    <section id="products" className="py-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute left-0 top-0 w-64 h-64 lg:w-96 lg:h-96 opacity-30 pointer-events-none">
        <img
          src="/images/leaves_1.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-eurotypo">
            Premium Product{" "}
            <span className="text-primary italic">Features</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature Cards */}
          <div className="space-y-4 lg:order-1">
            {content.features2.map((feature, index) => (
              <div
                key={index}
                className="bg-background-cream border border-primary-light rounded-xl p-5 shadow-soft hover:shadow-eco transition-shadow"
              >
                <h3 className="font-bold text-primary text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Product Image */}
          <div className="flex justify-center lg:justify-end lg:order-2">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Decorative Background */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-primary-lighter rounded-3xl opacity-50"></div>

              {/* Main Image Container */}
              <div className="relative bg-background-cream rounded-3xl p-8 shadow-eco">
                <img
                  src="/images/brush_rock.png"
                  alt="Bamboo toothbrush with rock formation"
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

export default ProductDetailingSection;
