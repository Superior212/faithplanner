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
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  title: string;
  image: string;
  color: string;
}

interface FormData {
  name: string;
  email: string;
  heardFrom: {
    source: string;
    details: string;
  };
}

export default function ProductDetailsModal({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}) {
  const initialFormData: FormData = {
    name: "",
    email: "",
    heardFrom: {
      source: "",
      details: "",
    },
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiUrl = "https://faithplanner-server.vercel.app/api";
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
      setFormData(initialFormData);
      onClose();

      // Redirect to the external purchase link
      window.location.href =
        "https://www.lulu.com/shop/a-remnant-company/inspiring-faith-planner-and-journal/paperback/product-jez8d4v.html";
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
    if (name === "name" || name === "email") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        heardFrom: {
          ...prev.heardFrom,
          details: value,
        },
      }));
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      heardFrom: {
        source: value,
        details: "",
      },
    }));
  };

  const handleSocialMediaChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      heardFrom: {
        ...prev.heardFrom,
        details: value,
      },
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-sm p-2">
            Shop Now: {product.title}
          </DialogTitle>
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
              value={formData.heardFrom.source}
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
          {formData.heardFrom.source === "church" && (
            <div>
              <Label htmlFor="churchName">Church Name</Label>
              <Input
                id="churchName"
                name="heardFromDetails"
                value={formData.heardFrom.details}
                onChange={handleChange}
                placeholder="Enter church name"
              />
            </div>
          )}
          {formData.heardFrom.source === "socialMedia" && (
            <div>
              <Label>Social Media Platform</Label>
              <RadioGroup
                value={formData.heardFrom.details}
                onValueChange={handleSocialMediaChange}
                className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Facebook" id="facebook" />
                  <Label htmlFor="facebook">Facebook</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Instagram" id="instagram" />
                  <Label htmlFor="instagram">Instagram</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TikTok" id="tiktok" />
                  <Label htmlFor="tiktok">TikTok</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          {formData.heardFrom.source === "other" && (
            <div>
              <Label htmlFor="otherSource">Please specify</Label>
              <Input
                id="otherSource"
                name="heardFromDetails"
                value={formData.heardFrom.details}
                onChange={handleChange}
                placeholder="Enter where you heard about us"
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
