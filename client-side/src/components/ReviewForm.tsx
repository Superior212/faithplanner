"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { submitReview } from "@/lib/api"; // Make sure this path is correct

interface ReviewFormProps {
  productId: string;
  onSubmit: () => Promise<void>;
}

export function ReviewForm({  onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await submitReview({ rating, review });
      setRating(0);
      setReview("");
      await onSubmit();
      // Optionally, you can add a success message here
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="rating" className="block text-sm font-medium mb-1">
          Rating
        </label>
        <div
          className="flex items-center"
          role="group"
          aria-label="Rating selection">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              aria-pressed={star <= rating}>
              <Star className="w-6 h-6" />
              <span className="sr-only">
                {star} star{star !== 1 ? "s" : ""}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="review" className="block text-sm font-medium mb-1">
          Review
        </label>
        <Textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          className="w-full"
        />
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <Button type="submit" disabled={isSubmitting || rating === 0}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
