"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  _id: string;
  rating: number;
  review: string;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
  initialDisplayCount?: number;
}

export function ReviewList({
  reviews,
  initialDisplayCount = 3,
}: ReviewListProps) {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="space-y-4">
      {reviews.slice(0, displayCount).map((review) => (
        <div key={review._id} className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="flex"
              aria-label={`Rating: ${review.rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-foreground">{review.review}</p>
        </div>
      ))}
      {displayCount < reviews.length && (
        <Button onClick={handleShowMore} variant="outline" className="w-full">
          Show More Reviews
        </Button>
      )}
    </div>
  );
}
