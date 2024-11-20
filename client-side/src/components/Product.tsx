"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import TermsAndConditionsModal from "./Modals/TermsAndConditionsModal";
import ProductDetailsModal from "./Modals/ProductDetailsModal";
import DonationPreferenceModal from "./Modals/Modals/DonationPreferenceModal";


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  featured: boolean;
  teaser?: number;
}

export default function ProductComponent() {
  const router = useRouter();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featuredProducts = products.filter(
    (product) => product.featured
  ) as Product[];

  const handleOpenDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDonationModalOpen(true);
  };

  const handleDonationAccept = () => {
    setIsDonationModalOpen(false);
    setIsTermsModalOpen(true);
  };

  const handleDonationDecline = () => {
    setIsDonationModalOpen(false);
    if (selectedProduct) {
      router.push(`/products/${selectedProduct.id}`);
    }
  };

  const handleTermsAccept = () => {
    setIsTermsModalOpen(false);
    setIsProductModalOpen(true);
  };

  const handleProductDetailsClose = () => {
    setIsProductModalOpen(false);
    if (isFormSubmitted && selectedProduct) {
      console.log("Routing to:", `/products/${selectedProduct.id}`);
      router.push(`/products/${selectedProduct.id}`);
    } else {
      router.push("/");
    }
    setIsFormSubmitted(false);
  };

  return (
    <main className="bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-4">
          PRODUCT GALLERY
        </h2>
        <p className="sm:text-xl text-center text-muted-foreground mb-12">
          Finish 2024 strong with the Inspiring Faith 2024 Teaser Version!
          Packed with everything in our 2025 edition, it&apos;s just what you
          need to stay organized and end the year with purpose.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-card rounded-lg shadow-md overflow-hidden h-full cursor-pointer"
              onClick={() => handleOpenDialog(product)}>
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    {product.teaser ? (
                      <>
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          ${product.teaser}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
                      </span>
                    )}
                  </div>
                  <Button>View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DonationPreferenceModal
        isOpen={isDonationModalOpen}
        onAccept={handleDonationAccept}
        onDecline={handleDonationDecline}
      />

      <TermsAndConditionsModal
        isOpen={isTermsModalOpen}
        onAccept={handleTermsAccept}
        onClose={() => setIsTermsModalOpen(false)}
      />

      {selectedProduct && (
        <ProductDetailsModal
          isOpen={isProductModalOpen}
          onClose={handleProductDetailsClose}
          onFormSubmit={() => setIsFormSubmitted(true)}
          product={selectedProduct}
        />
      )}
    </main>
  );
}
