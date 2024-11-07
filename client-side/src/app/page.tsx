"use client";
import CoreFeatures from "@/components/CoreFeatures";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowToUseSection from "@/components/HowToUseSection";
import Navbar from "@/components/Navbar";
import ProductGallery from "@/components/ProductGallery";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { useRef } from "react";

export default function Home() {
  const homeRef = useRef(null);
  const howToUseRef = useRef(null);
  return (
    <div>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <main className="mt-16 sm:mt-10">
        <div ref={homeRef}>
          <HeroSection />
        </div>

        <CoreFeatures />
        <ProductGallery />
        <DonationSection />
        <div ref={howToUseRef}>
          <HowToUseSection />
        </div>
        <TestimonialCarousel />
        <Footer />
      </main>
    </div>
  );
}
