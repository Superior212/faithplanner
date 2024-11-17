"use client";

import Cart from "@/components/Cart";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();

  return (
    <Cart
      items={items}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
    />
  );
}
