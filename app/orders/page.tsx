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
    <div className="container min-h-screen mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-semibold">Order #{order.orderId}</h2>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor:
                      order.status === "delivered"
                        ? "#86efac"
                        : order.status === "shipped"
                        ? "#93c5fd"
                        : order.status === "processing"
                        ? "#fde68a"
                        : "#fee2e2",
                    color:
                      order.status === "delivered"
                        ? "#166534"
                        : order.status === "shipped"
                        ? "#1e40af"
                        : order.status === "processing"
                        ? "#854d0e"
                        : "#991b1b",
                  }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Items</h3>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 mb-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Shipping Details</h3>
                  <p className="text-sm text-gray-600">
                    {order.customerDetails.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.customerDetails.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.customerDetails.address}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount:</span>
                    <span className="font-semibold">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
