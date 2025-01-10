"use client";

import { useCart } from "@/lib/CartContext";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
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
      <Table className="bg-white rounded-lg shadow-md w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left px-4 py-2">Product</TableHead>
            <TableHead className="text-left px-4 py-2">Price</TableHead>
            <TableHead className="text-left px-4 py-2">Stock Status</TableHead>
            <TableHead className="text-center px-4 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wishlist.map((item) => (
            <TableRow key={item.id} className=" my-4">
              <TableCell className="sm:px-4 sm:py-2 ">
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="w-16 h-16 object-contain rounded sm:w-24 sm:h-24"
                  />
                  <div className="col-span-2">
                    <p className="font-medium">{item.title}</p>
                    <Link
                      href={`/products/${item.id}`}
                      className="text-sm text-gray-500 hover:underline mt-3"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </TableCell>
              <TableCell className="sm:px-4 sm:py-2">
                <p className="font-medium">${item.price}</p>
              </TableCell>
              <TableCell className="sm:px-4 sm:py-2">
                <p className="text-green-600 font-medium">In Stock</p>
              </TableCell>
              <TableCell className="text-center sm:px-4 sm:py-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
                  <Button
                    onClick={() => moveWishlistToCart(item.id)}
                    className=" px-4 py-2 text-xs sm:text-base bg-gradient-to-br from-gray-600 via-gray-700 to-black text-white rounded "
                  >
                    Add to Cart
                  </Button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-red-500 hover:text-red-600 transition flex items-center gap-2"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Wishlist;
