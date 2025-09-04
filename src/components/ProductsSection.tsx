import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { Product, ProductGallery } from "@/types";
import mainProductImage from "@/assets/main-product.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const productData: Product = {
  id: "eco-brush-set",
  name: "Premium Bamboo Toothbrush Set",
  price: 24.99,
  originalPrice: 34.99,
  description: "A complete set of eco-friendly bamboo toothbrushes with natural bristles. Perfect for the whole family.",
  image: mainProductImage,
  features: [
    "100% Biodegradable bamboo handle",
    "Soft natural bristles",
    "Ergonomic design",
    "Antimicrobial properties"
  ],
  specifications: [
    { label: "Material", value: "Sustainable Bamboo" },
    { label: "Bristles", value: "Natural Soft Bristles" },
    { label: "Length", value: "19cm" },
    { label: "Weight", value: "15g" }
  ]
};

const thumbnails = [
  { id: "natural", image: product1, color: "Natural Bamboo" },
  { id: "mint", image: product2, color: "Mint Green" },
  { id: "charcoal", image: product3, color: "Charcoal Black" },
];

export const ProductsSection = () => {
  const [selectedImage, setSelectedImage] = useState(mainProductImage);
  const [selectedColor, setSelectedColor] = useState("Complete Set");

  return (
    <section className="py-20 bg-background-cream" id="products">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground-eco mb-4">
            Our Eco-Friendly Collection
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our range of sustainable bamboo toothbrushes designed for superior oral care and environmental protection.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Gallery */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl bg-background shadow-soft">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt="Product"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-96 object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedImage(mainProductImage);
                  setSelectedColor("Complete Set");
                }}
                className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                  selectedImage === mainProductImage
                    ? "border-primary shadow-glow"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={mainProductImage}
                  alt="Complete Set"
                  className="w-20 h-20 object-cover"
                />
              </motion.button>

              {thumbnails.map((thumb) => (
                <motion.button
                  key={thumb.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedImage(thumb.image);
                    setSelectedColor(thumb.color);
                  }}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                    selectedImage === thumb.image
                      ? "border-primary shadow-glow"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={thumb.image}
                    alt={thumb.color}
                    className="w-20 h-20 object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <motion.p
                key={selectedColor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-primary font-semibold mb-2"
              >
                {selectedColor}
              </motion.p>
              <h3 className="text-3xl font-bold text-foreground-eco mb-4">
                {productData.name}
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">
                  ${productData.price}
                </span>
                {productData.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${productData.originalPrice}
                  </span>
                )}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                  <span className="text-muted-foreground text-sm ml-2">(128 reviews)</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {productData.description}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground-eco">Key Features:</h4>
              <ul className="space-y-2">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 pt-6">
              <Button variant="hero" size="lg" className="flex-1">
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </Button>
              <Button variant="eco-outline" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};