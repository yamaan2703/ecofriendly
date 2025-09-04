import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaLeaf, FaRecycle, FaHeart } from "react-icons/fa";
import heroImage from "@/assets/hero-toothbrush.jpg";

export const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-subtle pt-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 items-center min-h-[80vh]">
          {/* Left Text */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-primary">
              <FaLeaf className="text-xl" />
              <span className="font-semibold">100% Natural</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground-eco">
              Sustainable Oral Care for a Better Tomorrow
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Made from sustainably sourced bamboo, our toothbrushes provide superior cleaning while protecting the environment.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <FaRecycle className="text-lg" />
              <span className="text-sm">Biodegradable Handle</span>
            </div>
          </motion.div>

          {/* Center Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Premium Eco-friendly Toothbrush"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-20 h-20 border border-primary/20 rounded-full opacity-30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-5 -left-5 w-16 h-16 border border-primary/20 rounded-full opacity-20"
            />
          </motion.div>

          {/* Right Text */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center lg:text-left">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-4xl lg:text-5xl font-bold text-foreground-eco mb-4"
              >
                Clean
                <span className="text-primary"> Smile</span>
                <br />
                Clean
                <span className="text-primary"> Planet</span>
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-lg text-muted-foreground mb-8 leading-relaxed"
              >
                Experience premium oral care with our eco-friendly bamboo toothbrushes. Every purchase helps reduce plastic waste.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="space-y-4"
              >
                <Button variant="hero" size="lg" className="w-full lg:w-auto">
                  Shop Now
                </Button>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
                  <FaHeart className="text-lg" />
                  <span className="text-sm">Loved by 10,000+ customers</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};