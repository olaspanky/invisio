"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiHelpCircle, FiSettings } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import i1 from "../../../public/assets/i1.svg";
import i2 from "../../../public/assets/i2.svg";
import i3 from "../../../public/assets/i33.svg";
import i4 from "../../../public/assets/i44.svg";
import i5 from "../../../public/assets/i55.svg";
import i6 from "../../../public/assets/i66.svg";
import logo from "../../../public/logo.png"

const menuItems = [
  { href: "/", icon: FiGrid, label: "Dashboard" },
  { href: "/invisio/overview", icon: i1, label: "Overview" },
  {
    href: "/invisio/disease-burden",
    icon: i2,
    label: "Disease Burden",
    subItems: [
      { href: "/invisio/hospital", label: "Hospital Insurance" },
      { href: "/invisio/out-of-pocket", label: "Out of Pocket" },
    ],
  },
  { href: "/invisio/treatment", icon: i3, label: "Treatment mapping" },
  { href: "/invisio/prescription", icon: i4, label: "Prescription Analytics" },
  { href: "/invisio/diagnostic", icon: i5, label: "Diagnostics" },
  { href: "/invisio/coc", icon: i6, label: "Cost of Care Analytics" },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gradient-to-bl from-[#373EE7] to-[#3D84ED] text-white flex flex-col justify-between transition-all duration-300 ease-in-out z-40 ${
        isOpen ? " w-60 2xl:w-72" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div
                        onClick={toggleSidebar}

  className={`absolute top-[42vh] -right-[30px] z-1 p-[3px] py-9 bg-gray-100 transform -translate-y-1/2 flex justify-center items-center rounded-r-full rounded-l-none shadow-lg focus:outline-none transition-transform duration-300`}
  >
            <button
              className={`text-[#373EE7] font-[48px] text-5xl focus:outline-none transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
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

      {/* Top Section */}
      <div className="p-4">
        <div
          className={`2xl:text-2xl text-xl font-bold mb-8 transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          INVISIO™
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition-colors ${
                  pathname === item.href ? "bg-[#A9ACFF]" : ""
                }`}
                onClick={(e) =>
                  item.subItems && isOpen && (e.preventDefault(), toggleSubmenu(item.label))
                }
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
                  <span>
                    {openSubmenus[item.label] ? (
                      <IoIosArrowUp size={16} />
                    ) : (
                      <IoIosArrowDown size={16} />
                    )}
                  </span>
                )}
              </Link>
              {item.subItems && openSubmenus[item.label] && isOpen && (
                <div className="pl-8 pt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className={`block p-2 rounded-lg text-xs hover:bg-blue-500 transition-colors ${
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
      </div>

      {/* Bottom Section */}
      <div className="p-4 space-y-4">
        <Link
          href="/support"
          className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors`}
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
          className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors`}
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