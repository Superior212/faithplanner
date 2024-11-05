"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import MemoLogo from "@/icons/Logo";
import Link from "next/link";
import DonationModal from "./Modals/DonationModal";

interface NavbarProps {
  howToUseRef: React.RefObject<HTMLDivElement>;
  homeRef: React.RefObject<HTMLDivElement>;
}

export default function Navbar({ howToUseRef, homeRef }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); // Close menu on mobile
  };

  return (
    <nav className="p-4 sm:px-16 h-20  fixed w-full top-0 z-10 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="">
          <MemoLogo className="sm:w-80 w-60 h-10 sm:h-10" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
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
          <Link href="/contact" className="text-[#1A1E23] hover:text-[#1A1E23]">
            Contact Us
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#CCFF00] text-black px-8 py-2 rounded-full font-semibold">
            Get Donation
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="text-[#1A1E23] w-6 h-6" />
            ) : (
              <Menu className="text-[#1A1E23] w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full h-56">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-[#1A1E23] hover:text-[#1A1E23] block px-3 py-2">
              Home
            </Link>
            <Link
              onClick={() => handleScroll(howToUseRef)}
              href="#"
              className="text-[#1A1E23] hover:text-[#1A1E23] block px-3 py-2">
              How to Use
            </Link>
            <Link
              href="/contact"
              className="text-[#1A1E23] hover:text-[#1A1E23] block px-3 py-2">
              Contact Us
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#CCFF00] text-black px-4 py-3 rounded-full font-semibold w-full mt-2">
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
