import React from "react";
import {
  Check,
  Leaf,
  Shield,
  Heart,
  Star,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const BenefitsSection: React.FC = () => {
  const { content } = useContent();
  return (
    <section
      id="benefits"
      className="py-24 bg-gradient-to-b from-background to-background-cream/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl font-bold text-foreground mb-6 font-notulen leading-tight">
                {content.benefits.title}
                <span className="block text-primary">
                  {content.benefits.subtitle}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover why thousands of customers choose our eco-friendly
                products for a healthier lifestyle and a better planet.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-6">
              {content.benefits.items.slice(0, 3).map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-lighter rounded-xl flex items-center justify-center flex-shrink-0">
                    {typeof benefit.icon === "string" ? (
                      <img
                        src={benefit.icon}
                        alt={benefit.title}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <benefit.icon className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="bg-primary hover:bg-primary-light text-primary-foreground font-bold py-4 px-8 rounded-xl flex items-center gap-3 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              <Leaf className="w-6 h-6" />
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                {content.benefits.items.slice(0, 4).map((benefit, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-background-cream rounded-2xl"
                  >
                    <div className="w-16 h-16 bg-primary-lighter rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {typeof benefit.icon === "string" ? (
                        <img
                          src={benefit.icon}
                          alt={benefit.title}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <benefit.icon className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <h4 className="font-bold text-foreground mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              100% Eco-Friendly
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Certified Quality
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Eco-Friendly</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-muted-foreground">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                30 Days
              </div>
              <div className="text-muted-foreground">Money Back</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
