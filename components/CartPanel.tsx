"use client";

import React, { useState } from "react";
import { ShoppingCart, X, Minus, Plus, Trash } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import Image from "next/image";

const CartPanel: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="relative">
      <button onClick={toggleCart}>
        {isCartOpen ? (
          ""
        ) : (
          <ShoppingCart size={24} className="inline cursor-pointer" />
        )}
      </button>

      <div
        className={`z-50 fixed top-0 right-0 w-full sm:w-[450px] h-full bg-zinc-950 shadow-lg p-6 transition-transform duration-500 transform ${isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          onClick={toggleCart}
          className="absolute top-7 right-7 text-2xl text-white"
        >
          <X />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-white">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-white">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-600">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-4">
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={48}
                      height={48}
                      className=" bg-transparent object-cover mr-4 rounded"
                    />
                    <div>
                      <span className="block text-white font-medium">{item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className=" p-2 rounded text-white"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className=" p-2 rounded text-white"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <span className="text-white ml-4">${(item.price * item.quantity).toFixed(2)}</span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <Trash size={18} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-between items-center text-white">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={clearCart}
              className="mt-4 px-5 py-2 bg-red-700 text-white rounded w-fit"
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPanel;