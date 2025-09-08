import React from "react";
import { Check } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const BenefitsSection: React.FC = () => {
  const { content } = useContent();
  return (
    <section id="benefits" className="py-16 relative overflow-hidden px-10">
      {/* Decorative Leaves - Left Side */}
      <div className="absolute left-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 z-0 pointer-events-none">
        <img
          src="/images/leaves_1.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-left"
        />
      </div>

      <div className="absolute right-0 top-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 z-0 pointer-events-none">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="z-10 mb-16">
          <div className="text-center px-2">
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-eurotypo-bold">
              <span className="text-eco-charcoal font-eurotypo font-bold ">
                {content.benefits.title}
              </span>
              <div className="w-12 h-6 sm:w-16 sm:h-7 lg:w-20 lg:h-8 mx-1 mt-1 sm:mt-2 relative overflow-hidden rounded-full">
                <img
                  src="/images/teeth.png"
                  alt="Smile"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[#005655] font-bold font-eurotypo italic">
                {content.benefits.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.benefits.items.map((benefit, index) => (
            <div
              key={index}
              className="group bg-transparent hover:bg-[#E7F0CE] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-start gap-4">
                {/* Icon */}
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-[#005655] group-hover:bg-white rounded-lg flex items-center justify-center transition-all duration-500 ease-in-out">
                    <img 
                      src={benefit.icon} 
                      alt={benefit.title}
                      className="w-6 h-6 object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-eurotypo font-bold text-[#005655]  leading-tight transition-colors duration-500 ease-in-out">
                    {benefit.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="leading-relaxed font-eurotypo text-sm text-gray-600  transition-colors duration-500 ease-in-out">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center mt-12">
          <div className="bg-[#E7F0CE] border border-[#005655] rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-eurotypo font-bold text-[#005655] mb-4">
              Ready to Make the Switch?
            </h3>
            <p className="text-gray-600 mb-6 font-eurotypo">
              Join thousands of customers who have chosen a more sustainable way
              to care for their teeth.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Check color="#005655" /> 30-day money back guarantee
              </span>
              <span className="flex items-center gap-2">
                <Check color="#005655" /> Free shipping
              </span>
              <span className="flex items-center gap-2">
                <Check color="#005655" /> Eco-certified materials
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
