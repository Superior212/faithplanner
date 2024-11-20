// "use client";

// import { useState } from "react";
// import MemoArrow from "@/icons/Arrow";
// import Image from "next/image";
// // import ProductDetailsModal from "./Modals/ProductDetailsModal";
// import { products } from "@/lib/data";
// import { Button } from "@/components/ui/button";
// // import TermsAndConditionsModal from "./Modals/TermsAndConditionsModal";

// interface Product {
//   id: number;
//   title: string;
//   image: string;
//   img?: string;
//   subtitle?: string;
// }

// function ProductCard({
//   product,
//   isBundleCard = false,
// }: {
//   product: Product;
//   isBundleCard?: boolean;
// }) {
//   // const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
//   // const [isProductModalOpen, setIsProductModalOpen] = useState(false);

//   // const handleShopNowClick = () => {
//   //   setIsTermsModalOpen(true);
//   // };

//   // const handleTermsAccept = () => {
//   //   setIsTermsModalOpen(false);
//   //   setIsProductModalOpen(true);
//   // };

//   return (
//     <div className="group perspective">
//       <div
//         className={`
//       rounded-[3.2rem] overflow-hidden ${product} flex flex-col h-full
//       shadow-xl transition-all duration-300 ease-in-out
//       group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:rotate-y-10
//       transform-style-preserve-3d
//     `}>
//         <div className="relative pt-[100%] overflow-hidden rounded-t-[3.2rem]">
//           {isBundleCard ? (
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="relative w-full h-full">
//                 <Image
//                   src={product.image}
//                   alt={product.title}
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="relative w-2/4 h-2/4 transform rotate-[-15deg] translate-x-1 translate-y-16 shadow-lg rounded-[2.4rem] overflow-hidden">
//                     <Image
//                       src={product.img || "/default-image.jpg"}
//                       alt={product.subtitle || ""}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <Image
//               src={product.image}
//               alt={product.title}
//               fill
//               className="object-cover"
//             />
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//         </div>
//         <div className="p-6 flex flex-col flex-grow bg-white">
//           <h3 className="text-sm text-center font-semibold mb-2">
//             {product.title}
//           </h3>
//           {isBundleCard && product.subtitle && (
//             <p className="text-xs text-center text-gray-600 mb-4">
//               {product.subtitle}
//             </p>
//           )}
//           {/* <Button
//             className="bg-[#1c1c1c] text-white py-2 px-4 rounded-full flex items-center justify-center w-full mt-auto
//                      transition-all duration-300 ease-in-out hover:bg-[#333] hover:scale-105"
//             onClick={handleShopNowClick}>
//             {isBundleCard ? "BUY ALL" : "Add to cart"}
//             <MemoArrow className="ml-2 h-8 w-8" />
//           </Button> */}
//         </div>
//       </div>
//       {/* <TermsAndConditionsModal
//         isOpen={isTermsModalOpen}
//         onAccept={handleTermsAccept}
//         onClose={() => setIsTermsModalOpen(false)}
//       /> */}
//       {/* <ProductDetailsModal
//         isOpen={isProductModalOpen}
//         onClose={() => setIsProductModalOpen(false)}
//         // product={product}
//       /> */}
//     </div>
//   );
// }

// export default function ProductGallery() {
//   const bundleProduct: Product = {
//     id: 4,
//     title: "Buy all planners for 2025 and save.",
//     subtitle: "Great for a Holiday Gift",
//     image: "/multiple.jpg",
//     img: "/ribbon.png",
//   };

//   return (
//     <section className="hsection sm:my-32 my-10 py-16 bg-white">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-2xl md:text-5xl font-bold text-center mb-4">
//           PRODUCT GALLERY
//         </h2>
//         <p className="sm:text-xl text-center text-gray-600 mb-12">
//           Finish 2024 strong with the Inspiring Faith 2024 Teaser Version!
//           Packed with everything in our 2025 edition, it&apos;s just what you
//           need to stay organized and end the year with purpose.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <div className="h-full flex" key={product.id}>
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>
//         <div className="mt-12 flex justify-center">
//           <div className="w-full md:w-1/2 lg:w-1/4">
//             <ProductCard product={bundleProduct} isBundleCard={true} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
