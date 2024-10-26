import MemoArrow from "@/icons/Arrow";
import Image from "next/image";

export default function ProductGallery() {
  const products = [
    {
      id: 1,
      title: "4K UHD LED Smart TV with Chromecast Built-in",
      image: "/product.svg",
      color: "bg-[#D6D8DB]",
    },
    {
      id: 2,
      title: "4K UHD LED Smart TV with Chromecast Built-in",
      image: "/product.svg",
      color: "bg-[#BFF01A]",
    },
    {
      id: 3,
      title: "4K UHD LED Smart TV with Chromecast Built-in",
      image: "/product.svg",
      color: "bg-[#D6D8DB]",
    },
  ];

  return (
    <section className="hsection sm:my-32 my-10 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-4">
          PRODUCT GALLERY
        </h2>
        <p className="sm:text-xl text-center text-gray-600 mb-12">
          From discovering new tracks to supporting your favorite artists.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  title,
  image,
  color,
}: {
  title: string;
  image: string;
  color: string;
}) {
  return (
    <div className={`rounded-[3.2rem] overflow-hidden ${color}`}>
      <div className="aspect-w-16 aspect-h-9">
        <Image
          src={image}
          alt={title}
          height={20}
          width={20}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <button className="bg-[#1c1c1c] text-white py-2 px-4 rounded-full flex items-center justify-center w-full">
          SHOP NOW
          <MemoArrow className="ml-2 h-8 w-8" />
        </button>
      </div>
    </div>
  );
}
