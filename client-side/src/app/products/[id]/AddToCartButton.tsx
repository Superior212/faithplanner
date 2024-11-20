"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useFavoriteStore } from "@/store/useFavoriteStore";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { toast } = useToast();
  const { addItem } = useCartStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const [isFav, setIsFav] = useState(isFavorite(product.id));

  const handleAddToCart = () => {
    addItem(product, quantity);
    router.push("/cart");
  };

  const handleFavoriteToggle = () => {
    if (isFav) {
      removeFavorite(product.id);
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites.`,
      });
    } else {
      addFavorite(product);
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites.`,
      });
    }
    setIsFav(!isFav);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied",
          description: "The product link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Sharing failed",
        description: "There was an error while trying to share this product.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            -
          </Button>
          <span className="text-gray-900 font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}>
            +
          </Button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-primary text-primary-foreground">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleFavoriteToggle}
          className={isFav ? "text-red-500" : "text-gray-600"}>
          <Heart className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </div>
  );
}
