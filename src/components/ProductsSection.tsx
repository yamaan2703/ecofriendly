// "use client";
// import React, { useState, useEffect } from "react";
// import { IoIosStar } from "react-icons/io";
// import { Plus, Minus } from "lucide-react";
// import Button from "./Button/Button";
// import { useContent } from "@/contexts/ContentContext";
// import { useCart } from "@/contexts/CartContext";
// import { useAuth } from "@/contexts/AuthContext";
// import { useToast } from "@/hooks/use-toast";
// import { supabase } from "@/lib/supabase";

// // Product interface based on actual Supabase data structure
// interface Product {
//   id: number;
//   product_name: string;
//   product_description: string;
//   actual_price: number;
//   discounted_price: number;
//   product_images: string[];
//   category: string;
//   quantity: number;
//   status: boolean;
//   created_at: string;
//   updated_at: string;
// }

// const ProductSection: React.FC = () => {
//   const { content, currentPage } = useContent();
//   const { addToCart } = useCart();
//   const { isAuthenticated } = useAuth();
//   const { toast } = useToast();
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   const currentCategory = currentPage === "home1" ? "Toothbrush" : "Dishwasher";

//   console.log("ProductsSection: currentPage =", currentPage);
//   console.log("ProductsSection: currentCategory =", currentCategory);

//   const productImages =
//     products.length > 0 && products[0].product_images
//       ? products[0].product_images
//       : content.productImages;

//   const getImageUrl = (filename: string) => {
//     // Remove any leading slashes or "product-images/" prefix from filename
//     const cleanFilename = filename
//       .replace(/^\/+/, "")
//       .replace(/^product-images\//, "");
//     return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/${cleanFilename}`;
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("products")
//           .select("*")
//           .eq("status", true)
//           .eq("category", currentCategory)
//           .order("created_at", { ascending: false });

//         if (error) {
//           console.error("❌ Error fetching products:", error.message);
//           return;
//         }

//         if (!data || data.length === 0) {
//           console.warn(
//             `⚠️ No ${currentCategory} products found in Supabase table.`
//           );
//         } else {
//           data.forEach((product: any, index: number) => {
//             // Log image details like admin panel
//             if (product.product_images && product.product_images.length > 0) {
//               console.log(
//                 `🖼️ Product ${index + 1} images:`,
//                 product.product_images
//               );
//               product.product_images.forEach(
//                 (image: string, imgIndex: number) => {
//                   const imageUrl = getImageUrl(image);
//                   const img = new Image();
//                   img.onload = () =>
//                     console.log(`✅ Image ${imgIndex + 1} loaded successfully`);
//                   img.onerror = () => (img.src = imageUrl);
//                 }
//               );
//             }
//           });
//         }

//         setProducts((data as Product[]) || []);
//         // Debug price data
//         if (data && data.length > 0) {
//           console.log("💰 Price data from database:", {
//             actual_price: data[0]?.actual_price,
//             discounted_price: data[0]?.discounted_price,
//             product_name: data[0]?.product_name,
//           });
//         }
//       } catch (err) {
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [currentCategory]);

//   const incrementQuantity = () => setQuantity((prev) => prev + 1);
//   const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

//   const handleAddToCart = () => {
//     if (!isAuthenticated) {
//       toast({
//         title: "Login Required",
//         description: "Please login first to add products to cart.",
//         variant: "destructive",
//         duration: 4000,
//       });
//       return;
//     }

//     if (products.length > 0) {
//       const product = products[0];
//       addToCart(
//         {
//           id: product.id,
//           product_name: product.product_name,
//           product_description: product.product_description,
//           price: product.discounted_price,
//           product_images: product.product_images,
//           category: product.category,
//         },
//         quantity
//       );

//       toast({
//         title: "Added to Cart!",
//         description: `${product.product_name} (x${quantity}) has been added to your cart.`,
//         duration: 3000,
//       });

//       // Reset quantity to 1 after adding to cart
//       setQuantity(1);
//     }
//   };

//   return (
//     <main className="container mx-auto">
//       <section className="py-8 sm:py-8 lg:py-16 mx-0 sm:mx-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
//           <div className="mx-auto w-full sm:w-4/5">
//             <div className="sm:hidden bg-[#F3F7DE] rounded-2xl flex items-center justify-center h-[280px] mb-4">
//               <div className="relative w-full h-full">
//                 {productImages && productImages.length > 0 ? (
//                   <img
//                     src={getImageUrl(productImages[selectedImageIndex])}
//                     alt={
//                       products.length > 0
//                         ? products[0].product_name
//                         : "Bamboo Toothbrush"
//                     }
//                     width={1000}
//                     height={1000}
//                     className="object-contain w-full h-full"
//                     onError={(e) => {
//                       console.error(
//                         "Image failed to load:",
//                         getImageUrl(productImages[selectedImageIndex])
//                       );
//                       e.currentTarget.style.display = "none";
//                     }}
//                   />
//                 ) : (
//                   <div className="flex flex-col items-center justify-center text-gray-500">
//                     <div className="text-4xl mb-2">🖼️</div>
//                     <p className="text-sm">No images available</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex sm:hidden gap-2 overflow-x-auto pb-2">
//               {productImages.map((src, index) => (
//                 <div
//                   key={index}
//                   onClick={() => setSelectedImageIndex(index)}
//                   className={`flex-shrink-0 w-16 h-20 rounded-lg border-2 overflow-hidden cursor-pointer transition-colors ${
//                     selectedImageIndex === index
//                       ? "border-eco-green"
//                       : "border-gray-200 hover:border-eco-green"
//                   }`}
//                 >
//                   <img
//                     src={getImageUrl(src)}
//                     alt={`${
//                       products.length > 0
//                         ? products[0].product_name
//                         : "Toothbrush"
//                     } view ${index + 1}`}
//                     width={1000}
//                     height={1000}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       console.error(
//                         "Thumbnail image failed to load:",
//                         getImageUrl(src)
//                       );
//                       e.currentTarget.style.display = "none";
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="hidden sm:flex gap-3 md:gap-4 w-full max-w-2xl mx-auto lg:max-w-none">
//               <div className="flex flex-col gap-3 md:gap-4">
//                 {productImages.map((src, index) => (
//                   <div
//                     key={index}
//                     onClick={() => setSelectedImageIndex(index)}
//                     className={`w-16 h-20 md:w-20 md:h-24 rounded-lg border-2 overflow-hidden cursor-pointer transition-colors ${
//                       selectedImageIndex === index
//                         ? "border-eco-green"
//                         : "border-gray-200 hover:border-eco-green"
//                     }`}
//                   >
//                     <img
//                       src={getImageUrl(src)}
//                       alt={`${
//                         products.length > 0
//                           ? products[0].product_name
//                           : "Toothbrush"
//                       } view ${index + 1}`}
//                       width={1000}
//                       height={1000}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div className="flex-1 bg-[#F3F7DE] rounded-2xl flex items-center justify-center h-[300px] sm:h-[350px] md:h-[400px] lg:h-[430px]">
//                 <div className="relative w-full h-full">
//                   {productImages && productImages.length > 0 ? (
//                     <img
//                       src={getImageUrl(productImages[selectedImageIndex])}
//                       alt={
//                         products.length > 0
//                           ? products[0].product_name
//                           : "Bamboo Toothbrush"
//                       }
//                       width={1000}
//                       height={1000}
//                       className="object-contain w-full h-full"
//                     />
//                   ) : (
//                     <div className="flex flex-col items-center justify-center text-gray-500">
//                       <div className="text-4xl mb-2">🖼️</div>
//                       <p className="text-sm">No images available</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-3 sm:space-y-4 lg:space-y-3 w-full max-w-2xl mx-auto lg:max-w-none">
//             <h1 className="text-xl sm:text-2xl font-eurotypo font-bold text-[#005655] leading-tight">
//               {products.length > 0
//                 ? products[0].product_name
//                 : content.products.title}{" "}
//             </h1>

//             <div className="flex items-center gap-2 flex-wrap">
//               <div className="flex items-center gap-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <IoIosStar
//                     key={star}
//                     className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
//                   />
//                 ))}
//               </div>
//               <span className="text-xs text-eco-charcoal font-semibold">
//                 {content.reviews.count}
//               </span>
//             </div>

//             <div className="flex items-center gap-2 flex-wrap">
//               <span className="text-4xl font-bold text-[#005655]">
//                 $
//                 {products.length > 0
//                   ? products[0].discounted_price
//                   : content.products.price}
//               </span>
//               {products.length > 0 &&
//                 products[0].actual_price > products[0].discounted_price && (
//                   <span className="text-xl text-gray-500 line-through font-semibold">
//                     ${products[0].actual_price}
//                   </span>
//                 )}
//             </div>

//             <p className="text-xs sm:text-sm text-gray-500">
//               ({content.pricing.freeShipping})
//             </p>

//             <div className="flex flex-row gap-3 sm:gap-2 items-stretch sm:items-center">
//               <div className="flex items-center">
//                 <div className="flex items-center border-2 border-[#005655] rounded-full">
//                   <button
//                     onClick={decrementQuantity}
//                     disabled={quantity <= 1}
//                     className="p-1.5 sm:p-2 text-eco-charcoal cursor-pointer disabled:opacity-50"
//                   >
//                     <Minus className="size-5" />
//                   </button>
//                   <span className="px-3 sm:px-4 py-1.5 sm:py-2 min-w-[2.5rem] sm:min-w-[3rem] text-center font-semibold text-eco-charcoal text-sm sm:text-base">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={incrementQuantity}
//                     className="p-1.5 sm:p-2 text-eco-charcoal cursor-pointer"
//                   >
//                     <Plus className="size-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex flex-row gap-2">
//                 <div>
//                   <Button
//                     variant="solid"
//                     size="xs"
//                     className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-1.5"
//                     onClick={handleAddToCart}
//                   >
//                     {isAuthenticated ? "Add to Cart" : "Login to Add to Cart"}
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             <div className="pt-2 sm:pt-3">
//               <h3 className="text-base sm:text-lg font-bold text-eco-charcoal mb-2">
//                 Description
//               </h3>
//               <p className="text-sm sm:text-base text-eco-charcoal/80 leading-relaxed">
//                 {products.length > 0
//                   ? products[0].product_description
//                   : content.productDetails.detailedDescription}
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default ProductSection;

"use client";
import React, { useState, useEffect } from "react";
import {
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  Share2,
  Package,
  Shield,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

// Product interface based on actual Supabase data structure
interface Product {
  id: number;
  product_name: string;
  product_description: string;
  actual_price: number;
  discounted_price: number;
  product_images: string[];
  category: string;
  quantity: number;
  status: boolean;
  created_at: string;
  updated_at: string;
}

const ProductSection = () => {
  const { content, currentPage } = useContent();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = currentPage === "home1" ? "Toothbrush" : "Dishwasher";

  const productImages =
    products.length > 0 && products[0].product_images
      ? products[0].product_images
      : content.productImages;

  const getImageUrl = (filename: string) => {
    const cleanFilename = filename
      .replace(/^\/+/, "")
      .replace(/^product-images\//, "");
    return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/${cleanFilename}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("status", true)
          .eq("category", currentCategory)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("❌ Error fetching products:", error.message);
          return;
        }

        setProducts((data as Product[]) || []);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory]);

  const product = products.length > 0 ? products[0] : null;
  const discountPercentage = product
    ? Math.round(
        ((product.actual_price - product.discounted_price) /
          product.actual_price) *
          100
      )
    : 0;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login first to add products to cart.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    if (product) {
      addToCart(
        {
          id: product.id,
          product_name: product.product_name,
          product_description: product.product_description,
          price: product.discounted_price,
          product_images: product.product_images,
          category: product.category,
        },
        quantity
      );

      toast({
        title: "Added to Cart!",
        description: `${product.product_name} (x${quantity}) has been added to your cart.`,
        duration: 3000,
      });

      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background-cream/30 to-background py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background-cream/30 to-background py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">No product found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Image */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="border-4 border-primary rounded-2xl shadow-lg">
              <div className="w-full h-96 flex items-center justify-center">
                <img
                  src={getImageUrl(productImages[selectedImageIndex])}
                  alt={product.product_name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.product_name}
              </h1>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${product.discounted_price}
                </span>
                {product.actual_price > product.discounted_price && (
                  <span className="text-2xl text-muted-foreground line-through">
                    ${product.actual_price}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-foreground font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-primary-lighter disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-16 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-primary-lighter"
                >
                  <Plus className="w-4 h-4" />
                </button>

                {/* Add to Cart */}
                <div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary hover:bg-primary-light text-primary-foreground font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isAuthenticated ? "Add to Cart" : "Login to Add to Cart"}
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 flex justify-between">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-foreground">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-foreground">Secure Payment</span>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-primary" />
                <span className="text-foreground">Easy Returns</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.product_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
