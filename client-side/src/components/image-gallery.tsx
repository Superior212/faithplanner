"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/g1.PNG",
    alt: "Faith Planner in Pink",
    caption: "Our signature Faith Planner in soft pink",
  },
  {
    id: 2,
    src: "/g2.PNG",
    alt: "Faith Planners Collection",
    caption: "Available in black, white, and blue",
  },
  {
    id: 3,
    src: "/g3.PNG",
    alt: "Window Light",
    caption: "Peaceful morning light",
  },
  {
    id: 4,
    src: "/g4.PNG",
    alt: "Faith Quote",
    caption: "Daily inspiration",
  },
  {
    id: 5,
    src: "/g6.JPG",
    alt: "Autumn Leaves",
    caption: "Seasonal beauty",
  },
  //   {
  //     id: 6,
  //     src: "/placeholder.svg?height=400&width=400",
  //     alt: "Digital Planner",
  //     caption: "Our new digital planner",
  //   },
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const previousIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center sm:text-3xl font-[700] py-8">
        How to use the faith planner
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            onClick={() => {
              setSelectedImage(image);
              setIsOpen(true);
            }}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-background p-0">
          <DialogTitle></DialogTitle>
          <div className="flex aspect-square max-h-[80vh] items-center justify-center">
            {selectedImage && (
              <>
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 z-10"
                  onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button> */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2"
                  onClick={handlePrevious}>
                  <span className="sr-only">Previous image</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2"
                  onClick={handleNext}>
                  <span className="sr-only">Next image</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
                {/* {selectedImage.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                    <p className="text-sm">{selectedImage.caption}</p>
                  </div>
                )} */}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
