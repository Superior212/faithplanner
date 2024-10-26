"use client";

import { useState } from "react";
import MemoArrow from "@/icons/Arrow";
import Image from "next/image";
import ProductDetailsModal from "./Modals/ProductDetailsModal";
import { products } from "@/lib/data";

interface Product {
  id: number;
  title: string;
  image: string;
  color: string;
}

function ProductCard({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`rounded-[3.2rem] overflow-hidden ${product.color}`}>
      <div className="aspect-w-16 aspect-h-9">
        <Image
          src={product.image}
          alt={product.title}
          height={20}
          width={20}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">{product.title}</h3>
        <button
          className="bg-[#1c1c1c] text-white py-2 px-4 rounded-full flex items-center justify-center w-full"
          onClick={() => setIsModalOpen(true)}>
          SHOP NOW
          <MemoArrow className="ml-2 h-8 w-8" />
        </button>
      </div>
      <ProductDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </div>
  );
}

export default function ProductGallery() {
  return (
    <section className="hsection sm:my-32 my-10 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-4">
          PRODUCT GALLERY
        </h2>
        <p className="sm:text-xl text-center text-gray-600 mb-12">
          From discovering new tracks to supporting your favorite artists.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
