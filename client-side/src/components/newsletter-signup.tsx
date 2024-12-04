"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Email submitted:", email);
  };

  return (
    <section className="w-full py-24 bg-gradient-to-br from-[#394B5E] to-[#2A313D]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Stay inspired and organized!
            </h2>
            <p className="mx-auto max-w-[700px] text-white/90 md:text-xl">
              Sign up to learn more about the Inspiring Faith Planner, discover
              tips on how to make the most of it, and share your suggestions.
              Let&apos;s grow together on this journey of faith and planning!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-2">
            <div className="flex rounded-md overflow-hidden">
              <Input
                className="flex-grow bg-white/10 border-white/20 border-0 text-white placeholder:text-white/50 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                className="bg-white border-0 text-[#394B5E] hover:bg-white/90 rounded-l-none"
                type="submit">
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
