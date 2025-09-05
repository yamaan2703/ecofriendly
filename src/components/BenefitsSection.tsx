import React from "react";
import { Leaf, Users, Shield, Recycle } from "lucide-react";

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Leaf,
      title: "100% Natural Bamboo",
      description:
        "Made from sustainably sourced bamboo that's completely biodegradable",
    },
    {
      icon: Users,
      title: "Perfect for Families",
      description:
        "Pack of 10 toothbrushes - ideal for the whole family or extended personal use",
    },
    {
      icon: Shield,
      title: "100% FBR Compliant",
      description:
        "Certified solution ensuring compliance with Pakistan's tax regulations.",
    },
    {
      icon: Recycle,
      title: "Eco-Friendly",
      description:
        "Reduces plastic waste by 95% compared to traditional plastic toothbrushes",
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden px-10">
      {/* Decorative Leaves - Left Side */}
      <div className="absolute left-0 bottom-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 z-0 pointer-events-none">
        <img
          src="/images/leaves_1.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-left"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="z-10 mb-16">
          <div className="text-center px-2">
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-eurotypo-bold">
              <span className="text-eco-charcoal font-eurotypo font-bold ">
                Why Choose Our
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
                Bamboo
              </span>
              <span className="text-eco-charcoal font-eurotypo  font-bold">
                Toothbrushes?
              </span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-transparent hover:bg-[#99BB6F] hover:text-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-start gap-4">
                {/* Icon */}
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-[#005655] group-hover:bg-white rounded-lg flex items-center justify-center transition-all duration-500 ease-in-out">
                    <benefit.icon className="w-6 h-6 text-white group-hover:text-[#005655] transition-colors duration-500 ease-in-out" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-eurotypo font-bold text-[#005655] group-hover:text-white leading-tight transition-colors duration-500 ease-in-out">
                    {benefit.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="leading-relaxed font-eurotypo text-sm text-gray-600 group-hover:text-white transition-colors duration-500 ease-in-out">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center mt-12">
          <div className="bg-[#F3F7DE] rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-eurotypo font-bold text-[#005655] mb-4">
              Ready to Make the Switch?
            </h3>
            <p className="text-gray-600 mb-6 font-eurotypo">
              Join thousands of customers who have chosen a more sustainable way
              to care for their teeth.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <span>✓ 30-day money back guarantee</span>
              <span>✓ Free shipping</span>
              <span>✓ Eco-certified materials</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
