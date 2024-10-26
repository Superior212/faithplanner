import CoreFeatures from "@/components/CoreFeatures";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowToUseSection from "@/components/HowToUseSection";
import Navbar from "@/components/Navbar";
import ProductGallery from "@/components/ProductGallery";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="mt-16 sm:mt-10">
        <HeroSection />
        <CoreFeatures />
        <ProductGallery />
        <DonationSection />
        <HowToUseSection />
        <TestimonialCarousel />
        <Footer />
      </main>
    </div>
  );
}
