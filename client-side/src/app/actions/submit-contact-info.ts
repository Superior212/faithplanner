"use server";

import { FormData } from "@/lib/type";

export async function submitContactInfo(formData: FormData) {
  // Here you would typically save this data to your database
  // For this example, we'll just log it and return a success message
  console.log("Received form data:", formData);

  // Simulate a delay to mimic a database operation
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // You can perform validation here and throw an error if the data is invalid
  if (
    !formData.email ||
    !formData.firstName ||
    !formData.lastName ||
    !formData.address
  ) {
    throw new Error("Please fill in all required fields");
  }

  return {
    success: true,
    message: "Contact information submitted successfully",
  };
}
