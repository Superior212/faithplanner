"use client";

import { useState } from "react";
import MemoArrow from "@/icons/Arrow";
import Image from "next/image";
import ProductDetailsModal from "./Modals/ProductDetailsModal";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import TermsAndConditionsModal from "./Modals/TermsAndConditionsModal";

interface Product {
  id: number;
  title: string;
  image: string;
  color: string;
}

function ProductCard({
  product,
  isBundleCard = false,
}: {
  product: Product;
  isBundleCard?: boolean;
}) {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleShopNowClick = () => {
    setIsTermsModalOpen(true);
  };

  const handleTermsAccept = () => {
    setIsTermsModalOpen(false);
    setIsProductModalOpen(true);
  };

  return (
    <div
      className={`rounded-[3.2rem] overflow-hidden ${product.color} flex flex-col h-full`}>
      <div className="aspect-w-16 aspect-h-9">
        <Image
          src={product.image}
          alt={product.title}
          height={100}
          width={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-sm text-center font-semibold mb-4">
          {product.title}
        </h3>
        <Button
          className="bg-[#1c1c1c] text-white py-2 px-4 rounded-full flex items-center justify-center w-full mt-auto"
          onClick={handleShopNowClick}>
          {isBundleCard ? "BUY ALL" : "SHOP NOW"}
          <MemoArrow className="ml-2 h-8 w-8" />
        </Button>
      </div>
      <TermsAndConditionsModal
        isOpen={isTermsModalOpen}
        onAccept={handleTermsAccept}
        onClose={() => setIsTermsModalOpen(false)}
      />
      <ProductDetailsModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={product}
      />
    </div>
  );
}

export default function ProductGallery() {
  const bundleProduct: Product = {
    id: 4,
    title: "Buy All Planners",
    image: "/allPlanner.png",
    color: "bg-gradient-to-r from-purple-100 to-pink-100",
  };

  return (
    <section className="hsection sm:my-32 my-10 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-4">
          PRODUCT GALLERY
        </h2>
        <p className="sm:text-xl text-center text-gray-600 mb-12">
          From discovering new tracks to supporting your favorite artists.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div className="h-full flex" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <div className="w-full md:w-1/2 lg:w-1/4">
            <ProductCard product={bundleProduct} isBundleCard={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
