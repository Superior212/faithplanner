import ProductReviewsClient from "@/components/ProductReviewsClient";
import { products } from "@/data/products";
import { getApprovedReviews } from "@/lib/api";
import { notFound } from "next/navigation";


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductReviews({ params }: PageProps) {
  // Await the params before using them
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const reviews = await getApprovedReviews();

  return <ProductReviewsClient product={product} initialReviews={reviews} />;
}
