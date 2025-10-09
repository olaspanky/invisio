'use client';
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
const Layout2 = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const isAuthRoute = pathname?.startsWith("/auth");

  // Authentication check
  useEffect(() => {
    if (!isAuthRoute && !isLoggedIn()) {
      router.push("auth/login/"); // Redirect to login if not authenticated and not on an auth route
    }
  }, [pathname, router, isAuthRoute]);

  // Render only children for auth routes
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // Render full layout for authenticated users
  return (
    <div className="flex min-h-screen font-custom">
      {/* Sidebar */}
      <div
        className={`bg-white transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-60 2xl:w-72" : "w-16"
        } flex-shrink-0`}
      >
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 text-sm font-light">
        <div className="z-30">
          <Topbar />
        </div>
        <div className="px-3 lg:m-1 bg-[#f6f6f6] flex-1 h-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout2;