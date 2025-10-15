"use client";

import { Sparkles, Leaf, ArrowRight } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const HeroSection = () => {
  const { content } = useContent();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-background-cream border border-primary-light px-4 py-2 rounded-full text-sm font-medium text-primary shadow-soft">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              {content.hero.badge}
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-notulen font-black text-foreground leading-tight tracking-tight">
                {content.hero.title}
                <span className="block text-primary italic font-eurotypo font-normal">
                  {content.hero.subtitle}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {content.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="group relative inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-2 rounded-xl font-bold overflow-hidden transition-all hover:shadow-eco">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
              <button className="group inline-flex items-center justify-center gap-2 bg-transparent text-primary px-8 py-2 rounded-xl font-bold border-2 border-primary hover:bg-primary-foreground transition-all">
                <Leaf className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Sustainable
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  5K+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Products
                </div>
              </div>
            </div>
          </div>

          {/* Right Image - 5 columns */}
          <div className="lg:col-span-5 relative">
            {/* Floating Card Effect */}
            <div className="relative">
              {/* Main Image */}
              <div className="p-5 bg-primary-light rounded-3xl">
                <div className="relative bg-card rounded-3xl shadow-eco">
                  <img
                    src={content.hero.heroImage}
                    alt={`${content.hero.title} ${content.hero.subtitle}`}
                    className="w-full h-auto object-cover rounded-2xl"
                  />

                  {/* Floating Badge on Image */}
                  <div className="absolute -bottom-6 -left-6 bg-background-cream border border-border rounded-2xl p-4 shadow-eco">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-lighter rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          Eco-Certified
                        </div>
                        <div className="text-xs text-muted-foreground">
                          100% Natural
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-16 bg-primary rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-foreground/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-primary-foreground mb-1">
                  Why Bamboo?
                </h3>
                <p className="text-primary-foreground/90 text-sm max-w-2xl">
                  Bamboo grows quickly, requires no pesticides, and naturally
                  biodegrades. It's nature's gift to a greener tomorrow.
                </p>
              </div>
            </div>
            <button className="whitespace-nowrap bg-primary-foreground text-primary px-6 py-3 rounded-xl font-bold hover:bg-background-cream transition-all shadow-soft hover:shadow-eco">
              Discover Benefits
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
