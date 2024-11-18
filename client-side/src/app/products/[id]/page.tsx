"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Heart, Share2, Star } from "lucide-react";
import { products } from "@/data/products";
import React, { useState } from "react";
import { use } from "react";
import Navbar from "@/components/Navbar";
import { useCartStore } from "@/store/useCartStore";
import NotFoundError from "@/app/not-found";
import Image from "next/image";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const howToUseRef = React.createRef<HTMLDivElement>();
  const homeRef = React.createRef<HTMLDivElement>();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addItem } = useCartStore();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <NotFoundError />;
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    router.push("/cart");
  };

  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 4);

  return (
    <>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <main className="mt-[4.6rem] sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={`${product.name} view ${i + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

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
                ${product.price}
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Quantity
                </h3>
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

              {/* Product Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Features
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Premium quality paper</li>
                  <li>Durable hardcover binding</li>
                  <li>Monthly and weekly spreads</li>
                  <li>Goal tracking sections</li>
                  <li>Note-taking pages</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You may also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200">
                  <div className="aspect-w-1 aspect-h-1">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={100}
                      height={100}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-indigo-600 font-bold">
                      ${relatedProduct.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
