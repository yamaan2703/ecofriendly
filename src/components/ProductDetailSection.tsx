import React from "react";
import { useContent } from "@/contexts/ContentContext";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ProductDetailingSection: React.FC = () => {
  const { content } = useContent();

  const leftFeatures = content.features2.slice(
    0,
    Math.ceil(content.features2.length / 2)
  );
  const rightFeatures = content.features2.slice(
    Math.ceil(content.features2.length / 2)
  );

  return (
    <section id="products" className="py-20 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 z-0 pointer-events-none">
        <img
          src="/images/leaf_1.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-left"
        />
      </div>
      <div className="absolute right-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 z-0 pointer-events-none">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>
      <div className="container mx-auto max-w-5xl relative">
        {/* Section Header */}
        <div className="text-center mb-3 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-eurotypo">
            Premium Product{" "}
            <span className="text-primary italic">Features</span>
          </h2>
        </div>

        {/* Custom Flex Layout instead of equal grid */}
        <div className="flex flex-col lg:flex-row items-center justify-center">
          {/* Left Features */}
          <div className="flex-1 max-w-sm w-full space-y-2 text-right">
            {leftFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-end gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all group cursor-pointer"
              >
                <div>
                  <h3 className="text-sm font-semibold text-primary mb-0.5">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed ml-auto">
                    {feature.description ||
                      "Eco-friendly, reliable, and designed for your comfort."}
                  </p>
                </div>
                <div className=" text-primary rounded-full p-2 group-hover:bg-primary group-hover:text-white transition-all">
                  <FaArrowLeft className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>

          {/* Center Image (Larger Width) */}
          <div className="flex-[1.6] flex justify-center relative">
            <img
              src="/images/brush_rock.png"
              alt="Product Showcase"
              className="relative z-10 w-full max-w-[950px] h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Right Features */}
          <div className="flex-1 max-w-sm w-full space-y-2 text-left">
            {rightFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all group cursor-pointer"
              >
                <div className=" text-primary rounded-full p-2 group-hover:bg-primary group-hover:text-white transition-all">
                  <FaArrowRight className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary mb-0.5">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {feature.description ||
                      "Experience the best build quality and sustainability."}
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

export default ProductDetailingSection;
