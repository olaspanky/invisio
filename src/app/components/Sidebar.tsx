// components/Sidebar.tsx
import React, { useState } from "react";
import {
  FiGrid,
  FiLayers,
  FiLungs,
  FiBarChart2,
  FiSyringe,
  FiMicroscope,
  FiDollarSign,
  FiHelpCircle,
  FiSettings,
} from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // For mobile toggle
  const [isDiseaseBurdenOpen, setIsDiseaseBurdenOpen] = useState<boolean>(false); // For dropdown

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDiseaseBurden = () => setIsDiseaseBurdenOpen(!isDiseaseBurdenOpen);

  return (
    <div className="font-sans">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-700 to-blue-500 text-white flex flex-col justify-between transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-72`}
      >
        {/* Top Section */}
        <div className="p-6">
          {/* Logo */}
          <div className="text-2xl font-bold mb-10">INVISIO™</div>

          {/* Menu Items */}
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FiGrid className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FiLayers className="w-5 h-5" />
              <span>Overview</span>
            </a>

            {/* Disease Burden Dropdown */}
            <div>
              <button
                onClick={toggleDiseaseBurden}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FiLungs className="w-5 h-5" />
                  <span>Disease Burden</span>
                </div>
                {isDiseaseBurdenOpen ? (
                  <IoIosArrowUp className="w-4 h-4" />
                ) : (
                  <IoIosArrowDown className="w-4 h-4" />
                )}
              </button>
              {isDiseaseBurdenOpen && (
                <div className="pl-8 pt-2 space-y-2">
                  <a
                    href="#"
                    className="block p-2 rounded-lg bg-blue-400 hover:bg-blue-500 transition-colors"
                  >
                    Hospital Insurance
                  </a>
                  <a
                    href="#"
                    className="block p-2 rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    Out of Pocket
                  </a>
                </div>
              )}
            </div>

            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FiBarChart2 className="w-5 h-5" />
              <span>Treatment mapping</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FiSyringe className="w-5 h-5" />
              <span>Prescription Analytics</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FiMicroscope className="w-5 h-5" />
              <span>Diagnostics</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FiDollarSign className="w-5 h-5" />
              <span>Cost of Care Analytics</span>
            </a>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-6 space-y-4">
          <a
            href="#"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiHelpCircle className="w-5 h-5" />
            <span>Support</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiSettings className="w-5 h-5" />
            <span>Settings</span>
          </a>

          {/* PBR Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/pbr-logo.png" // Replace with the actual path to the PBR logo
              alt="PBR Logo"
              width={80}
              height={40}
              className="object-contain"
            />
            <span className="text-sm">LIFE SCIENCES</span>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;