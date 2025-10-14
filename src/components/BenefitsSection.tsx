import React from "react";
import { Check, Smile } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const BenefitsSection: React.FC = () => {
  const { content } = useContent();
  return (
    <section id="benefits" className="py-20 relative overflow-hidden">
      {/* Decorative Leaves */}
      <div className="absolute left-0 bottom-0 w-64 h-64 lg:w-96 lg:h-96 opacity-40 pointer-events-none">
        <img
          src="/images/leaves_1.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute right-0 top-0 w-64 h-64 lg:w-96 lg:h-96 opacity-40 pointer-events-none">
        <img
          src="/images/leaf_2.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 text-3xl sm:text-4xl lg:text-5xl mb-4">
            <span className="text-foreground font-eurotypo font-bold">
              {content.benefits.title}
            </span>
            <Smile className="w-10 h-10 text-primary" />
            <span className="text-primary font-bold font-eurotypo italic">
              {content.benefits.subtitle}
            </span>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {content.benefits.items.map((benefit, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-eco transition-shadow"
            >
              <div className="space-y-4">
                {/* Icon and Title */}
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    {typeof benefit.icon === "string" ? (
                      <img
                        src={benefit.icon}
                        alt={benefit.title}
                        className="w-7 h-7 object-contain"
                      />
                    ) : (
                      <benefit.icon className="w-7 h-7 text-primary-foreground" />
                    )}
                  </div>

                  <h3 className="text-xl font-eurotypo font-bold text-primary leading-tight pt-2">
                    {benefit.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary-lighter border-l-4 border-primary rounded-xl p-8 shadow-soft">
            <h3 className="text-2xl sm:text-3xl font-eurotypo font-bold text-primary mb-4 text-center">
              Ready to Make the Switch?
            </h3>
            <p className="text-muted-foreground mb-8 text-center text-lg">
              Join thousands of customers who have chosen a more sustainable way
              to care for their teeth.
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-foreground">
              <span className="flex items-center gap-2 font-medium">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                30-day money back guarantee
              </span>
              <span className="flex items-center gap-2 font-medium">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                Free shipping
              </span>
              <span className="flex items-center gap-2 font-medium">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                Eco-certified materials
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
