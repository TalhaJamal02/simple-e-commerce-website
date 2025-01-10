"use client";

import Link from "next/link";
import React from "react";
import CartPanel from "./CartPanel";
import { Heart } from "lucide-react";
import { useCart } from "@/lib/CartContext";

function Navbar() {

  const { wishlist } = useCart();


  return (
    <div className="max-w-6xl m-auto w-[90%]">
      <nav className="bg-white shadow-lg p-3 md:p-4 mt-4 flex justify-between items-center rounded-lg">
        <Link href="/" className="text-black font-semibold text-2xl">
          ShopEasy
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/wishlist" className="relative group">
            <Heart size={26} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          </Link>
          <CartPanel />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
