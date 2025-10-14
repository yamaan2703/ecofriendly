import React from "react";
import { Mail } from "lucide-react";
import Button from "./Button/Button";
import { useContent } from "@/contexts/ContentContext";

function NewsLetter() {
  const { content } = useContent();
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto bg-primary-lighter rounded-3xl p-8 lg:p-12 shadow-soft">
          <div className="text-center space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-eurotypo">
                Subscribe Our{" "}
                <span className="text-primary italic">Newsletter</span>
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Be the first to know about new arrivals, exclusive deals, and
                sustainable living tips.{" "}
                <span className="font-semibold text-primary">
                  Join 10,000+ eco-warriors!
                </span>
              </p>
            </div>

            {/* Newsletter Form */}
            <form className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-3 rounded-lg text-foreground placeholder-muted-foreground bg-card border-2 border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    required
                  />
                </div>
                <Button
                  variant="solid"
                  size="sm"
                  className="text-base py-3 px-6 whitespace-nowrap"
                >
                  {content.newsletter.buttonText}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
