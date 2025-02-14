"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { toast } from "sonner";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CustomerDetails {
  name: string;
  email: string;
  address: string;
}

interface Order {
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
  customerDetails: CustomerDetails;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: CartItem[];
  addToCart: (product: CartItem) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  addToWishlist: (product: CartItem) => void;
  removeFromWishlist: (productId: number) => void;
  moveWishlistToCart: (productId: number) => void;
  createOrder: (customerDetails: CustomerDetails) => void;
  getAllOrders: () => Order[];
  updateOrderStatus: (orderId: string, newStatus: Order["status"]) => void;
  removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from localStorage after component mounts
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    setIsInitialized(true);
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders, isInitialized]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isInitialized]);

  const addToCart = useCallback((product: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const addToWishlist = useCallback((product: CartItem) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.some((item) => item.id === product.id)) {
        return [...prevWishlist, { ...product, quantity: 1 }];
      }
      return prevWishlist;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );
  }, []);

  const moveWishlistToCart = useCallback(
    (productId: number) => {
      const item = wishlist.find((item) => item.id === productId);
      if (item) {
        addToCart(item);
        removeFromWishlist(productId);
      }
    },
    [wishlist, addToCart, removeFromWishlist]
  );

  const increaseQuantity = useCallback((productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const applyCoupon = useCallback(
    (couponCode: string) => {
      if (couponCode === "DISCOUNT20") {
        const discountAmount =
          cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.2;

        toast.success(`You saved $${discountAmount.toFixed(2)}!`);
        setCart((prevCart) =>
          prevCart.map((item) => ({
            ...item,
            price: parseFloat((item.price * 0.8).toFixed(2)),
          }))
        );
      } else {
        toast.error("Invalid coupon code!");
      }
    },
    [cart]
  );

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }, []);

  const createOrder = useCallback(
    (customerDetails: CustomerDetails) => {
      if (cart.length === 0) return;

      const newOrder: Order = {
        orderId: Math.random().toString(36).substr(2, 9),
        items: [...cart],
        totalAmount: cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        status: "pending",
        createdAt: new Date().toISOString(),
        customerDetails,
      };

      setOrders((prevOrders) => [...prevOrders, newOrder]);
      setCart([]); // Clear cart after order creation
    },
    [cart]
  );

  const getOrder = useCallback(
    (orderId: string) => {
      return orders.find((order) => order.orderId === orderId);
    },
    [orders]
  );

  const getAllOrders = useCallback(() => {
    return orders;
  }, [orders]);

  const updateOrderStatus = useCallback(
    (orderId: string, newStatus: Order["status"]) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    },
    []
  );

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
      orders,
      createOrder,
      applyCoupon,
      getOrder,
      getAllOrders,
      updateOrderStatus,
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
      orders,
      createOrder,
      applyCoupon,
      getOrder,
      getAllOrders,
      updateOrderStatus,
    ]
  );

  // Optional: You can wrap the provider's children with a loading state
  if (!isInitialized) {
    return null; // Or return a loading spinner
  }

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
