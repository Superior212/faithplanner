"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useToast } from "@/hooks/use-toast";
import PayPalProvider from "./PayPalProvider";
import OrderSummary from "@/components/OrderSummary";
import { FormData } from "@/lib/type";
import { CartItem } from "@/lib/checkout";
import Navbar from "@/components/Navbar";
import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutPage() {
  const howToUseRef = React.useRef<HTMLDivElement>(null);
  const homeRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  const {
    items: cartItems,
    getTotal,
    getTeaserTotal,
    clearCart,
  } = useCartStore();
  const items: CartItem[] = cartItems.map((item) => ({
    id: item.product.id,
    product: {
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      description: item.product.description,
      image: item.product.image,
      category: item.product.category,
      teaser: item.product.teaser,
    },
    name: item.product.name,
    price: item.product.price,
    description: item.product.description,
    quantity: item.quantity,
    image: item.product.image,
  }));
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const regularSubtotal = getTotal();
  const teaserSubtotal = getTeaserTotal();
  const shipping = calculateShipping(items);
  const tax = parseFloat((teaserSubtotal * 0.08).toFixed(2));
  const total = parseFloat((teaserSubtotal + shipping + tax).toFixed(2));
  const regularTotal = parseFloat(
    (
      regularSubtotal +
      shipping +
      parseFloat((regularSubtotal * 0.08).toFixed(2))
    ).toFixed(2)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const apiUrl = "https://faithplanner-server.vercel.app";

  const createOrder = async (): Promise<string> => {
    try {
      console.log("Creating order with total:", total);
      const response = await fetch(`${apiUrl}/api/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.product.name,
            quantity: item.quantity,
            unit_amount: {
              value: (item.product.teaser || item.product.price).toFixed(2),
              currency_code: "USD",
            },
          })),
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: teaserSubtotal.toFixed(2),
              },
              shipping: {
                currency_code: "USD",
                value: shipping.toFixed(2),
              },
              tax_total: {
                currency_code: "USD",
                value: tax.toFixed(2),
              },
            },
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(
          `Failed to create order: ${errorData.error || response.statusText}`
        );
      }

      const orderData = await response.json();
      console.log("Order created successfully:", orderData);
      return orderData.orderId;
    } catch (error) {
      console.error("Error creating order:", error);
      handlePaymentError(error);
      throw error;
    }
  };

  const onApprove = async (data: { orderID: string }) => {
    try {
      console.log("Payment approved. Capturing payment...");
      console.log("Order ID:", data.orderID);
      const response = await fetch(`${apiUrl}/api/capture-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });

      const responseData = await response.json();
      console.log("Payment capture response:", responseData);

      if (!response.ok) {
        throw new Error(
          `Payment capture failed: ${responseData.error || response.statusText}`
        );
      }

      if (responseData.status === "COMPLETED") {
        console.log("Payment successful. Clearing cart and redirecting...");
        localStorage.setItem(
          "orderDetails",
          JSON.stringify({
            items,
            subtotal: teaserSubtotal,
            shipping,
            tax,
            total,
          })
        );
        clearCart();
        toast({
          title: "Success",
          description: "Your order has been placed successfully!",
        });
        router.push("/order-confirmation");
      } else {
        throw new Error(
          "Payment failed: " + (responseData.error || "Unknown error")
        );
      }
    } catch (error) {
      console.error("PayPal payment failed:", error);
      toast({
        title: "Payment Failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentError = (error: unknown) => {
    console.error("Payment error:", error);
    let errorMessage =
      "There was an error processing your payment. Please try again.";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    toast({
      title: "Payment Failed",
      description: errorMessage,
      variant: "destructive",
    });
  };

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <PayPalProvider>
        <main className="mt-[4.6rem] sm:mt-20">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  Checkout
                </h1>
                <CheckoutForm
                  formData={formData}
                  handleChange={handleChange}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  cartItems={items}
                  total={total}
                />
              </div>
              <div>
                <OrderSummary
                  items={items.map((item) => ({
                    id: item.id,
                    product: item.product,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    image: item.product.image,
                  }))}
                  regularSubtotal={regularSubtotal}
                  teaserSubtotal={teaserSubtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                  regularTotal={regularTotal}
                />
              </div>
            </div>
          </div>
        </main>
      </PayPalProvider>
    </>
  );
}

function calculateShipping(items: CartItem[]): number {
  const baseShipping = 5.99;
  const additionalItemCost = 1.5;
  return parseFloat(
    (items.length > 0
      ? baseShipping + (items.length - 1) * additionalItemCost
      : 0
    ).toFixed(2)
  );
}
