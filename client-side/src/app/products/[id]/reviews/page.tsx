/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import type { Metadata } from "next";
import ProductReviewsClient from "@/components/ProductReviewsClient";
import { getApprovedReviews } from "@/lib/api";
import React from "react";

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

  const howToUseRef = React.createRef<HTMLDivElement>();
  const homeRef = React.createRef<HTMLDivElement>();

  return (
    <ProductReviewsClient
      product={product}
      initialReviews={reviews}
      howToUseRef={howToUseRef}
      homeRef={homeRef}
    />
  );
}
