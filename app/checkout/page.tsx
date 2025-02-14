"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "cash",
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customerDetails = {
      name: formData.name,
      email: formData.email,
      address: `${formData.address}, ${formData.city}, ${formData.zip}`,
    };

    createOrder(customerDetails);
    clearCart();
    setIsDialogOpen(true);
  };

  const { cart, clearCart, createOrder } = useCart();

  const shippingCost = 10;
  const tax = 2.99;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalPrice = total + shippingCost + tax - discount;

  const applyCoupon = () => {
    if (couponCode === "DISCOUNT20") {
      setDiscount(20);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  return (
    <div className="min-h-screen my-16 bg-background py-10">
      <div className="max-w-4xl mx-auto bg-background shadow-md rounded-lg p-8">
        <h1 className="text-3xl text-center font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full px-4 sm:px-8 lg:px-0"
          >
            <Tabs defaultValue="cash" className="w-full ">
              <TabsList className=" flex justify-center min-w-full">
                <TabsTrigger value="cash">Cash on Delivery</TabsTrigger>
                <TabsTrigger value="card">Card Payment</TabsTrigger>
              </TabsList>
              <TabsContent value="cash">
                <motion.div
                  key="cash"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h2 className="text-xl font-semibold my-4 text-center">
                    Billing Details
                  </h2>
                  <div className=" space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium"
                      >
                        Full Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium"
                      >
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="johndoe@example.com"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium"
                      >
                        Address
                      </label>
                      <Input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium"
                        >
                          City
                        </label>
                        <Input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Karachi"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="zip"
                          className="block text-sm font-medium"
                        >
                          ZIP Code
                        </label>
                        <Input
                          type="number"
                          id="zip"
                          name="zip"
                          inputMode="numeric"
                          maxLength={5}
                          value={formData.zip}
                          onChange={handleChange}
                          placeholder="10005"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="card">
                <motion.div
                  key="card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h2 className="text-xl font-semibold my-4 text-center">
                    Card Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium"
                      >
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="johndoe@example.com"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium"
                      >
                        Card Number
                      </label>
                      <Input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        inputMode="numeric"
                        maxLength={19}
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const formattedCardNumber = e.target.value
                            .replace(/\D/g, "")
                            .replace(/(\d{4})(?=\d)/g, "$1 ");
                          handleChange({
                            target: {
                              name: "cardNumber",
                              value: formattedCardNumber,
                            },
                          });
                        }}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        placeholder="1234 5678 9123 4567"
                        required={formData.paymentMethod === "card"}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cardHolder"
                        className="block text-sm font-medium"
                      >
                        Cardholder Name
                      </label>
                      <Input
                        type="text"
                        id="cardHolder"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        placeholder="John Doe"
                        required={formData.paymentMethod === "card"}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="expiry"
                          className="block text-sm font-medium"
                        >
                          Expiration Date
                        </label>
                        <Input
                          type="month"
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                          placeholder="MM/YY"
                          required={formData.paymentMethod === "card"}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium"
                        >
                          CVV
                        </label>
                        <Input
                          type="password"
                          inputMode="numeric"
                          id="cvv"
                          name="cvv"
                          maxLength={3}
                          value={formData.cvv}
                          onChange={handleChange}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                          placeholder="123"
                          required={formData.paymentMethod === "card"}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium"
                      >
                        Address
                      </label>
                      <Input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium"
                        >
                          City
                        </label>
                        <Input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Karachi"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="zip"
                          className="block text-sm font-medium"
                        >
                          ZIP Code
                        </label>
                        <Input
                          type="tel"
                          id="zip"
                          name="zip"
                          inputMode="numeric"
                          maxLength={5}
                          value={formData.zip}
                          onChange={handleChange}
                          placeholder="10005"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
            <Button
              type="submit"
              className="w-full py-2 px-4 text-white font-medium rounded-md shadow-sm bg-gradient-to-r from-muted-foreground via-muted-foreground to-muted-foreground"
            >
              Place Order
            </Button>
          </form>

          <div className="w-full px-4 sm:px-8 lg:px-0">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <h3 className="text-sm font-medium">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t py-4 mt-4 text-muted-foreground w-full">
              <div className="flex flex-col space-y-4 sm:col-span-2">
                <span className="text-lg font-medium">Coupon Code:</span>
                <div className="w-full flex gap-4">
                  <Input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter DISCOUNT20"
                    className="p-2 w-full border-gray-300 rounded-md bg-background"
                  />
                  <Button onClick={applyCoupon} className="bg-background text-foreground">
                    Apply
                  </Button>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center mt-2">
                    <span>Discount:</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center sm:col-span-2 border-t pt-4">
                <h3 className="text-lg font-medium">Total:</h3>
                <p className="text-lg font-semibold">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Order placed successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for shopping with us! We appreciate your order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Link href={"/orders"} className="text-center">
              <AlertDialogCancel>Track Your Order</AlertDialogCancel>
            </Link>
            <Link href={"/"} className="text-center">
              <AlertDialogAction>Continue Shopping</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Checkout;
