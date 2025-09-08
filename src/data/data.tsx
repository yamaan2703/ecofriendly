import {
  Feather,
  Leaf,
  Package,
  Recycle,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "home" },
  { label: "Benefits", href: "benefits" },
  { label: "Features", href: "features" },
  { label: "Products", href: "products" },
  { label: "FAQ", href: "faq" },
];

export const benefits = [
  {
    icon: Leaf,
    title: "100% Natural Bamboo",
    description:
      "Made from sustainably sourced bamboo that's completely biodegradable",
  },
  {
    icon: Users,
    title: "Perfect for Families",
    description:
      "Pack of 10 toothbrushes - ideal for the whole family or extended personal use",
  },
  {
    icon: Shield,
    title: "100% FBR Compliant",
    description:
      "Certified solution ensuring compliance with Pakistan's tax regulations.",
  },
  {
    icon: Recycle,
    title: "Eco-Friendly",
    description:
      "Reduces plastic waste by 95% compared to traditional plastic toothbrushes",
  },
];

export const features = [
  {
    title: "Charcoal-Infused Bristles",
    description:
      "Deep cleaning power with natural whitening properties that remove plaque effectively while being gentle on your gums.",
    image: "/images/Artboard_2.png",
    icon: <Sparkles className="size-4" />,
    benefits: ["Natural whitening", "Plaque removal", "Gentle on gums"],
  },
  {
    title: "Ergonomic Handle Design",
    description:
      "Comfortable bamboo grip designed for optimal control and comfort during your daily brushing routine.",
    image: "/images/brush.png",
    icon: <Shield className="size-4" />,
    benefits: ["Perfect grip", "Comfortable hold", "Better control"],
  },
  {
    title: "Travel-Friendly & Lightweight",
    description:
      "Perfect size for travel with eco-friendly packaging that fits easily in your luggage or bag.",
    image: "/images/brush_set.png",
    icon: <Feather className="size-4" />,
    benefits: ["Ultra lightweight", "Compact design", "Travel ready"],
  },
  {
    title: "Splinter-Free Finish",
    description:
      "Expertly polished bamboo handles ensure safe, splinter-free, and comfortable brushing experience every day.",
    image: "/images/Artboard_1.png",
    icon: <Package className="size-4" />,
    benefits: ["Smooth finish", "Safe usage", "Long lasting"],
  },
];

export const features2 = [
  {
    title: "Soft & BPA-Free Bristles",
    description: "Gentle on gums while providing effective cleaning",
    position: "top-left",
  },
  {
    title: "Charcoal-Infused Bristles",
    description: "Deep cleaning power with natural whitening",
    position: "top-right",
  },
  {
    title: "Ergonomic Handle",
    description: "Comfortable grip for better control",
    position: "bottom-left",
  },
  {
    title: "Eco-Friendly & Biodegradable",
    description: "100% sustainable bamboo material",
    position: "center-right",
  },
  {
    title: "Lightweight",
    description: "Perfect for travel and daily use",
    position: "bottom-right",
  },
];

export const features3 = [
  {
    icon: "/images/earth.svg",
    label: "Eco Friendly",
    description: "100% sustainable materials",
  },
  {
    icon: "/images/Bristles.svg",
    label: "Super Soft",
    description: "Gentle on sensitive gums",
  },
  {
    icon: "/images/plastic.svg",
    label: "Plastic Free",
    description: "Zero plastic packaging",
  },
  {
    icon: "/images/Biodegradable.svg",
    label: "30 Days Return",
    description: "Risk-free guarantee",
  },
];
