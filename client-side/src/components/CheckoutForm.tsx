"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { FormData } from "@/lib/type";
import { useToast } from "@/hooks/use-toast";

import { OnApproveData } from "@paypal/paypal-js";
import { CartItem } from "@/lib/checkout";

interface CheckoutFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createOrder: () => Promise<string>;
  onApprove: (data: { orderID: string }) => Promise<void>;
  cartItems: CartItem[];
  total: number;
}

export default function CheckoutForm({
  formData,
  handleChange,
  createOrder,
  onApprove,
  cartItems,
  total,
}: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isContactInfoSubmitted, setIsContactInfoSubmitted] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://faithplanner-server.vercel.app/api",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactInfo: formData,
            items: cartItems,
            total: total,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit contact information");
      }

      const data = await response.json();
      setOrderId(data.orderId);
      setIsContactInfoSubmitted(true);
      toast({
        title: "Success",
        description: "Contact information submitted successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to submit contact information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateOrder = async () => {
    const createdOrderId = await createOrder();
    // Update the payment status to 'processing'
    await updatePaymentStatus(orderId!, "processing", createdOrderId);
    return createdOrderId;
  };

  const handleApprove = async (data: OnApproveData) => {
    await onApprove({ orderID: data.orderID });
    // Update the payment status to 'completed'
    await updatePaymentStatus(orderId!, "completed", data.orderID);
  };

  const updatePaymentStatus = async (
    orderId: string,
    status: string,
    paypalOrderId: string
  ) => {
    try {
      const response = await fetch(
        `https://faithplanner-server.vercel.app/api/orders/${orderId}/payment-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentStatus: status, paypalOrderId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update payment status");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Contact Information
        </h2>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Shipping Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center text-sm text-gray-600">
          <Lock className="h-4 w-4 mr-1" />
          Secure checkout
        </div>
        {!isContactInfoSubmitted ? (
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {isSubmitting ? "Submitting..." : "Submit Contact Info"}
          </button>
        ) : (
          <div className="w-full max-w-md">
            <PayPalButtons
              createOrder={handleCreateOrder}
              onApprove={handleApprove}
              style={{ layout: "horizontal" }}
            />
          </div>
        )}
      </div>
    </form>
  );
}
