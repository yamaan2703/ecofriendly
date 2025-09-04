import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaLeaf, FaRecycle, FaCheck, FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import ecoLeavesImage from "@/assets/eco-leaves.jpg";
import heroToothbrush from "@/assets/hero-toothbrush.jpg";

const productFeatures = [
  {
    icon: FaLeaf,
    title: "100% Natural Bamboo",
    description: "Sustainably sourced bamboo handle that's completely biodegradable"
  },
  {
    icon: FaRecycle,
    title: "Eco-Friendly",
    description: "Reduces plastic waste by 95% compared to traditional toothbrushes"
  },
  {
    icon: FaCheck,
    title: "Antimicrobial",
    description: "Natural antimicrobial properties keep your toothbrush hygienic"
  },
  {
    icon: FaHeart,
    title: "Gentle on Gums",
    description: "Soft natural bristles provide effective cleaning without irritation"
  }
];

export const ProductDetailSection = () => {
  return (
    <section className="py-20 bg-gradient-cream">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-eco">
              <img
                src={heroToothbrush}
                alt="Premium Eco-Friendly Toothbrush Detail"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
            
            {/* Floating eco elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-24 h-24 opacity-20"
            >
              <img src={ecoLeavesImage} alt="Eco leaves" className="w-full h-full object-cover rounded-full" />
            </motion.div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaLeaf className="text-primary text-xl" />
                <span className="text-primary font-semibold">Eco-Friendly Choice</span>
              </div>
              
              <h2 className="text-4xl font-bold text-foreground-eco mb-4">
                The Future of
                <span className="text-primary"> Oral Care</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our premium bamboo toothbrush combines traditional craftsmanship with modern oral care technology. 
                Each brush is carefully designed to provide superior cleaning while minimizing environmental impact.
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <span className="text-muted-foreground">4.9/5 from 2,847 reviews</span>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {productFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-4 h-full bg-background/80 border-primary/10 hover:shadow-soft transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <feature.icon className="text-primary text-lg" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground-eco mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <Button variant="hero" size="lg" className="flex-1">
                <FaShoppingCart className="mr-2" />
                Order Now - $24.99
              </Button>
              <Button variant="eco-outline" size="lg">
                Learn More
              </Button>
            </motion.div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-1">
                <FaCheck className="text-primary" />
                <span>30-day guarantee</span>
              </div>
              <div className="flex items-center gap-1">
                <FaRecycle className="text-primary" />
                <span>Free shipping</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};