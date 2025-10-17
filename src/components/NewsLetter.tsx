import React, { useState } from "react";
import { Mail, CheckCircle, Leaf, Sparkles } from "lucide-react";
import Button from "./Button/Button";
import { useContent } from "@/contexts/ContentContext";
import { SiMinutemailer } from "react-icons/si";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

function NewsLetter() {
  const { content } = useContent();
  const { user, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Check if user is logged in
    if (!isAuthenticated || !user) {
      toast.error("Please login to subscribe to our newsletter");
      return;
    }

    // Check if the entered email matches the logged-in user's email
    if (email.toLowerCase() !== user.email.toLowerCase()) {
      toast.error("Please use the email address associated with your account");
      return;
    }

    setIsLoading(true);

    try {
      // Check if user exists with this email
      const { data: userData, error: fetchError } = await supabase
        .from("users")
        .select("id, email, is_newsletter")
        .eq("email", email)
        .single();

      if (fetchError) {
        if (fetchError.code === "PGRST116") {
          toast.error(
            "No account found with this email. Please sign up first."
          );
        } else {
          toast.error("Failed to process your request. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      // Check if already subscribed
      if (userData.is_newsletter) {
        toast.success("You're already subscribed to our newsletter!");
        setEmail("");
        setIsLoading(false);
        return;
      }

      // Update is_newsletter to true
      const { error: updateError } = await supabase
        .from("users")
        .update({ is_newsletter: true })
        .eq("id", userData.id);

      if (updateError) {
        toast.error("Failed to subscribe. Please try again.");
        setIsLoading(false);
        return;
      }

      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background relative">
      <div className="absolute left-0 top-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 z-0 pointer-events-none">
        <img
          src="/images/leaf_1.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-left"
        />
      </div>
      <div className="container mx-auto max-w-5xl">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-[#DCE7C8] rounded-3xl p-6 text-center shadow-2xl overflow-hidden backdrop-blur-md border border-primary/10">
            {/* Subtle background decorative blur */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-70 pointer-events-none" />

            {/* Heading */}
            <h3 className="text-4xl font-extrabold text-primary-dark mb-4 font-eurotypo italic drop-shadow-sm flex items-center justify-center gap-5">
              Subscribe Our{" "}
              <span className="text-primary italic">Newsletter</span>{" "}
              <SiMinutemailer className="size-10 mt-2 text-primary" />
            </h3>

            {/* Subtitle */}
            <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
              Be the first to know about new arrivals, exclusive deals, and
              sustainable living tips.{" "}
              <span className="font-bold text-primary">
                Join 10,000+ eco-warriors!
              </span>
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-10">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 rounded-lg text-foreground placeholder-muted-foreground bg-white border-2 border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-lg"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  variant="solid"
                  size="sm"
                  className="text-base py-2 px-8 whitespace-nowrap shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  disabled={isLoading}
                >
                  <Sparkles className="w-4 h-4" />
                  {isLoading ? "Subscribing..." : content.newsletter.buttonText}
                </Button>
              </div>
            </form>

            {/* Features List */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["Weekly Updates", "Exclusive Offers", "Eco Tips"].map(
                (feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/70 px-8 py-2 rounded-full shadow-sm border border-primary/20 backdrop-blur-sm transition-all hover:bg-primary-light/30"
                  >
                    <div className="w-7 h-7 bg-primary flex items-center justify-center rounded-full shadow-md">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700 text-sm">
                      {feature}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
