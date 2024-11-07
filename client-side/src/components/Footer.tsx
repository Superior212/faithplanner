import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-[#1A1E23] my-7 font-[400] py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
          <Image
            src="/motherLogo.png"
            alt="Mother Company Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Faith Planner. All rights reserved
          </div>
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
          <span className="hidden md:inline">|</span>
          <Link
            href="/disclaimer"
            className="hover:text-gray-700 transition-colors duration-200">
            Disclaimer
          </Link>
        </nav>
        <div className="flex space-x-6">
          <Link
            href="https://www.facebook.com/share/1WmkosvvPh/?mibextid=LQQJ4d"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors duration-200">
            <Image src="/Facebook.svg" alt="Facebook" width={20} height={20} />
          </Link>
          <Link
            href="#"
            aria-label="Tiktok"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors duration-200">
            <Image src="/Tiktok.svg" alt="Tiktok" width={20} height={20} />
          </Link>
          <Link
            href="https://www.instagram.com/faithplanner_?igsh=N2VjaWx0bDhyb21u&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-gray-700 transition-colors duration-200">
            <Image
              src="/Instagram.svg"
              alt="Instagram"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
