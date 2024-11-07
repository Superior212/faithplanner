"use client";

import { useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
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

const scrollableContentClass =
  "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200";

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
  churchSelection: "listed" | "not-listed";
  addForDonations: boolean;
  churchDetails: {
    name: string;
    address: string;
    phoneNumber: string;
  };
}

const churchesInUS = [
  { id: "1", name: "First Baptist Church, Dallas, TX" },
  { id: "2", name: "Saddleback Church, Lake Forest, CA" },
  { id: "3", name: "Lakewood Church, Houston, TX" },
  { id: "4", name: "North Point Community Church, Alpharetta, GA" },
  { id: "5", name: "Willow Creek Community Church, South Barrington, IL" },
  { id: "6", name: "Christ Fellowship Church, Palm Beach Gardens, FL" },
  { id: "7", name: "Gateway Church, Southlake, TX" },
  { id: "8", name: "Crossroads Church, Cincinnati, OH" },
  { id: "9", name: "Life.Church, Edmond, OK" },
  { id: "10", name: "Christ's Church of the Valley, Peoria, AZ" },
];

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
    churchSelection: "listed",
    addForDonations: false,
    churchDetails: {
      name: "",
      address: "",
      phoneNumber: "",
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
    } else if (name.startsWith("churchDetails.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        churchDetails: {
          ...prev.churchDetails,
          [field]: value,
        },
      }));
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

  const handleChurchSelectionChange = (value: "listed" | "not-listed") => {
    setFormData((prev) => ({
      ...prev,
      churchSelection: value,
      heardFrom: {
        ...prev.heardFrom,
        details: "",
      },
    }));
  };

  const handleChurchChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      heardFrom: {
        ...prev.heardFrom,
        details: value,
      },
      churchDetails: {
        ...prev.churchDetails,
        name: value,
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

  const handleDonationChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      addForDonations: value === "yes",
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "sm:max-w-[425px] max-h-[80vh] overflow-y-auto",
          scrollableContentClass
        )}>
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
            <div className="space-y-4">
              <div>
                <Label>Do you see your referring church or ministry?</Label>
                <RadioGroup
                  value={formData.churchSelection}
                  onValueChange={handleChurchSelectionChange}
                  className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="listed" id="church-listed" />
                    <Label htmlFor="church-listed">Yes, I see my church</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-listed" id="church-not-listed" />
                    <Label htmlFor="church-not-listed">
                      No, I don't see my church
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {formData.churchSelection === "listed" ? (
                <div>
                  <Label htmlFor="churchSelect">Select Church</Label>
                  <Select
                    onValueChange={handleChurchChange}
                    value={formData.heardFrom.details}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a church" />
                    </SelectTrigger>
                    <SelectContent>
                      {churchesInUS.map((church) => (
                        <SelectItem key={church.id} value={church.name}>
                          {church.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <Label htmlFor="otherChurch">Enter your church name</Label>
                  <Input
                    id="otherChurch"
                    name="churchDetails.name"
                    value={formData.churchDetails.name}
                    onChange={handleChange}
                    placeholder="Enter church name"
                  />
                </div>
              )}
              <div>
                <Label>Would you like to add them to receive donations?</Label>
                <RadioGroup
                  value={formData.addForDonations ? "yes" : "no"}
                  onValueChange={handleDonationChange}
                  className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="donations-yes" />
                    <Label htmlFor="donations-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="donations-no" />
                    <Label htmlFor="donations-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              {formData.addForDonations && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="churchAddress">Church Address</Label>
                    <Input
                      id="churchAddress"
                      name="churchDetails.address"
                      value={formData.churchDetails.address}
                      onChange={handleChange}
                      placeholder="Enter church address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="churchPhone">Church Phone Number</Label>
                    <Input
                      id="churchPhone"
                      name="churchDetails.phoneNumber"
                      value={formData.churchDetails.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter church phone number"
                    />
                  </div>
                </div>
              )}
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
