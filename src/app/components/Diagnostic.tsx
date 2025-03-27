"use client";

import React, { useEffect, useRef, useState } from "react";
import DashboardSkeletonLoader from "./DashboardLoader";
const Hospital = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        iframeRef.current.style.height = `${window.innerHeight}px`; // Set height to full viewport
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial height

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex-1 p-6 lg:ml-7 bg-gray-100 min-h-screen flex flex-col gap-12       ">
  <section className="flex flex-col gap-12 ">
      <div>
          <h1 className="text-3xl font-bold text-black">Diagnostics</h1>
          </div>
          <div className=" p-9 flex flex-col gap-3 bg-[#DEEAFC] rounded-[20px]"> 
        
          <p className="text-sm text-[#3D84ED] text-[18px]">
          This dashboard presents analytics of clinical diagnostic test requests from anonymized real world data, providing a wide, unprecedented view of diagnostic test requests across Nigeria, Africa’s most populous country. Individual data is processed only for purpose of analysis while maintaining form as gathered in real practice.              </p>
            </div>  
        </section> 


      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden relative">
      {loading && (
         <>
         <DashboardSkeletonLoader/>
         </>
        )}

        <iframe
          ref={iframeRef}
          src="https://j65byqdrge7rxllgvy6rvnive40lifmx.lambda-url.eu-central-1.on.aws/?dashboardId=f505a1a0-0f93-490f-a66f-e9a9435d9a4b"
          className="w-full h-[1500px] border-none"
          onLoad={() => setLoading(false)}
        ></iframe>
      </div>
    </div>
  );
};

export default Hospital;
