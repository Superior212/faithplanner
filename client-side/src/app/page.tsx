"use client";
import CoreFeatures from "@/components/CoreFeatures";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowToUseSection from "@/components/HowToUseSection";
import ImageGallery from "@/components/image-gallery";
import Navbar from "@/components/Navbar";
import NewsletterSignup from "@/components/newsletter-signup";
// import { PreOrderPopup } from "@/components/pre-order-popup";
import { PreOrderBanner } from "@/components/PreOrderBanner";
import Product from "@/components/Product";
// import ProductGallery from "@/components/ProductGallery";
import Review from "@/components/Review-form";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { useRef } from "react";

export default function Home() {
  const homeRef = useRef(null);
  const howToUseRef = useRef(null);

  return (
    <div>
      <PreOrderBanner />
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <main className="mt-28 sm:mt-10">
        {/* <PreOrderPopup /> */}
        <div ref={homeRef}>
          <HeroSection />
        </div>

        <CoreFeatures />
        {/* <ProductGallery /> */}
        <Product />
        <NewsletterSignup />
        <ImageGallery />
        <DonationSection />
        <div ref={howToUseRef}>
          <HowToUseSection />
        </div>
        <TestimonialCarousel />
        <Review />
        <Footer />
      </main>
    </div>
  );
}
