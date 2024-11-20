import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { gallery, products } from "@/data/products";
import Navbar from "@/components/Navbar";
import React from "react";
import AddToCartButton from "./AddToCartButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetail({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 4);
  const howToUseRef = React.createRef<HTMLDivElement>();
  const homeRef = React.createRef<HTMLDivElement>();

  return (
    <>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <main className="mt-[4.6rem] sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {gallery.map((image, i) => (
                  <div
                    key={i}
                    className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={image.image}
                      alt={`${product.name} view ${i + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">(5 reviews)</span>
              </div>

              <div className="text-3xl font-bold text-indigo-600 mb-6">
                ${product.price}
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <AddToCartButton product={product} />

              {/* Product Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Features
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Daily Prompts</li>
                  <li>Weekly Bible Verses</li>
                  <li>God’s Time Section</li>
                  <li>Comprehensive Planning</li>
                  <li>Stewardship Tracker</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You may also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200">
                  <div className="aspect-w-1 aspect-h-1">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={100}
                      height={100}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-indigo-600 font-bold">
                      ${relatedProduct.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
