// import ProductReviewsClient from "@/components/ProductReviewsClient";
// import { products } from "@/data/products";
// import { getApprovedReviews } from "@/lib/api";
// import { notFound } from "next/navigation";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// // interface PageProps {
// //   params: { id: string }; // Change from Promise<{ id: string }> to { id: string }
// // }

// export default async function ProductReviews({ params }: PageProps) {
//   // Await the params before using them
//   const { id } = await params;
//   const product = products.find((p) => p.id === id);

//   if (!product) {
//     notFound();
//   }

//   const reviews = await getApprovedReviews();

//   return <ProductReviewsClient product={product} initialReviews={reviews} />;
// }

import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetail from "@/components/ProductDetail";
import type { Metadata } from "next";
import ProductReviewsClient from "@/components/ProductReviewsClient";
import { getApprovedReviews } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const reviews = await getApprovedReviews();

  return <ProductReviewsClient product={product} initialReviews={reviews} />;
}
