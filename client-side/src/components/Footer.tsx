export default function Footer() {
  return (
    <footer className=" text-[#1A1E23] my-7  font-[400] py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-4 md:mb-0">
          © 2024 Faith Planner. All rights reserved
        </div>
        <nav className="flex flex-wrap text-base justify-center md:justify-end space-x-2 md:space-x-4">
          <a
            href="#"
            className="hover:text-gray-700 transition-colors duration-200">
            Terms & Conditions
          </a>
          <span className="hidden md:inline">|</span>
          <a
            href="#"
            className="hover:text-gray-700 transition-colors duration-200">
            Privacy Policy
          </a>
          <span className="hidden md:inline">|</span>
          <a
            href="#"
            className="hover:text-gray-700 transition-colors duration-200">
            Sitemap
          </a>
          <span className="hidden md:inline">|</span>
          <a
            href="#"
            className="hover:text-gray-700 transition-colors duration-200">
            Disclaimer
          </a>
        </nav>
      </div>
    </footer>
  );
}
