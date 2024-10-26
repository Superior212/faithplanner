"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import DonationModal from "./Modals/DonationModal";

export default function DonationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="my-10 bg-white py-16 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h2 className="text-base md:text-4xl font-bold leading-tight mb-4">
            GET PAID FOR SUPPORTING OUR MISSION
          </h2>
          <p className="text-gray-600 mb-8 max-w-sm">
            As a gesture of appreciation, we're offering a unique opportunity
            for you to get rewarded for your involvement and contributions
          </p>
          <Button
            className="bg-[#BFF01A] hover:bg-[#BFF01A] text-black font-[700] py-6 px-8 rounded-full text-lg"
            onClick={() => setIsModalOpen(true)}>
            GET DONATION
          </Button>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <Image src="/donation.svg" width={500} height={500} alt="Donation" />
        </div>
      </div>
      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
