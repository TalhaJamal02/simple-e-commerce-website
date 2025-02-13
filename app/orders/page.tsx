"use client";

import React from "react";
import { useCart } from "@/lib/CartContext";
import { motion } from "framer-motion";
import Image from "next/image";

const OrdersPage = () => {
  const { getAllOrders } = useCart();
  const orders = getAllOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center text-gray-500">No orders found</div>
          ) : (
            orders.map((order) => (
              <motion.div
                key={order.orderId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Order #{order.orderId}
                  </h2>
                  <span
                    className={`${getStatusColor(
                      order.status
                    )} text-white px-3 py-1 rounded-full text-sm`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600">Order Date</p>
                    <p className="font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Amount</p>
                    <p className="font-medium">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={96}
                            height={96}
                            className="w-auto h-auto object-contain rounded"
                          />
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {order.customerDetails && (
                  <div className="border-t mt-4 pt-4">
                    <h3 className="font-medium mb-2">Shipping Details</h3>
                    <p className="text-gray-600">
                      {order.customerDetails.name}
                    </p>
                    <p className="text-gray-600">
                      {order.customerDetails.email}
                    </p>
                    <p className="text-gray-600">
                      {order.customerDetails.address}
                    </p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
