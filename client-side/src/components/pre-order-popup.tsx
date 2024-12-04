"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PreOrderPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPreOrderPopup");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // Show popup after 3 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenPreOrderPopup", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pre-order Now Available!</DialogTitle>
          <DialogDescription>
            Get ready for an amazing year of faith and organization.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>
            Be the first to receive our brand new 2025 Faith Planner. Pre-order
            now and get exclusive early-bird bonuses!
          </p>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="secondary" onClick={handleClose}>
            Maybe later
          </Button>
          <Button
            onClick={() => {
              // Add your pre-order logic here
              console.log("Pre-order button clicked");
              handleClose();
            }}>
            Pre-order Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
