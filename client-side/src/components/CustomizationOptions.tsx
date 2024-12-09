"use client";

import { useState } from "react";
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

interface CustomizationOptionsProps {
  onComplete: () => void;
}

export function CustomizationOptions({
  onComplete,
}: CustomizationOptionsProps) {
  const [coverColor, setCoverColor] = useState("black");
  const [paperType, setPaperType] = useState("lined");
  const [name, setName] = useState("");

  const handleComplete = () => {
    // Here you would typically save the customization options
    console.log("Customization options:", { coverColor, paperType, name });
    onComplete();
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cover-color">Cover Color</Label>
        <Select onValueChange={setCoverColor} defaultValue={coverColor}>
          <SelectTrigger id="cover-color">
            <SelectValue placeholder="Select cover color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="black">Black</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="green">Green</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="paper-type">Paper Type</Label>
        <RadioGroup onValueChange={setPaperType} defaultValue={paperType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lined" id="lined" />
            <Label htmlFor="lined">Lined</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dotted" id="dotted" />
            <Label htmlFor="dotted">Dotted</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="blank" id="blank" />
            <Label htmlFor="blank">Blank</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="name">Name (for personalization)</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <Button onClick={handleComplete} className="w-full">
        Add to Cart and Checkout
      </Button>
    </div>
  );
}
