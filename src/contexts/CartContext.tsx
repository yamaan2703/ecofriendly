import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";

// Cart item interface
export interface CartItem {
  id: number;
  product_name: string;
  product_description: string;
  price: number;
  product_images: string[];
  category: string;
  quantity: number;
}

// Cart context interface
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ecofriendly_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ecofriendly_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product: Omit<CartItem, "quantity">, quantity: number) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login first to add products to cart.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get total number of items in cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price of all items in cart
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
