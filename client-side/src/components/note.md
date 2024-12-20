<!-- "use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { gallery, products } from "@/data/products";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import AddToCartButton from "@/app/products/[id]/AddToCartButton";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PageProps {
  params: { id: string };
}

interface ProductImageGalleryProps {
  product: {
    name: string;
    image: string;
  };
  gallery: Array<{ image: string }>;
}

const ProductDetail: React.FC<PageProps> = ({ params }) => {
  const { id } = params;
  const [currentImage, setCurrentImage] = useState<string>("");
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  React.useEffect(() => {
    if (!currentImage && product) {
      setCurrentImage(product.image);
    }
  }, [product, currentImage]);

  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 4);
  const howToUseRef = React.useRef<HTMLDivElement>(null);
  const homeRef = React.useRef<HTMLDivElement>(null);

  const [currentImage, setCurrentImage] = useState(product.image);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const allImages = [product.image, ...gallery.map((g) => g.image)];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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
                  src={currentImage || product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full sm:h-[450px] object-cover"
                />
              </div>
              {isMobile ? (
                <Slider {...settings}>
                  {allImages.map((image, i) => (
                    <div key={i} className="px-1">
                      <Image
                        src={image}
                        alt={`${product.name} view ${i + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-[100px] object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {allImages.map((image, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(image)}
                      className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden ${
                        currentImage === image ? "ring-2 ring-primary" : ""
                      }`}>
                      <Image
                        src={image}
                        alt={`${product.name} view ${i + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-[100px] object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
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
              <div className="flex flex-col mb-6">
                {product.teaser ? (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.price}
                    </span>
                    <span className="text-3xl font-bold text-indigo-600">
                      ${product.teaser}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-indigo-600">
                    ${product.price}
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <AddToCartButton product={product} />

              {/* Product Features */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Features
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Daily Prompts</li>
                  <li>Weekly Bible Verses</li>
                  <li>God&apos;s Time Section</li>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200">
                  <div className="aspect-w-1 aspect-h-1">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="w-full h-[300px] object-cover"
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
};

export default ProductDetail;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Button
      className={`${className} !absolute right-0 top-1/2 -translate-y-1/2 z-10`}
      style={{ ...style }}
      onClick={onClick}
      variant="outline"
      size="icon">
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Button
      className={`${className} !absolute left-0 top-1/2 -translate-y-1/2 z-10`}
      style={{ ...style }}
      onClick={onClick}
      variant="outline"
      size="icon">
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
} -->
