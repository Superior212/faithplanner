"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { Phone, Mail } from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const howToUseRef = React.useRef<HTMLDivElement>(null);
  const homeRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [reason, setReason] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle the form submission,
    // e.g., send the data to your backend API
    console.log("Form submitted with reason:", reason);
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    });
  };

  return (
    <>
      <Navbar howToUseRef={howToUseRef} homeRef={homeRef} />
      <main className="mt-[4.6rem] sm:mt-20">
        <div className="hsection min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-primary">
                Contact Us
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">
                We&apos;re here to help. Feel free to reach out using the information
                below or the contact form.
              </p>
            </div>

            <div className="mt-12 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  Contact Information
                </h2>
                <dl className="mt-4 space-y-6">
                  <div className="flex items-center">
                    <Phone className="flex-shrink-0 h-6 w-6 text-primary" />
                    <span className="ml-3 text-base text-muted-foreground">
                      +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="flex-shrink-0 h-6 w-6 text-primary" />
                    <span className="ml-3 text-base text-muted-foreground">
                      info@faithplanner.org
                    </span>
                  </div>
                </dl>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Send us a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reason">Reason for Contact</Label>
                    <Select onValueChange={setReason} required>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="speaking">
                          Speaking engagements
                        </SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
