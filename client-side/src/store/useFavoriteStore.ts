import { Product } from "@/lib/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteStore {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoriteStore = create(
  persist<FavoriteStore>(
    (set, get) => ({
      favorites: [],
      addFavorite: (product) =>
        set((state) => ({
          favorites: [...state.favorites, product],
        })),
      removeFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== productId),
        })),
      isFavorite: (productId) =>
        get().favorites.some((p) => p.id === productId),
    }),
    {
      name: "favorite-store",
    }
  )
);
