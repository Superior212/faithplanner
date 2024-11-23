import { CartItem } from "@/lib/checkout";
import Image from "next/image";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between py-2">
            <div className="flex items-center">
              <Image
                src={item.product.image}
                alt={item.product.name}
                height={64}
                width={64}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4">
                <p className="text-gray-900">{item.product.name}</p>
                <p className="text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="text-gray-900">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">${tax.toFixed(2)}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-semibold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
