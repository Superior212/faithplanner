import { create } from 'zustand';

interface Review {
  id: string;
  date: string;
  productId: string;
  // Add other fields as necessary
}


interface ReviewStore {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getProductReviews: (productId: string) => Review[];
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
  reviews: [],
  addReview: (reviewData) =>
    set((state) => ({
      reviews: [
        ...state.reviews,
        {
          ...reviewData,
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toISOString(),
        },
      ],
    })),
  getProductReviews: (productId) =>
    get().reviews.filter((review) => review.productId === productId),
}));