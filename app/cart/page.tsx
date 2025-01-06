"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const shippingCost = 10;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalPrice = total + shippingCost;

  return (
    <div className="h-full mx-auto my-20 py-6 px-4 md:px-8 lg:px-16 bg-gray-50">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead className="w-2/5 p-4 text-left">Product</TableHead>
                <TableHead className="w-1/5 p-4 text-left">Price</TableHead>
                <TableHead className="w-1/5 p-4 text-left">Quantity</TableHead>
                <TableHead className="w-1/5 p-4 text-left">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id} className="border-b">
                  <TableCell className="p-4">
                    <div className="flex sm:flex-row flex-col items-center gap-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="rounded"
                      />
                      <span className="text-gray-700">{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-4 text-gray-700">
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="p-2"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </Button>
                      <span className="text-gray-700">{item.quantity}</span>
                      <Button
                        variant="outline"
                        className="p-2"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="p-4 text-gray-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg h-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Cart Totals
          </h2>
          <div className="flex justify-between mb-4 text-gray-700">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-gray-700">
            <span>Shipping:</span>
            <span>${shippingCost}</span>
          </div>
          <hr className="mb-4" />
          <div className="flex justify-between text-lg text-gray-800">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Link href={"/checkout"}>
            <Button className="w-full font-semibold  mt-6 bg-gradient-to-br from-gray-500 via-black to-gray-500">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
