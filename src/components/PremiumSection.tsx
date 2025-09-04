import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaStar, FaLeaf, FaCheck, FaHeart } from "react-icons/fa";
import { Product } from "@/types";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const premiumProducts: Product[] = [
  {
    id: "natural-premium",
    name: "Natural Bamboo Premium",
    price: 12.99,
    originalPrice: 18.99,
    description: "Handcrafted bamboo toothbrush with ultra-soft natural bristles",
    image: product1,
    features: ["Natural bristles", "Ergonomic handle", "Antimicrobial"],
    specifications: [],
    isPremium: true
  },
  {
    id: "mint-premium",
    name: "Mint Fresh Premium",
    price: 14.99,
    originalPrice: 21.99,
    description: "Mint-infused bamboo handle with charcoal-infused bristles",
    image: product2,
    features: ["Charcoal bristles", "Mint infusion", "Fresh breath"],
    specifications: [],
    isPremium: true
  },
  {
    id: "charcoal-premium",
    name: "Charcoal Black Premium",
    price: 16.99,
    originalPrice: 24.99,
    description: "Activated charcoal toothbrush for superior whitening power",
    image: product3,
    features: ["Whitening power", "Charcoal infused", "Deep clean"],
    specifications: [],
    isPremium: true
  }
];

export const PremiumSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaStar className="text-yellow-400 text-xl" />
            <span className="text-primary font-semibold">Premium Collection</span>
            <FaStar className="text-yellow-400 text-xl" />
          </div>
          <h2 className="text-4xl font-bold text-foreground-eco mb-4">
            Premium Eco-Friendly Toothbrushes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Elevate your oral care routine with our premium collection featuring advanced eco-friendly materials and superior performance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden shadow-soft hover:shadow-eco transition-all duration-300 bg-card-cream border-primary/10">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                    Premium
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-semibold">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground-eco mb-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                    <span className="text-muted-foreground text-sm ml-2">(4.9)</span>
                  </div>

                  <div className="space-y-2">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {featureIndex === 0 && <FaLeaf className="text-primary text-xs" />}
                          {featureIndex === 1 && <FaCheck className="text-primary text-xs" />}
                          {featureIndex === 2 && <FaHeart className="text-primary text-xs" />}
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground line-through text-sm">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button variant="premium" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="eco-outline" size="lg">
            View All Premium Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
};