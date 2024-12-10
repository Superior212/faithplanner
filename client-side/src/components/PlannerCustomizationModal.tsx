"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PlannerCustomizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (customizationData: {
    isGift: boolean;
    coverColor: string;
    paperType: string;
    customMessage: string;
    recipientName: string;
    recipientAddress: string;
  }) => void;
}

export function PlannerCustomizationModal({
  open,
  onOpenChange,
  onComplete,
}: PlannerCustomizationModalProps) {
  const [isGift, setIsGift] = useState<boolean | null>(null);
  const [coverColor, setCoverColor] = useState("black");
  const [paperType, setPaperType] = useState("lined");
  const [customMessage, setCustomMessage] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  const handleSelection = (value: string) => {
    if (value === "self") {
      onComplete({
        isGift: false,
        coverColor,
        paperType,
        customMessage,
        recipientName,
        recipientAddress,
      });
      onOpenChange(false);
      resetForm();
    } else {
      setIsGift(true);
    }
  };

  const handleComplete = () => {
    const customizationData = {
      isGift: true,
      coverColor,
      paperType,
      customMessage,
      recipientName,
      recipientAddress,
    };
    onComplete(customizationData);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setIsGift(null);
    setCoverColor("black");
    setPaperType("lined");
    setCustomMessage("");
    setRecipientName("");
    setRecipientAddress("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[370px] sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Customize your gift</DialogTitle>
          <DialogDescription>
            Is this planner for you or a gift for a loved one?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <RadioGroup onValueChange={handleSelection}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="self" id="self" />
              <Label htmlFor="self">For myself</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gift" id="gift" />
              <Label htmlFor="gift">As a gift</Label>
            </div>
          </RadioGroup>

          {isGift && (
            <>
              <div>
                <Label htmlFor="custom-message">Custom Message</Label>
                <Textarea
                  id="custom-message"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Enter a custom message (optional)"
                />
              </div>

              <div>
                <Label htmlFor="recipient-name">Recipient&apos;s Name</Label>
                <Input
                  id="recipient-name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Enter recipient's name"
                />
              </div>

              <div>
                <Label htmlFor="recipient-address">
                  Recipient&apos;s mailing address (please verify for accuracy)
                </Label>
                <Textarea
                  id="recipient-address"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter recipient's address"
                />
              </div>

              <Button onClick={handleComplete} className="w-full">
                Add to Cart
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
