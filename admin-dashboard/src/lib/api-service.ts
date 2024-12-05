const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://faithplanner-server.vercel.app/api";

export async function getAllReviews() {
  const response = await fetch(`${API_BASE_URL}/reviews`);
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
}

export async function approveReview(reviewId: string) {
  const response = await fetch(
    `${API_BASE_URL}/reviews/${reviewId}/approve`,
    {
      method: "PATCH",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to approve review");
  }
  return response.json();
}
