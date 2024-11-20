import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import React from "react";
import Navbar from "@/components/Navbar";

export default function Products() {
  const howToUseRef = React.createRef<HTMLDivElement>();
  const homeRef = React.createRef<HTMLDivElement>();

  return (
    <>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <main className="mt-[4.6rem] sm:mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              Products
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full">
                <div className="relative aspect-w-1 aspect-h-1 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    height={300}
                    width={300}
                    className="group-hover:scale-105 w-full h-full transition-transform duration-200"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    {product.teaser ? (
                      <>
                        <p className="text-sm text-gray-500 line-through">
                          ${product.price}
                        </p>
                        <p className="text-lg text-indigo-600 font-semibold">
                          ${product.teaser}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-600">${product.price}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
