"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type WishlistItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (item: CartItem) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  moveWishlistToCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    } catch (error) {
      console.error("Failed to parse localStorage data:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  }, []);

  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, item];
    });
  }, []);

  const removeFromWishlist = useCallback((id: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((wishlistItem) => wishlistItem.id !== id)
    );
  }, []);

  const moveWishlistToCart = useCallback(
    (id: number) => {
      const item = wishlist.find((wishlistItem) => wishlistItem.id === id);
      if (item) {
        addToCart({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: 1,
        });
        removeFromWishlist(id);
      }
    },
    [wishlist, addToCart, removeFromWishlist]
  );

  const increaseQuantity = useCallback((id: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  }, []);

  const decreaseQuantity = useCallback((id: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }, []);

  const contextValue = useMemo(
    () => ({
      cart,
      wishlist,
      addToCart,
      addToWishlist,
      removeFromWishlist,
      moveWishlistToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      cart,
      wishlist,
      addToCart,
      addToWishlist,
      removeFromWishlist,
      moveWishlistToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};