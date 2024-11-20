"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  const handleShopNowClick = () => {
    router.push("/products");
  };

  return (
    <div className="min-h-[42vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="text-center w-full max-w-4xl mx-auto">
        <div className="my-4 sm:my-12 md:my-16">
          <h1 className="text-[#1A1E23] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            What is the Faith Planner?
          </h1>
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg">
              The Faith Planner is a schedule planner and journal tool that
              gives you features to assist with a faith-based life that has many
              different obligations. The Faith planner is based on a fundamental
              question. How do I keep God involved in my life with so many
              things that consume my time?
            </p>
            <p className="font-bold text-base sm:text-lg md:text-xl">
              Look no further for this answer!
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 mb-8 sm:mb-16">
          <Link href="/products">
            <button className="bg-[#BFF01A] text-[#1c1c1c] font-semibold py-2 px-8 sm:px-12 rounded-full text-base sm:text-lg transition-all duration-300 hover:bg-[#a8d617] hover:shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
