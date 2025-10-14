// "use client";

// import React from "react";
// import { Play } from "lucide-react";
// import { motion } from "framer-motion";
// import { useContent } from "@/contexts/ContentContext";

// const HeroSection: React.FC = () => {
//   const { content } = useContent();
//   return (
//     <section
//       id="home"
//       className="relative min-h-screen flex items-center overflow-hidden pt-10"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
//         {/* Left Content */}
//         <motion.div
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left"
//         >
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//           >
//             <span className="inline-block bg-[#E7F0CE] text-eco-green text-sm sm:text-base font-semibold px-4 py-1.5 rounded-full shadow-sm animate-bounce">
//               {content.hero.badge}
//             </span>
//           </motion.div>

//           <motion.h1
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             className="text-4xl sm:text-5xl lg:text-6xl font-notulen font-black text-[#005655] leading-tight"
//           >
//             {content.hero.title}
//           </motion.h1>

//           <motion.h2
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.7 }}
//             className="text-4xl font-eurotypo italic text-eco-charcoal"
//           >
//             {content.hero.subtitle}
//           </motion.h2>

//           <motion.p
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.9 }}
//             className="text-base sm:text-lg text-eco-charcoal leading-relaxed max-w-md mx-auto lg:mx-0 mt-2"
//           >
//             {content.hero.description}
//           </motion.p>
//         </motion.div>

//         {/* Center Image */}
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
//           className="lg:col-span-4 flex justify-center relative"
//         >
//           <motion.div
//             className="relative w-72 sm:w-80 lg:w-[22rem] group"
//             whileHover={{ scale: 1.02 }}
//             transition={{ duration: 0.3 }}
//           >
//             <motion.div
//               className="absolute inset-0 bg-eco-green rounded-3xl shadow-xl border-4 border-[#A0C474] bg-[#A0C474]"
//               initial={{ rotate: 6 }}
//               animate={{ rotate: 6 }}
//               whileHover={{
//                 rotate: 8,
//                 scale: 1.05,
//                 x: 5,
//                 y: -5,
//               }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//             ></motion.div>

//             <motion.img
//               src={content.hero.heroImage}
//               alt={`${content.hero.title} ${content.hero.subtitle}`}
//               width={800}
//               height={800}
//               className="relative rounded-2xl shadow-2xl object-cover z-10 bg-[#E7F0CE]"
//               whileHover={{
//                 scale: 1.03,
//                 rotate: 1,
//               }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//             />
//           </motion.div>
//         </motion.div>

//         {/* Right Side Info */}
//         <motion.div
//           initial={{ x: 100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
//           className="lg:col-span-3 flex flex-col justify-center gap-6 text-center lg:text-right"
//         >
//           <motion.div
//             className="bg-[#E7F0CE] p-6 rounded-2xl shadow-md cursor-pointer"
//             whileHover={{
//               scale: 1.05,
//               y: -5,
//               boxShadow:
//                 "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//             }}
//             whileTap={{ scale: 0.98 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//           >
//             <motion.h3
//               className="text-eco-dark font-eurotypo font-black text-xl sm:text-2xl mb-2"
//               whileHover={{ color: "#005655" }}
//               transition={{ duration: 0.2 }}
//             >
//               Why Bamboo?
//             </motion.h3>
//             <p className="text-sm sm:text-base text-eco-charcoal leading-relaxed">
//               Bamboo grows quickly, requires no pesticides, and naturally
//               biodegrades. It's nature's gift to a greener tomorrow.
//             </p>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";

// import React from "react";
// import { useContent } from "@/contexts/ContentContext";
// import { Sparkles } from "lucide-react";

// const HeroSection: React.FC = () => {
//   const { content } = useContent();
//   return (
//     <section
//       id="home"
//       className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-12">
//         {/* Main Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//           {/* Left Content */}
//           <div className="flex flex-col space-y-6 text-center lg:text-left">
//             {/* Badge */}
//             <div className="flex justify-center lg:justify-start">
//               <span className="inline-flex items-center gap-2 bg-primary-lighter text-primary px-5 py-2 rounded-full text-sm font-semibold shadow-soft">
//                 <Sparkles className="w-4 h-4" />
//                 {content.hero.badge}
//               </span>
//             </div>

//             {/* Main Heading */}
//             <div className="space-y-2">
//               <h1 className="text-5xl sm:text-6xl lg:text-7xl font-notulen font-black text-primary leading-tight">
//                 {content.hero.title}
//               </h1>
//               <h2 className="text-4xl sm:text-5xl lg:text-6xl font-eurotypo italic text-foreground-eco">
//                 {content.hero.subtitle}
//               </h2>
//             </div>

//             {/* Description */}
//             <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
//               {content.hero.description}
//             </p>

//             {/* Info Card */}
//             <div className="bg-primary-lighter border-l-4 border-primary p-6 rounded-lg max-w-xl mx-auto lg:mx-0">
//               <h3 className="text-primary font-eurotypo font-bold text-xl mb-2">
//                 Why Bamboo?
//               </h3>
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 Bamboo grows quickly, requires no pesticides, and naturally
//                 biodegrades. It's nature's gift to a greener tomorrow.
//               </p>
//             </div>
//           </div>

//           {/* Right Image */}
//           <div className="flex justify-center lg:justify-end">
//             <div className="relative w-full max-w-md lg:max-w-lg">
//               {/* Decorative Background */}
//               <div className="absolute -top-4 -right-4 w-full h-full bg-primary-lighter rounded-3xl opacity-50"></div>

//               {/* Main Image Container */}
//               <div className="relative bg-background-cream rounded-3xl p-8 shadow-eco">
//                 <img
//                   src={content.hero.heroImage}
//                   alt={`${content.hero.title} ${content.hero.subtitle}`}
//                   width={800}
//                   height={800}
//                   className="w-full h-auto object-contain rounded-2xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

"use client";

import { Sparkles, Leaf, ArrowRight } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const HeroSection = () => {
  const { content } = useContent();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-background-cream border border-primary-light px-4 py-2 rounded-full text-sm font-medium text-primary shadow-soft">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              {content.hero.badge}
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-notulen font-black text-foreground leading-tight tracking-tight">
                {content.hero.title}
                <span className="block text-primary italic font-eurotypo font-normal">
                  {content.hero.subtitle}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {content.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="group relative inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-2 rounded-xl font-bold overflow-hidden transition-all hover:shadow-eco">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
              <button className="group inline-flex items-center justify-center gap-2 bg-transparent text-primary px-8 py-2 rounded-xl font-bold border-2 border-primary hover:bg-primary-foreground transition-all">
                <Leaf className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Sustainable
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  5K+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Products
                </div>
              </div>
            </div>
          </div>

          {/* Right Image - 5 columns */}
          <div className="lg:col-span-5 relative">
            {/* Floating Card Effect */}
            <div className="relative">
              {/* Main Image */}
              <div className="p-5 bg-primary-light rounded-3xl">
                <div className="relative bg-card rounded-3xl shadow-eco">
                  <img
                    src={content.hero.heroImage}
                    alt={`${content.hero.title} ${content.hero.subtitle}`}
                    className="w-full h-auto object-cover rounded-2xl"
                  />

                  {/* Floating Badge on Image */}
                  <div className="absolute -bottom-6 -left-6 bg-background-cream border border-border rounded-2xl p-4 shadow-eco">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-lighter rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          Eco-Certified
                        </div>
                        <div className="text-xs text-muted-foreground">
                          100% Natural
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-16 bg-primary rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-foreground/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-primary-foreground mb-1">
                  Why Bamboo?
                </h3>
                <p className="text-primary-foreground/90 text-sm max-w-2xl">
                  Bamboo grows quickly, requires no pesticides, and naturally
                  biodegrades. It's nature's gift to a greener tomorrow.
                </p>
              </div>
            </div>
            <button className="whitespace-nowrap bg-primary-foreground text-primary px-6 py-3 rounded-xl font-bold hover:bg-background-cream transition-all shadow-soft hover:shadow-eco">
              Discover Benefits
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
