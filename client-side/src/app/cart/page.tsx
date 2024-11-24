"use client";

import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal, getTeaserTotal } =
    useCartStore();

  const subtotal = getTeaserTotal();
  const shipping = items.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const howToUseRef = React.createRef<HTMLDivElement>();
  const homeRef = React.createRef<HTMLDivElement>();

  return (
    <>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <main className="mt-[4.6rem] sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        height={96}
                        width={96}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1 ml-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <div className="mt-1">
                          {item.product.teaser ? (
                            <>
                              <p className="text-sm text-gray-500 line-through">
                                ${item.product.price.toFixed(2)}
                              </p>
                              <p className="text-lg text-indigo-600 font-semibold">
                                ${item.product.teaser.toFixed(2)}
                              </p>
                            </>
                          ) : (
                            <p className="text-gray-600">
                              ${item.product.price.toFixed(2)}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center mt-2">
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.product.id,
                                Number(e.target.value)
                              )
                            }
                            className="border border-gray-300 rounded-md px-2 py-1">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="ml-4 text-red-600 hover:text-red-700">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          $
                          {(
                            (item.product.teaser || item.product.price) *
                            item.quantity
                          ).toFixed(2)}
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
                        {subtotal !== getTotal() && (
                          <span className="line-through text-gray-500 mr-2">
                            ${getTotal().toFixed(2)}
                          </span>
                        )}
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900">
                        ${shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">${tax.toFixed(2)}</span>
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
          ) : (
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
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
