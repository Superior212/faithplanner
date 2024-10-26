"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";
import { navItems } from "@/lib/data";
import MemoLogo from "@/icons/Logo";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-[100vh] max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[80px] lg:px-6">
          <Link href="/" className="">
            <div className="flex items-center space-x-2">
              <MemoLogo className="h-10 w-80" />
            </div>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 py-6 text-base font-medium lg:px-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-4 transition-all ${
                  pathname === item.href
                    ? "bg-[#EFF1ED] text-[#766153]"
                    : "text-[#575757] hover:bg-[#EFF1ED]"
                }`}>
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
