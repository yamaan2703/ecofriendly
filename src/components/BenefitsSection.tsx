import React from "react";
import { Check, Leaf, Shield, Heart, Users, Package } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const BenefitsSection: React.FC = () => {
  const { content } = useContent();
  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl font-bold text-foreground font-eurotypo">
              Why Choose Our
            </span>
            <div className="rounded-full">
              <img
                src="/images/teeth.png"
                alt="Leaf"
                className="w-full h-full rounded-full object-contain"
              />
            </div>
            <span className="text-4xl font-bold text-primary font-eurotypo italic">
              Bamboo Toothbrushes?
            </span>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {content.benefits.items.map((benefit, index) => (
            <div
              key={index}
              className="bg-[#DCE7C8] rounded-2xl p-3 shadow-lg hover:shadow-xl transition-shadow hover:border border-primary"
            >
              <div className="space-y-2">
                {/* Icon */}
                <div className="size-12 bg-primary rounded-xl flex items-center justify-center">
                  <benefit.icon className="size-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary font-eurotypo">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Modern Gradient Style */}
        <div className="relative bg-[#DCE7C8] rounded-3xl p-12 text-center shadow-2xl overflow-hidden backdrop-blur-md border border-primary/10">
          {/* Subtle background decorative blur */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-70 pointer-events-none" />

          {/* Heading */}
          <h3 className="text-4xl font-extrabold text-primary-dark mb-4 font-eurotypo italic drop-shadow-sm">
            Take the Step Toward a Greener Smile 🌱
          </h3>

          {/* Subtitle */}
          <p className="text-gray-600 mb-6 text-md max-w-2xl mx-auto leading-relaxed">
            Switch to sustainable oral care and join thousands who’ve made the
            planet-friendly choice.
          </p>

          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              "30-day money back guarantee",
              "Free worldwide shipping",
              "Eco-certified materials",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/70 px-5 py-3 rounded-full shadow-sm border border-primary/20 backdrop-blur-sm transition-all hover:bg-primary-light/30"
              >
                <div className="w-7 h-7 bg-primary flex items-center justify-center rounded-full shadow-md">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-700 text-sm">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="group relative bg-primary text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="flex items-center justify-center gap-2">
              <Leaf className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              Start Your Eco Journey
            </span>
            {/* Gradient glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-light to-primary-dark opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
