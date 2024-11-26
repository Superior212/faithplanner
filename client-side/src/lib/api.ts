// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const API_URL = "http://localhost:8000/api";
// http://localhost:8000/api/reviews/approved

export async function getApprovedReviews() {
  const response = await fetch(`${API_URL}/reviews/approved`);
  if (!response.ok) {
    throw new Error("Failed to fetch approved reviews");
  }
  return response.json();
}

export async function submitReview(reviewData: {
  rating: number;
  review: string;
}) {
  if (!API_URL) {
    throw new Error("API URL is not defined");
  }

  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Review submitted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
}
