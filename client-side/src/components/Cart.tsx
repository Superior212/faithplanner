"use client";

import Link from "next/link";
import { ShoppingBag, ShoppingCart, Minus, Plus, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import React from "react";
import { CartItem } from "@/lib/type";
import Image from "next/image";

interface CartProps {
  items?: CartItem[];
  onUpdateQuantity: (id: string, change: number) => void;
  onRemoveItem: (id: string) => void;
}

function Cart({
  items = [], // Provide default empty array
  onUpdateQuantity,
  onRemoveItem,
}: CartProps) {
  const howToUseRef = React.createRef<HTMLDivElement>();
  const homeRef = React.createRef<HTMLDivElement>();

  // If items is undefined or null
  if (!items) {
    return (
      <>
        <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
        <main className="mt-[4.6rem] sm:mt-20">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <ShoppingCart size={24} />
                <p>Unable to load cart items</p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  const total = subtotal;

  // If cart is empty
  if (items.length === 0) {
    return (
      <>
        <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
        <main className="mt-[4.6rem] sm:mt-20">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-medium text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1c1c1c]">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Cart has items
  return (
    <>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <main className="mt-[4.6rem] sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1 ml-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        ${item.price?.toFixed(2) || "0.00"}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-100 rounded"
                          disabled={item.quantity <= 1}>
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 rounded">
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 hover:bg-gray-100 rounded text-red-500">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${((item.price || 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 w-full bg-[#1c1c1c] text-white px-6 py-3 rounded-md font-medium flex items-center justify-center">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Cart;
