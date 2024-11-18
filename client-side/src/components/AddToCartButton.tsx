"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface Product {
  id: string;
  name: string;
  price: number;
}

interface AddToCartButtonProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function AddToCartButton({
  product,
  onAddToCart,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
//   const { toast } = useToast();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    // toast({
    //   title: "Added to cart",
    //   description: `${quantity} x ${product.name} added to your cart.`,
    // });
  };

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={decrementQuantity}
          aria-label="Decrease quantity">
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center mx-2"
          aria-label="Quantity"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={incrementQuantity}
          aria-label="Increase quantity">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button onClick={handleAddToCart} className="w-full sm:w-auto">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
}
