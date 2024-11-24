"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery, products } from "@/data/products";
import Navbar from "@/components/Navbar";
import React, { useState, useRef } from "react";
import AddToCartButton from "@/app/products/[id]/AddToCartButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { id: string };
}

interface ArrowProps {
  onClick?: () => void;
}

function CustomNextArrow({ onClick }: ArrowProps) {
  return (
    <Button
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary rounded-full p-2"
      onClick={onClick}
      size="icon">
      <ChevronRight className="h-6 w-6" />
    </Button>
  );
}

function CustomPrevArrow({ onClick }: ArrowProps) {
  return (
    <Button
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primarye rounded-full p-2"
      onClick={onClick}
      size="icon">
      <ChevronLeft className="h-6 w-6" />
    </Button>
  );
}

const ProductDetail: React.FC<PageProps> = ({ params }) => {
  const { id } = params;
  const product = products.find((p) => p.id === id);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 4);
  const howToUseRef = React.useRef<HTMLDivElement>(null);
  const homeRef = React.useRef<HTMLDivElement>(null);

  const allImages = [product.image, ...gallery.map((g) => g.image)];

  const mainSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
  };

  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <main className="mt-[4.6rem] sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden relative">
                <Slider {...mainSettings} ref={sliderRef}>
                  {allImages.map((image, i) => (
                    <div key={i} className="aspect-w-1 aspect-h-1">
                      <div className="image-wrapper">
                        <Image
                          src={image}
                          alt={`${product.name} view ${i + 1}`}
                          width={500}
                          height={500}
                          className="w-full sm:h-[450px] object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="hidden sm:block">
                <Slider {...thumbnailSettings}>
                  {allImages.map((image, i) => (
                    <div key={i} className="px-1">
                      <button
                        onClick={() => sliderRef.current?.slickGoTo(i)}
                        className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden ${
                          currentSlide === i ? "ring-2 ring-primary" : ""
                        }`}>
                        <Image
                          src={image}
                          alt={`${product.name} thumbnail ${i + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-[100px] object-cover rounded-lg"
                        />
                      </button>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="flex items-center justify-center">
                <h1>Swipe to see details</h1>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">(5 reviews)</span>
              </div>
              <div className="flex flex-col mb-6">
                {product.teaser ? (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.price}
                    </span>
                    <span className="text-3xl font-bold text-indigo-600">
                      ${product.teaser}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-indigo-600">
                    ${product.price}
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <AddToCartButton product={product} />

              {/* Product Features */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Features
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Daily Prompts</li>
                  <li>Weekly Bible Verses</li>
                  <li>God&apos;s Time Section</li>
                  <li>Comprehensive Planning</li>
                  <li>Stewardship Tracker</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200">
                  <div className="aspect-w-1 aspect-h-1">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="w-full h-[300px] object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {relatedProduct.name}
                    </h3>
                    {relatedProduct.teaser ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground line-through">
                          ${relatedProduct.price}
                        </span>
                        <span className="text-lg font-bold text-indigo-600">
                          ${relatedProduct.teaser}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-indigo-600">
                        ${relatedProduct.price}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
