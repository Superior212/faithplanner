"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllReviews, approveReview } from "@/lib/api-service";

interface Review {
  _id: string;
  rating: number;
  review: string;
  approved: boolean;
}

export function ReviewTable() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getAllReviews();
      setReviews(data);
      updateStats(data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch reviews. Please try again.");
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (reviews: Review[]) => {
    const total = reviews.length;
    const approved = reviews.filter((review) => review.approved).length;
    const pending = total - approved;
    setStats({ total, approved, pending });
  };

  const handleApproveReview = async (reviewId: string) => {
    try {
      await approveReview(reviewId);
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId ? { ...review, approved: true } : review
        )
      );
      updateStats(
        reviews.map((review) =>
          review._id === reviewId ? { ...review, approved: true } : review
        )
      );
    } catch (error) {
      setError("Failed to approve review. Please try again.");
      console.error("Error approving review:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rating</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review._id}>
              <TableCell>{review.rating}</TableCell>
              <TableCell>{review.review}</TableCell>
              <TableCell>{review.approved ? "Approved" : "Pending"}</TableCell>
              <TableCell>
                {review.approved ? (
                  <span className="text-green-600 font-medium">Approved</span>
                ) : (
                  <Button onClick={() => handleApproveReview(review._id)}>
                    Approve
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
