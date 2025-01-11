"use client";

import { useCart } from "@/lib/CartContext";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveWishlistToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black">
        <h1 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h1>
        <Link href="/products">
          <Button className="bg-gradient-to-r from-gray-600 to-black via-gray-700 text-white px-6 py-2 rounded">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 bg-gray-100 text-black min-h-screen max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">My Wishlist</h1>
      <div className="space-y-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-500 p-4"
          >
            <div className="flex items-center gap-4 w-full sm:w-1/2">
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                height={60}
                className="w-16 h-16 object-contain rounded sm:w-24 sm:h-24"
              />
              <div>
                <p className="font-medium text-lg">
                  {item.title.length > 25
                    ? `${item.title.slice(0, 25)}...`
                    : item.title}
                </p>
                <Link
                  href={`/products/${item.id}`}
                  className="text-sm text-gray-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 w-full sm:w-auto sm:text-center">
              <p className="font-medium text-lg">${item.price}</p>
            </div>

            <div className="mt-4 sm:mt-0 w-full sm:w-auto sm:text-center">
              <p className="text-green-600 font-medium">In Stock</p>
            </div>

            <div className="mt-4 sm:mt-0 w-full sm:w-auto flex flex-row sm:items-center gap-4 sm:justify-center">
              <button
                onClick={() => moveWishlistToCart(item.id)}
                className="px-4 py-2 bg-gradient-to-br from-gray-600 via-gray-700 to-black text-white rounded text-sm hover:opacity-90"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className=" flex items-center text-red-500 hover:text-red-600 transition"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
