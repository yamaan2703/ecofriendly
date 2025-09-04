import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FaLeaf, FaRuler, FaWeight, FaCog, FaCheck, FaRecycle } from "react-icons/fa";

const specifications = [
  {
    category: "Materials",
    icon: FaLeaf,
    items: [
      { label: "Handle Material", value: "100% Sustainable Moso Bamboo" },
      { label: "Bristle Material", value: "BPA-Free Nylon (Recyclable)" },
      { label: "Bristle Hardness", value: "Soft to Medium" },
      { label: "Handle Finish", value: "Natural Water-Based Coating" }
    ]
  },
  {
    category: "Dimensions",
    icon: FaRuler,
    items: [
      { label: "Total Length", value: "19.5 cm (7.7 inches)" },
      { label: "Head Length", value: "2.5 cm (1 inch)" },
      { label: "Head Width", value: "1.2 cm (0.5 inches)" },
      { label: "Handle Diameter", value: "1.1 cm (0.43 inches)" }
    ]
  },
  {
    category: "Performance",
    icon: FaCog,
    items: [
      { label: "Cleaning Efficiency", value: "99.7% Plaque Removal" },
      { label: "Bristle Count", value: "2,500+ Premium Bristles" },
      { label: "Brush Life", value: "3-4 Months Regular Use" },
      { label: "Antimicrobial", value: "Natural Bamboo Properties" }
    ]
  },
  {
    category: "Sustainability",
    icon: FaRecycle,
    items: [
      { label: "Biodegradable Handle", value: "100% Compostable in 6 months" },
      { label: "Plastic Reduction", value: "95% less plastic vs traditional" },
      { label: "Carbon Footprint", value: "60% lower than plastic brushes" },
      { label: "Packaging", value: "100% Recyclable Kraft Paper" }
    ]
  },
  {
    category: "Physical Properties",
    icon: FaWeight,
    items: [
      { label: "Weight", value: "15 grams (0.53 oz)" },
      { label: "Density", value: "0.6-0.8 g/cm³" },
      { label: "Moisture Content", value: "6-12%" },
      { label: "Hardness", value: "40-50 HB (Brinell)" }
    ]
  },
  {
    category: "Certifications",
    icon: FaCheck,
    items: [
      { label: "FDA Approved", value: "Food Grade Materials" },
      { label: "FSC Certified", value: "Responsible Forest Management" },
      { label: "BPA Free", value: "No Harmful Chemicals" },
      { label: "Vegan Certified", value: "Cruelty-Free Production" }
    ]
  }
];

export const SpecificationSection = () => {
  return (
    <section className="py-20 bg-background-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground-eco mb-4">
            Technical Specifications
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive details about our eco-friendly bamboo toothbrush design, materials, and performance characteristics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specifications.map((spec, index) => (
            <motion.div
              key={spec.category}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full bg-background shadow-soft hover:shadow-eco transition-all duration-300 border-primary/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <spec.icon className="text-primary text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground-eco">
                    {spec.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {spec.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: (index * 0.1) + (itemIndex * 0.05) }}
                      viewport={{ once: true }}
                      className="flex justify-between items-start gap-4 py-2 border-b border-border/50 last:border-b-0"
                    >
                      <span className="text-sm font-medium text-foreground-eco flex-shrink-0">
                        {item.label}:
                      </span>
                      <span className="text-sm text-muted-foreground text-right">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-8 bg-gradient-eco rounded-2xl text-primary-foreground"
        >
          <h3 className="text-2xl font-bold mb-4">Quality Guarantee</h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Every Ecofriendly toothbrush undergoes rigorous quality testing to ensure superior performance 
            and environmental standards. We stand behind our products with a 30-day satisfaction guarantee.
          </p>
        </motion.div>
      </div>
    </section>
  );
};