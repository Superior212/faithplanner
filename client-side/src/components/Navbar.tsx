"use client";

import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import MemoLogo from "@/icons/Logo";
import Link from "next/link";
import DonationModal from "./Modals/DonationModal";
import { useCartStore } from "@/store/useCartStore";
import { usePreOrderBanner } from "@/hooks/usePreOrderBanner";

interface NavbarProps {
  howToUseRef: React.RefObject<HTMLDivElement>;
  homeRef: React.RefObject<HTMLDivElement>;
}

export default function Component(
  { howToUseRef, homeRef }: NavbarProps = {
    howToUseRef: { current: null },
    homeRef: { current: null },
  }
) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); // Close menu on mobile
  };

  const { items } = useCartStore();
  const { isVisible } = usePreOrderBanner();
  return (
    <nav
      className={`sticky z-10 h-20 w-full bg-white p-4 sm:px-16 transition-all duration-300 ${
        isVisible ? "top-0" : "top-0"
      }`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="">
          <MemoLogo className="h-10 w-60 sm:h-10 sm:w-80" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-6 md:flex">
          <Link
            onClick={() => handleScroll(homeRef)}
            href="/"
            className="text-[#1A1E23] hover:text-[#798da6]">
            Home
          </Link>
          <Link
            href="#"
            onClick={() => handleScroll(howToUseRef)}
            className="text-[#1A1E23] hover:text-[#1A1E23]">
            How to Use
          </Link>
          <Link href="/reviews" className="text-[#1A1E23] hover:text-[#1A1E23]">
            Reviews
          </Link>
          <Link
            href="/about-author"
            className="text-[#1A1E23] hover:text-[#1A1E23]">
            About the Author
          </Link>
          <Link href="/contact" className="text-[#1A1E23] hover:text-[#1A1E23]">
            Contact Us
          </Link>
          <Link
            href="/cart"
            className="text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 relative">
            <ShoppingCart className="h-6 w-6" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-[#CCFF00] px-8 py-2 font-semibold text-black">
            Get Donation
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#1A1E23]" />
            ) : (
              <Menu className="h-6 w-6 text-[#1A1E23]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="h-72 w-full bg-white md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 text-[#1A1E23] hover:text-[#1A1E23]">
              Home
            </Link>
            <Link
              onClick={() => handleScroll(howToUseRef)}
              href="#"
              className="block px-3 py-2 text-[#1A1E23] hover:text-[#1A1E23]">
              How to Use
            </Link>
            <Link
              href="/reviews"
              className="text-[#1A1E23] hover:text-[#1A1E23]">
              Reviews
            </Link>
            <Link
              href="/about-author"
              className="block px-3 py-2 text-[#1A1E23] hover:text-[#1A1E23]">
              About the Author
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-[#1A1E23] hover:text-[#1A1E23]">
              Contact Us
            </Link>
            <Link
              href="/cart"
              className="text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 relative mr-2">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 w-full rounded-full bg-[#CCFF00] px-4 py-3 font-semibold text-black">
              Get Donation
            </button>
          </div>
        </div>
      )}

      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </nav>
  );
}
