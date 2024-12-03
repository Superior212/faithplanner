import { create } from "zustand";

type PreOrderBannerStore = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export const usePreOrderBanner = create<PreOrderBannerStore>((set) => ({
  isVisible: true,
  setIsVisible: (isVisible) => set({ isVisible }),
}));
