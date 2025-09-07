import ProductSection from "@/components/ProductsSection";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductDetailingSection from "@/components/ProductDetailSection";
import HeroSection from "@/components/HeroSection";
import ProductSpecSection from "@/components/SpecificationSection";
import ProductShowcaseSection from "@/components/ProductShowcaseSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsLetter from "@/components/NewsLetter";

const Index = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(to bottom, #FDFDEA 0%, #FDFDEA 60%, #FEFEF5 75%, #FFFFFF 80%)",
      }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <ProductSection />
        <BenefitsSection />
        <FeaturesSection />
        <ProductDetailingSection />
        <ProductSpecSection />
        <ProductShowcaseSection />
        <NewsLetter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
