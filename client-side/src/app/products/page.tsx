import Link from "next/link";
import { products } from "@/data/products";
import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Products() {
  const howToUseRef = React.createRef<HTMLDivElement>();
  const homeRef = React.createRef<HTMLDivElement>();

  return (
    <>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <main className="mt-[4.6rem] sm:mt-20">
        <div className="hsection">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              Products
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group flex flex-col bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full">
                    <div className="relative aspect-w-1 aspect-h-1 w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-bold text-primary">
                          ${product.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}