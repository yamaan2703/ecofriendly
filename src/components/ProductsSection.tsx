"use client";
import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { Plus, Minus } from "lucide-react";
import Button from "./Button/Button";
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

const ProductSection: React.FC = () => {
  const { content, currentPage } = useContent();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = currentPage === "home1" ? "Toothbrush" : "Dishwasher";

  console.log("ProductsSection: currentPage =", currentPage);
  console.log("ProductsSection: currentCategory =", currentCategory);

  const productImages =
    products.length > 0 && products[0].product_images
      ? products[0].product_images
      : content.productImages;

  const getImageUrl = (filename: string) => {
    // Remove any leading slashes or "product-images/" prefix from filename
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

        if (!data || data.length === 0) {
          console.warn(
            `⚠️ No ${currentCategory} products found in Supabase table.`
          );
        } else {
          data.forEach((product: any, index: number) => {
            // Log image details like admin panel
            if (product.product_images && product.product_images.length > 0) {
              console.log(
                `🖼️ Product ${index + 1} images:`,
                product.product_images
              );
              product.product_images.forEach(
                (image: string, imgIndex: number) => {
                  const imageUrl = getImageUrl(image);
                  const img = new Image();
                  img.onload = () =>
                    console.log(`✅ Image ${imgIndex + 1} loaded successfully`);
                  img.onerror = () => (img.src = imageUrl);
                }
              );
            }
          });
        }

        setProducts((data as Product[]) || []);
        // Debug price data
        if (data && data.length > 0) {
          console.log("💰 Price data from database:", {
            actual_price: data[0]?.actual_price,
            discounted_price: data[0]?.discounted_price,
            product_name: data[0]?.product_name,
          });
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

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

    if (products.length > 0) {
      const product = products[0];
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

      // Reset quantity to 1 after adding to cart
      setQuantity(1);
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-12">
      <section className="py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Mobile Main Image */}
            <div className="lg:hidden bg-background-cream rounded-2xl p-6 shadow-soft">
              <div className="relative w-full h-80">
                {productImages && productImages.length > 0 ? (
                  <img
                    src={getImageUrl(productImages[selectedImageIndex])}
                    alt={
                      products.length > 0 ? products[0].product_name : "Product"
                    }
                    width={1000}
                    height={1000}
                    className="object-contain w-full h-full"
                    onError={(e) => {
                      console.error(
                        "Image failed to load:",
                        getImageUrl(productImages[selectedImageIndex])
                      );
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground h-full">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-sm">No images available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productImages.map((src, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-24 rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
                    selectedImageIndex === index
                      ? "border-primary shadow-eco"
                      : "border-border hover:border-primary-light"
                  }`}
                >
                  <img
                    src={getImageUrl(src)}
                    alt={`View ${index + 1}`}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(
                        "Thumbnail failed to load:",
                        getImageUrl(src)
                      );
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Desktop Main Image */}
            <div className="hidden lg:block bg-background-cream rounded-2xl p-8 shadow-soft">
              <div className="relative w-full h-96">
                {productImages && productImages.length > 0 ? (
                  <img
                    src={getImageUrl(productImages[selectedImageIndex])}
                    alt={
                      products.length > 0 ? products[0].product_name : "Product"
                    }
                    width={1000}
                    height={1000}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground h-full">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-sm">No images available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-eurotypo font-bold text-primary leading-tight mb-4">
                {products.length > 0
                  ? products[0].product_name
                  : content.products.title}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <IoIosStar
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-semibold">
                  {content.reviews.count}
                </span>
              </div>
            </div>

            <div className="border-t border-b border-border py-6 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-primary">
                  $
                  {products.length > 0
                    ? products[0].discounted_price
                    : content.products.price}
                </span>
                {products.length > 0 &&
                  products[0].actual_price > products[0].discounted_price && (
                    <span className="text-2xl text-muted-foreground line-through">
                      ${products[0].actual_price}
                    </span>
                  )}
              </div>
              <p className="text-sm text-muted-foreground">
                {content.pricing.freeShipping}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border-2 border-primary rounded-lg px-1">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-3 text-primary disabled:opacity-30 hover:bg-primary-lighter rounded-lg transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 py-3 min-w-[4rem] text-center font-bold text-primary text-lg">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="p-3 text-primary hover:bg-primary-lighter rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <Button
                variant="solid"
                size="xs"
                className="flex-1 text-base py-3 px-6"
                onClick={handleAddToCart}
              >
                {isAuthenticated ? "Add to Cart" : "Login to Add to Cart"}
              </Button>
            </div>

            <div className="bg-background-cream rounded-lg p-6 space-y-3">
              <h3 className="text-xl font-bold text-primary">
                About This Product
              </h3>
              <p className="text-base text-foreground leading-relaxed">
                {products.length > 0
                  ? products[0].product_description
                  : content.productDetails.detailedDescription}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductSection;
