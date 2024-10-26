"use client";
import { useState } from "react";
import ProductDetailsModal from "./Modals/ProductDetailsModal";
import { products } from "@/lib/data";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className=" sm:min-h-[60vh] h-[40vh] flex items-center justify-center relative overflow-hidden">
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-[45rem] ">
          <h1 className="text-[#1A1E23] text-3xl sm:text-4xl md:text-[4.5rem] font-bold sm:leading-tight mb-8">
            New way to stay in sync with all events
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-[#BFF01A] text-[#1c1c1c] font-semibold py-2 px-8 rounded-full text-lg">
            Explore
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-[#1A1E23] text-[#1A1E23] font-semibold py-2 px-8 rounded-full text-lg">
            Shop Now
          </button>
        </div>
      </div>
      {/* <div className="absolute bottom-0 right-0 w-full h-full">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMinYMin slice">
          <path
            fill="none"
            stroke="#c5ff00"
            strokeWidth="0.5"
            d="M100,0 A100,100 0 0,1 200,100"
          />
          <path
            fill="none"
            stroke="#c5ff00"
            strokeWidth="0.5"
            d="M150,0 A150,150 0 0,1 300,150"
            transform="translate(-100, -50)"
          />
        </svg>
      </div> */}

      <ProductDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={products[0]}
      />
    </div>
  );
}
