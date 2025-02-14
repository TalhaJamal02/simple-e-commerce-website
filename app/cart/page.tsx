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
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCost = 10;
  const tax = 2.99;

  const totalPrice = subtotal + shippingCost + tax;

  return (
    <div className="min-h-screen mx-auto my-20 py-6 px-4 md:px-8 lg:px-16 bg-background">
      <h1 className="text-3xl font-bold mb-10 text-center text-foreground">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {cart.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              <p>Your cart is empty.</p>
              <Link
                href="/"
                className="text-blue-500 dark:text-blue-400 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <Table className="w-full bg-card shadow-lg rounded-lg overflow-hidden">
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-2/5 p-4 text-left">Product</TableHead>
                  <TableHead className="w-1/5 p-4 text-left">Price</TableHead>
                  <TableHead className="w-1/5 p-4 text-left">
                    Quantity
                  </TableHead>
                  <TableHead className="w-1/5 p-4 text-left">
                    Subtotal
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="border-b"
                    >
                      <TableCell className="p-4">
                        <div className="flex sm:flex-row flex-col items-center gap-4">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={64}
                            height={64}
                            className="rounded"
                          />
                          <div className="flex flex-col gap-2 flex-grow">
                            <span className="text-gray-700 sm:text-base text-sm">
                              {item.title}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center gap-1 text-red-500 text-sm hover:text-red-700 transition-colors duration-200 w-fit"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 text-gray-700">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            className="p-2 border-none"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </Button>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-700"
                          >
                            {item.quantity}
                          </motion.span>
                          <Button
                            variant="outline"
                            className="p-2 border-none"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 text-gray-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          )}
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            Cart Totals
          </h2>

          <div className="flex justify-between mb-3 text-muted-foreground">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-3 text-muted-foreground">
            <span>Tax:</span>
            <span>${tax}</span>
          </div>

          <div className="flex justify-between mb-3 text-muted-foreground">
            <span>Shipping:</span>
            <span>${shippingCost}</span>
          </div>
          <hr className="my-4 border-border" />
          <div className="flex justify-between text-lg text-foreground">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <Link href="/checkout">
            <Button className="w-full font-semibold mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
