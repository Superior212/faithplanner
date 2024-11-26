"use client";

import React, { useState } from "react";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewList } from "@/components/ReviewList";
import { useCartStore } from "@/store/useCartStore";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Review {
  _id: string;
  rating: number;
  review: string;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductReviewsClientProps {
  initialReviews: Review[];
  product: Product;
  howToUseRef: React.RefObject<HTMLDivElement>;
  homeRef: React.RefObject<HTMLDivElement>;
}

export default function ProductReviewsClient({
  initialReviews,
  product,
  howToUseRef,
  homeRef,
}: ProductReviewsClientProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const { addItem } = useCartStore();
  const [quantity] = useState(1);
  const router = useRouter();

  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    router.push("/cart");
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews/${product.id}`);
      const fetchedReviews = await response.json();
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  return (
    <>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <main className="mt-[4.6rem] sm:mt-20">
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <Link
              href={`/products/${product.id}`}
              className="inline-flex items-center gap-2 text-indigo-600 mb-8 hover:text-indigo-700">
              <ArrowLeft size={20} />
              Back to Products
            </Link>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-96">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div>
                  <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                  <p className="text-gray-600 mb-6">{product.description}</p>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-indigo-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button
                      onClick={handleAddToCart}
                      className="flex-1 bg-primary text-primary-foreground">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                  </div>

                  <div className="border-t pt-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Customer Reviews
                    </h2>
                    <div className="mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">
                          {averageRating.toFixed(1)}
                        </span>
                        <span className="text-gray-500">out of 5</span>
                        <span className="text-gray-500">
                          ({reviews.length} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <ReviewList reviews={reviews} />
                      <div className="border-t pt-8">
                        <h3 className="text-lg font-semibold mb-4">
                          Write a Review
                        </h3>
                        <ReviewForm
                          productId={product.id}
                          onSubmit={fetchReviews}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
