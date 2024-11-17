import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

export default function Component() {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <main className="bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-4">
          PRODUCT GALLERY
        </h2>

        <p className="sm:text-xl text-center text-muted-foreground mb-12">
          Finish 2024 strong with the Inspiring Faith 2024 Teaser Version!
          Packed with everything in our 2025 edition, it&apos;s just what you
          need to stay organized and end the year with purpose.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${encodeURIComponent(product.id)}`}
              className="group flex flex-col bg-card rounded-lg shadow-md overflow-hidden h-full">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price?.toFixed(2)}
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
