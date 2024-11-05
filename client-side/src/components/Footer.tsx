import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="text-[#1A1E23] my-7 font-[400] py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-4 md:mb-0">
          © {new Date().getFullYear()} Faith Planner. All rights reserved
        </div>
        <nav className="flex flex-wrap text-base justify-center md:justify-end space-x-2 md:space-x-4 mb-4 md:mb-0">
          <Link
            href="/terms-and-conditions"
            className="hover:text-gray-700 transition-colors duration-200">
            Terms & Conditions
          </Link>
          <span className="hidden md:inline">|</span>
          <Link
            href="/privacy-policy"
            className="hover:text-gray-700 transition-colors duration-200">
            Privacy Policy
          </Link>
          {/* <span className="hidden md:inline">|</span> */}
          {/* <Link
            href="#"
            className="hover:text-gray-700 transition-colors duration-200">
            Sitemap
          </Link> */}
          <span className="hidden md:inline">|</span>
          <Link
            href="/disclaimer"
            className="hover:text-gray-700 transition-colors duration-200">
            Disclaimer
          </Link>
        </nav>
        <div className="flex space-x-4">
          <Link
            href="#"
            aria-label="Facebook"
            className="hover:text-gray-700 transition-colors duration-200">
            <Facebook size={20} />
          </Link>
          <Link
            href="#"
            aria-label="Twitter"
            className="hover:text-gray-700 transition-colors duration-200">
            <Twitter size={20} />
          </Link>
          <Link
            href="#"
            aria-label="Instagram"
            className="hover:text-gray-700 transition-colors duration-200">
            <Instagram size={20} />
          </Link>
          <Link
            href="#"
            aria-label="LinkedIn"
            className="hover:text-gray-700 transition-colors duration-200">
            <Linkedin size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
