"use client";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-[#FBFBFB] px-4 lg:h-[80px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-4 transition-all ${
                  pathname === item.href
                    ? "bg-[#EFF1ED] text-[#766153]" // Active state styling
                    : "text-[#575757] hover:bg-[#EFF1ED]" // Default state styling
                }`}>
                {/* Apply conditional color to the icon */}
                {/* <item.icon
                  className={`h-5 w-5 ${
                    pathname === item.href
                      ? "text-[#766153]"
                      : "text-[##575757]"
                  }`}
                /> */}
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="sm:container sm:mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="bg-[#FFF1F3] text-[#826cd9] hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-[500]">
            <p className="bg-[#3df649] h-2 w-2 rounded-full" /> <p>Admin</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <p className="font-[500]">user-admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
