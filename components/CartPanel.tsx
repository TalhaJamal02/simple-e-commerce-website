"use client";

import React, { useState } from "react";
import { ShoppingCart, X, Minus, Plus, Trash } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import Image from "next/image";
import Link from "next/link";

const CartPanel: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="relative">
      <button onClick={toggleCart}>
        {isCartOpen ? (
          ""
        ) : (
          <span>
            <ShoppingCart size={28} className="inline cursor-pointer" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </span>
        )}
      </button>

      <div
        className={`z-50 overflow-x-hidden fixed top-0 right-0 w-full sm:w-[450px] max-w-[90vw] h-full bg-zinc-950 shadow-lg p-6 transition-transform duration-500 transform ${isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          onClick={toggleCart}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 text-2xl text-white"
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
                <li
                  key={item.id}
                  className="flex flex-col md:flex-row justify-between py-2 md:py-4 gap-4"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover bg-transparent mr-4 rounded"
                    />
                    <div>
                      <span className="block text-white font-medium text-sm md:text-base">
                        {item.title.length > 35
                          ? `${item.title.substring(0, 35)}...`
                          : item.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end flex-wrap gap-2 w-full md:w-auto">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-2 rounded text-white"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-white text-sm md:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="p-2 rounded text-white"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <span className="text-white text-sm md:text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-between items-center text-white">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center space-x-2">
              <button
                onClick={clearCart}
                className="mt-4 px-5 py-2 bg-red-700 text-white rounded w-fit"
              >
                Clear Cart
              </button>
              <Link href={"/cart"} className="mt-4 px-5 py-2 bg-gradient-to-br from-gray-600 to-black via-gray-700 text-white rounded w-fit">
                Proceed To Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPanel;
