"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { MapPin, Phone, Mail } from "lucide-react";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const howToUseRef = React.createRef<HTMLDivElement>();
  const homeRef = React.createRef<HTMLDivElement>();

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
                We&apos;re here to help. Feel free to reach out using the
                information below.
              </p>
            </div>

            <div className="mt-12 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  Contact Information
                </h2>
                <dl className="mt-4 space-y-6">
                  <div className="flex items-start">
                    <MapPin className="flex-shrink-0 h-6 w-6 text-primary" />
                    <div className="ml-3 text-base text-muted-foreground">
                      <p>328 Mt Holly St</p>
                      <p>Baltimore, MD 21229</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="flex-shrink-0 h-6 w-6 text-primary" />
                    <span className="ml-3 text-base text-muted-foreground">
                      +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="flex-shrink-0 h-6 w-6 text-primary" />
                    <span className="ml-3 text-base text-muted-foreground">
                      contact@plannerwebsite.com
                    </span>
                  </div>
                </dl>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  Our Location
                </h2>
                <div className="mt-4 bg-muted aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3087.3750115244196!2d-76.67741532346177!3d39.28932997128124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c81c7e0d2a2b7d%3A0x7b0b4b6b8a8b8b8b!2s328%20Mt%20Holly%20St%2C%20Baltimore%2C%20MD%2021229!5e0!3m2!1sen!2sus!4v1683147813954!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
