import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductsSection } from "@/components/ProductsSection";
import { PremiumSection } from "@/components/PremiumSection";
import { ProductDetailSection } from "@/components/ProductDetailSection";
import { SpecificationSection } from "@/components/SpecificationSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ProductsSection />
        <PremiumSection />
        <ProductDetailSection />
        <SpecificationSection />
      </main>
    </div>
  );
};

export default Index;
