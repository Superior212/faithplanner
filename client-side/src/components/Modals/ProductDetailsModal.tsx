"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Country, State, City } from "country-state-city";

const scrollableContentClass =
  "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200";

interface Product {
  id: number;
  title: string;
  image: string;
  color: string;
}

interface ICountry {
  isoCode: string;
  name: string;
}

interface IState {
  isoCode: string;
  name: string;
}

interface ICity {
  name: string;
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
    address: {
      country: string;
      state: string;
      city: string;
      postalCode: string;
    };
    phoneNumber: {
      type: "us" | "international";
      number: string;
    };
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
      address: {
        country: "",
        state: "",
        city: "",
        postalCode: "",
      },
      phoneNumber: {
        type: "us",
        number: "",
      },
    },
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const apiUrl = "https://faithplanner-server.vercel.app/api";
  const { toast } = useToast();

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (formData.churchDetails.address.country) {
      setStates(
        State.getStatesOfCountry(formData.churchDetails.address.country)
      );
    }
  }, [formData.churchDetails.address.country]);

  useEffect(() => {
    if (
      formData.churchDetails.address.country &&
      formData.churchDetails.address.state
    ) {
      setCities(
        City.getCitiesOfState(
          formData.churchDetails.address.country,
          formData.churchDetails.address.state
        )
      );
    }
  }, [
    formData.churchDetails.address.country,
    formData.churchDetails.address.state,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let submissionData = { ...formData };

      if (formData.heardFrom.source === "church") {
        if (formData.churchSelection === "not-listed") {
          submissionData = {
            ...submissionData,
            heardFrom: {
              ...submissionData.heardFrom,
              details: submissionData.churchDetails.name,
            },
          };
        } else {
          submissionData = {
            ...submissionData,
            churchDetails: {
              ...submissionData.churchDetails,
              name: submissionData.heardFrom.details,
            },
          };
        }
      }

      if (
        !submissionData.name ||
        !submissionData.email ||
        !submissionData.heardFrom.source ||
        !submissionData.heardFrom.details
      ) {
        throw new Error("Please fill in all required fields");
      }

      await axios.post(`${apiUrl}/details`, submissionData);
      console.log("Form submitted:", submissionData);
      toast({
        title: "Success",
        description: "Your information has been submitted successfully.",
        duration: 5000,
      });
      setFormData(initialFormData);

      if (formData.heardFrom.source === "church" && formData.addForDonations) {
        setShowConfirmation(true);
      } else {
        redirectToPurchase();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "There was a problem submitting your information. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const redirectToPurchase = () => {
    window.location.href =
      "https://www.lulu.com/shop/a-remnant-company/inspiring-faith-planner-and-journal/paperback/product-jez8d4v.html";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name" || name === "email") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name.startsWith("churchDetails.")) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, field, subfield] = name.split(".") as [
        string,
        keyof FormData["churchDetails"],
        (
          | keyof FormData["churchDetails"]["address"]
          | keyof FormData["churchDetails"]["phoneNumber"]
        )
      ];
      setFormData((prev) => ({
        ...prev,
        churchDetails: {
          ...prev.churchDetails,
          [field]: subfield
            ? { ...(prev.churchDetails[field] as object), [subfield]: value }
            : value,
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

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      churchDetails: {
        ...prev.churchDetails,
        address: {
          ...prev.churchDetails.address,
          [field]: value,
        },
      },
    }));
  };

  const handlePhoneTypeChange = (value: "us" | "international") => {
    setFormData((prev) => ({
      ...prev,
      churchDetails: {
        ...prev.churchDetails,
        phoneNumber: {
          ...prev.churchDetails.phoneNumber,
          type: value,
          number: "",
        },
      },
    }));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      churchDetails: {
        ...prev.churchDetails,
        phoneNumber: {
          ...prev.churchDetails.phoneNumber,
          number: value,
        },
      },
    }));
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
      churchDetails: {
        ...prev.churchDetails,
        name: "",
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
        {!showConfirmation ? (
          <>
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
                        <Label htmlFor="church-listed">
                          Yes, I see my church
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="not-listed"
                          id="church-not-listed"
                        />
                        <Label htmlFor="church-not-listed">
                          No, I don&apos;t see my church
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
                      <Label htmlFor="otherChurch">
                        Enter your church name
                      </Label>
                      <Input
                        id="otherChurch"
                        name="churchDetails.name"
                        value={formData.churchDetails.name}
                        onChange={handleChange}
                        placeholder="Enter church name"
                        required
                      />
                    </div>
                  )}
                  <div>
                    <Label>
                      Would you like to add them to receive donations?
                    </Label>
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
                        <Label htmlFor="churchCountry">Country</Label>
                        <Select
                          onValueChange={(value) =>
                            handleSelectChange("country", value)
                          }
                          value={formData.churchDetails.address.country}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem
                                key={country.isoCode}
                                value={country.isoCode}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.churchDetails.address.country && (
                        <div>
                          <Label htmlFor="churchState">State</Label>
                          <Select
                            onValueChange={(value) =>
                              handleSelectChange("state", value)
                            }
                            value={formData.churchDetails.address.state}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem
                                  key={state.isoCode}
                                  value={state.isoCode}>
                                  {state.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {formData.churchDetails.address.state && (
                        <div>
                          <Label htmlFor="churchCity">City</Label>
                          <Select
                            onValueChange={(value) =>
                              handleSelectChange("city", value)
                            }
                            value={formData.churchDetails.address.city}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city.name} value={city.name}>
                                  {city.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      <div>
                        <Label htmlFor="churchPostalCode">Postal Code</Label>
                        <Input
                          id="churchPostalCode"
                          name="churchDetails.address.postalCode"
                          value={formData.churchDetails.address.postalCode}
                          onChange={handleChange}
                          placeholder="Enter postal code"
                          required
                        />
                      </div>
                      <div>
                        <Label>Phone Number Type</Label>
                        <RadioGroup
                          value={formData.churchDetails.phoneNumber.type}
                          onValueChange={handlePhoneTypeChange}
                          className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="us" id="phone-us" />
                            <Label htmlFor="phone-us">US</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="international"
                              id="phone-international"
                            />
                            <Label htmlFor="phone-international">
                              International
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label htmlFor="churchPhone">Church Phone Number</Label>
                        <Input
                          id="churchPhone"
                          name="churchDetails.phoneNumber.number"
                          value={formData.churchDetails.phoneNumber.number}
                          onChange={handlePhoneNumberChange}
                          placeholder={
                            formData.churchDetails.phoneNumber.type === "us"
                              ? "1-xxx-xxx-xxxx"
                              : "Enter phone number"
                          }
                          required
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
                    required
                  />
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Thank you for your submission</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                We will contact them and discuss the process of registration but
                don&apos;t worry you can continue to order and we will track
                this purchase to apply a donation.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={redirectToPurchase} className="w-full">
                Continue to Purchase
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
