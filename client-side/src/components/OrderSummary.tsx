

interface LocalCartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product: {
    teaser?: number;
  };
}
import React from "react";

interface OrderSummaryProps {
  items: LocalCartItem[];
  regularSubtotal: number;
  teaserSubtotal: number;
  shipping: number;
  tax: number;
  total: number;
  regularTotal: number;
}

export default function OrderSummary({
  items,
  regularSubtotal,
  teaserSubtotal,
  shipping,
  tax,
  total,
  regularTotal,
}: OrderSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      {items.map((item) => (
        <div key={item.id} className="flex justify-between py-2">
          <span>
            {item.name} x {item.quantity}
          </span>
          <span>
            {item.product.teaser ? (
              <>
                <span className="line-through text-gray-500 mr-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <span className="font-semibold text-green-600">
                  ${(item.product.teaser * item.quantity).toFixed(2)}
                </span>
              </>
            ) : (
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            )}
          </span>
        </div>
      ))}
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <div>
            {teaserSubtotal !== regularSubtotal && (
              <span className="line-through text-gray-500 mr-2">
                ${regularSubtotal.toFixed(2)}
              </span>
            )}
            <span
              className={
                teaserSubtotal !== regularSubtotal
                  ? "font-semibold text-green-600"
                  : ""
              }>
              ${teaserSubtotal.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-2">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <div className="text-lg font-semibold text-gray-900">
            {regularTotal !== total && (
              <span className="line-through text-gray-500 mr-2">
                ${regularTotal.toFixed(2)}
              </span>
            )}
            <span className={regularTotal !== total ? "text-green-600" : ""}>
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
