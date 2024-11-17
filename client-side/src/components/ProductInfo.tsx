"use client";

import { ShoppingCart, Heart, Share2, Star } from "lucide-react";
import { Product } from "@/lib/type";
import { useState } from "react";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      // Add your cart logic here
      // For example:
      // await addToCart(product);
      alert("Added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-5 w-5 text-yellow-400"
              fill="currentColor"
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">(5 reviews)</span>
      </div>

      <div className="text-3xl font-bold text-indigo-600 mb-6">
        ${product.price?.toFixed(2)}
      </div>

      <p className="text-gray-600 mb-6">{product.description}</p>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="flex-1 bg-[#1c1c1c] text-white px-6 py-3 rounded-md font-medium flex items-center justify-center disabled:opacity-50">
          <ShoppingCart className="h-5 w-5 mr-2" />
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>
        <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
          <Share2 className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Product Features */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Premium quality paper</li>
          <li>Durable hardcover binding</li>
          <li>Monthly and weekly spreads</li>
          <li>Goal tracking sections</li>
          <li>Note-taking pages</li>
        </ul>
      </div>
    </div>
  );
}
