"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiGrid, FiHelpCircle, FiSettings, FiLogOut } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import i1 from "../../../public/assets/i1.svg";
import i2 from "../../../public/assets/i2.svg";
import i3 from "../../../public/assets/i33.svg";
import i4 from "../../../public/assets/i44.svg";
import i5 from "../../../public/assets/i55.svg";
import i6 from "../../../public/assets/i66.svg";
import logo from "../../../public/logo.png";
import { FaHospital, FaFileInvoice } from "react-icons/fa";

const claimMenuItems = [
  { href: "/invisio/dashboard", icon: FiGrid, label: "Dashboard" },
  { href: "/invisio/overview", icon: i1, label: "Overview" },
  {
    href: "/invisio/oop",
    icon: i4,
    label: "Disease Burden",
    subItems: [{ href: "/invisio/oop", label: "Claims" }],
  },
  { href: "/invisio/treatment", icon: i3, label: "Treatment mapping" },
  { href: "/invisio/prescription", icon: i6, label: "Prescription Analytics" },
  { href: "/invisio/diagnostic", icon: i5, label: "Diagnostics" },
  { href: "/invisio/coc", icon: i2, label: "Cost of Care Analytics" },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type ViewType = "main" | "hospital" | "claims";

// Storage utility
const storage = {
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Fail silently
    }
  },
  
  clear: (): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem("invisio_current_view");
      localStorage.removeItem("invisio_open_submenus");
      localStorage.removeItem("invisio_sidebar_open");
    } catch {
      // Fail silently
    }
  }
};

// Determine view from pathname
const getViewFromPath = (pathname: string): ViewType => {
  if (pathname === "/invisio/hospital") return "hospital";
  if (pathname.startsWith("/invisio/") && pathname !== "/invisio/hospital") return "claims";
  return "main";
};

// Get active submenus for claims section
const getActiveSubmenus = (pathname: string): Record<string, boolean> => {
  const activeSubmenus: Record<string, boolean> = {};
  
  claimMenuItems.forEach((item) => {
    if (item.subItems) {
      const isActive = item.href === pathname || 
                       item.subItems.some((subItem) => subItem.href === pathname);
      activeSubmenus[item.label] = isActive;
    }
  });
  
  return activeSubmenus;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  const [currentView, setCurrentView] = useState<ViewType>("main");
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize on client side
  useEffect(() => {
    // Get stored states
    const storedView = storage.get<ViewType>("invisio_current_view", "main");
    const storedSubmenus = storage.get<Record<string, boolean>>("invisio_open_submenus", {});
    const storedSidebarOpen = storage.get<boolean>("invisio_sidebar_open", true);
    
    // Determine view from current path
    const pathView = getViewFromPath(pathname);
    
    // Use path view (handles direct URL access)
    const finalView = pathView;
    
    // Get active submenus if in claims view
    const pathSubmenus = finalView === "claims" ? getActiveSubmenus(pathname) : {};
    const mergedSubmenus = { ...storedSubmenus, ...pathSubmenus };
    
    setCurrentView(finalView);
    setOpenSubmenus(mergedSubmenus);
    setIsOpen(storedSidebarOpen);
    setIsHydrated(true);
    
    // Save states
    storage.set("invisio_current_view", finalView);
    storage.set("invisio_open_submenus", mergedSubmenus);
  }, [pathname, setIsOpen]);

  // Persist states
  useEffect(() => {
    if (isHydrated) {
      storage.set("invisio_current_view", currentView);
    }
  }, [currentView, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      storage.set("invisio_open_submenus", openSubmenus);
    }
  }, [openSubmenus, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      storage.set("invisio_sidebar_open", isOpen);
    }
  }, [isOpen, isHydrated]);

  const toggleSidebar = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const toggleSubmenu = useCallback((label: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  }, []);

  const handleHospitalClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentView("hospital");
    router.push("/invisio/hospital");
  }, [router]);

  const handleClaimsClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentView("claims");
    // Default to dashboard when entering claims section
    router.push("/invisio/dashboard");
  }, [router]);

  const handleBackClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentView("main");
    // Don't change URL, just go back to main menu view
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    storage.clear();
    setCurrentView("main");
    setOpenSubmenus({});
    setIsOpen(true);
    router.push("/auth/login");
  }, [router, setIsOpen]);

  const renderMainMenu = () => (
    <nav className="space-y-2">
      {/* Invisio Hospital */}
      <div
        className={`flex items-center p-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer ${
          currentView === "hospital" ? "bg-[#A9ACFF]" : ""
        }`}
        onClick={handleHospitalClick}
      >
        <div className="flex items-center space-x-3">
          <FaHospital size={20} />
          <span
            className={`transition-all duration-300 text-sm 2xl:text-lg ${
              isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Invisio Hospital
          </span>
        </div>
      </div>

      {/* Invisio Claims */}
      <div
        className={`flex items-center p-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer ${
          currentView === "claims" ? "bg-[#A9ACFF]" : ""
        }`}
        onClick={handleClaimsClick}
      >
        <div className="flex items-center space-x-3">
          <FaFileInvoice size={20} />
          <span
            className={`transition-all duration-300 text-sm 2xl:text-lg ${
              isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Invisio Claims
          </span>
        </div>
      </div>
    </nav>
  );

  const renderClaimsMenu = () => (
    <nav className="space-y-2">
      {/* Back Button */}
      <div
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={20} />
        <span
          className={`transition-all duration-300 text-sm 2xl:text-lg ${
            isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          Back
        </span>
      </div>

      {/* Claims Menu Items */}
      {claimMenuItems.map((item) => (
        <div key={item.label}>
          <Link
            href={item.href}
            className={`flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition-colors ${
              pathname === item.href ? "bg-[#A9ACFF]" : ""
            }`}
            onClick={(e) => {
              if (item.subItems && isOpen) {
                toggleSubmenu(item.label, e);
              }
            }}
          >
            <div className="flex items-center space-x-3">
              {typeof item.icon === "function" ? (
                <item.icon size={20} />
              ) : (
                <Image src={item.icon} alt={item.label} className="w-5 h-5" />
              )}
              <span
                className={`transition-all duration-300 text-sm 2xl:text-lg ${
                  isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                {item.label}
              </span>
            </div>
            {item.subItems && isOpen && (
              <span onClick={(e) => toggleSubmenu(item.label, e)}>
                {openSubmenus[item.label] ? (
                  <IoIosArrowUp size={16} />
                ) : (
                  <IoIosArrowDown size={16} />
                )}
              </span>
            )}
          </Link>
          
          {/* Submenu Items */}
          {item.subItems && openSubmenus[item.label] && isOpen && (
            <div className="pl-8 pt-2 space-y-2">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.label}
                  href={subItem.href}
                  className={`block p-2 rounded-lg text-sm 2xl:text-lg hover:bg-blue-500 transition-colors ${
                    pathname === subItem.href ? "bg-blue-400" : ""
                  }`}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );

  const renderHospitalMenu = () => (
    <nav className="space-y-2">
      {/* Back Button */}
      <div
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
        onClick={handleBackClick}
      >
        <IoIosArrowBack size={20} />
        <span
          className={`transition-all duration-300 text-sm 2xl:text-lg ${
            isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          Back
        </span>
      </div>

      {/* Hospital Content - Currently highlighted */}
      <div className="flex items-center p-3 rounded-lg bg-[#A9ACFF] cursor-default">
        <div className="flex items-center space-x-3">
          <FaHospital size={20} />
          <span
            className={`transition-all duration-300 text-sm 2xl:text-lg ${
              isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Hospital Dashboard
          </span>
        </div>
      </div>
    </nav>
  );

  // Loading state
  if (!isHydrated) {
    return (
      <div className={`fixed top-0 left-0 h-screen py-5 bg-gradient-to-bl from-[#373EE7] to-[#3D84ED] text-white flex flex-col justify-between transition-all duration-300 ease-in-out z-40 w-16`}>
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-blue-400 rounded w-3/4"></div>
            <div className="h-10 bg-blue-400 rounded"></div>
            <div className="h-10 bg-blue-400 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed top-0 left-0 h-screen py-5 bg-gradient-to-bl from-[#373EE7] to-[#3D84ED] text-white flex flex-col justify-between transition-all duration-300 ease-in-out z-40 ${
        isOpen ? "w-60 2xl:w-72" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div
        onClick={toggleSidebar}
        className="absolute top-[42vh] -right-[30px] z-50 p-[3px] py-9 bg-gray-100 transform -translate-y-1/2 flex justify-center items-center rounded-r-full rounded-l-none shadow-lg cursor-pointer transition-all duration-300 hover:bg-gray-200"
      >
        <button
          className={`text-[#373EE7] focus:outline-none transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div
          className={`2xl:text-2xl text-xl font-bold mb-8 transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          INVISIO™
        </div>
        
        {currentView === "main" && renderMainMenu()}
        {currentView === "claims" && renderClaimsMenu()}
        {currentView === "hospital" && renderHospitalMenu()}
      </div>

      {/* Footer */}
      <div className="p-4 space-y-4">
        <Link
          href="/support"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FiHelpCircle size={20} />
          <span
            className={`transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Support
          </span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FiSettings size={20} />
          <span
            className={`transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Settings
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors w-full text-left"
        >
          <FiLogOut size={20} />
          <span
            className={`transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Logout
          </span>
        </button>
        <div
          className={`flex items-center justify-center space-x-2 transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <Image
            src={logo}
            alt="PBR Logo"
            width={80}
            height={40}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;