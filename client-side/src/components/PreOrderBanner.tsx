import { usePreOrderBanner } from "@/hooks/usePreOrderBanner";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export function PreOrderBanner() {
  const router = useRouter();
  const { isVisible, setIsVisible } = usePreOrderBanner();

  if (!isVisible) return null;

  return (
    <div className="bg-[#CCFF00] text-black font-[700] py-6 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <p className="sm:text-base text-sm font-medium">
          Pre-order your 2025 planner now!
        </p>
        <div className="flex items-center space-x-4">
          <Button
           onClick={() => {
            router.push("/products")}}  size="sm" className="text-xs">
            Order Now
          </Button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="Close announcement">
            <X className="text-black" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
