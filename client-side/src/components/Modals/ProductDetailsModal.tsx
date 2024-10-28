"use client";

import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  title: string;
  image: string;
  color: string;
}

function ProductDetailsModal({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    heardFrom: "",
    church: "",
    socialMedia: "",
    other: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${apiUrl}/details`, formData);
      console.log("Form submitted:", formData);
      toast({
        title: "Success",
        description: "Your information has been submitted successfully.",
        duration: 5000,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description:
          "There was a problem submitting your information. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      heardFrom: value,
      church: "",
      socialMedia: "",
      other: "",
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Shop Now: {product.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Where did you hear about faith planner?</Label>
            <RadioGroup
              value={formData.heardFrom}
              onValueChange={handleRadioChange}
              className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="church" id="church" />
                <Label htmlFor="church">Church</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="socialMedia" id="socialMedia" />
                <Label htmlFor="socialMedia">Social media</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
          {formData.heardFrom === "church" && (
            <div>
              <Label htmlFor="church">Select Church or Ministry</Label>
              <Select
                name="church"
                value={formData.church}
                onValueChange={handleSelectChange("church")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a church or ministry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="church1">Church 1</SelectItem>
                  <SelectItem value="church2">Church 2</SelectItem>
                  <SelectItem value="ministry1">Ministry 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {formData.heardFrom === "socialMedia" && (
            <div>
              <Label htmlFor="socialMedia">Select Social Media Platform</Label>
              <Select
                name="socialMedia"
                value={formData.socialMedia}
                onValueChange={handleSelectChange("socialMedia")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a social media platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {formData.heardFrom === "other" && (
            <div>
              <Label htmlFor="otherSpecify">Please specify</Label>
              <Input
                id="otherSpecify"
                name="other"
                value={formData.other}
                onChange={handleChange}
              />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsModal;
