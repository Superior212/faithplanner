"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  // Add other product properties here
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, quantity);
    router.push("/cart");
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md">
            -
          </button>
          <span className="text-gray-900 font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md">
            +
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-[#1c1c1c] text-white px-6 py-3 rounded-md font-medium flex items-center justify-center">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </button>
        <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
          <Share2 className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
