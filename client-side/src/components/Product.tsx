import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

export default function Component() {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <main className="hsection ">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-4">
          PRODUCT GALLERY
        </h2>

        <p className="sm:text-xl text-center text-gray-600 mb-12">
          Finish 2024 strong with the Inspiring Faith 2024 Teaser Version!
          Packed with everything in our 2025 edition, it&apos;s just what you
          need to stay organized and end the year with purpose.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-full">
              <div className="h-64 overflow-hidden">
                <Image
                  width={300}
                  height={200}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-primary">
                    {/* ${product.price} */}
                  </span>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
