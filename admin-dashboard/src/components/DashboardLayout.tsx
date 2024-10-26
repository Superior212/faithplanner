"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";

export function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid sm:min-h-[100vh] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar - Fixed and full height */}
      <div className="sticky top-0 lg:h-screen">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
