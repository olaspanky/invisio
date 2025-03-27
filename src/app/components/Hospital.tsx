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
    <div className="flex-1 p-6 bg-gray-100 min-h-screen flex flex-col gap-12       ">
  <section className="flex flex-col gap-12 ">
      <div>
          <h1 className="text-3xl font-bold text-black">Disease Burden</h1>
          </div>
          <div className=" p-9 flex flex-col gap-3 bg-[#DEEAFC] rounded-[20px]"> 
        
          <p className="text-sm text-[#3D84ED] text-[18px]">
          The disease burden analytics charts reports trend of diseases diagnosed by different physician specialities. This offers insight on flow of patients diagnosed by specialists and supports targeting of physicians for specific diseases of interest.          </p>
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
          src="https://j65byqdrge7rxllgvy6rvnive40lifmx.lambda-url.eu-central-1.on.aws/?dashboardId=afcd898a-e7e4-4481-9eaf-250f6883788e"
          className="w-full h-[1500px] border-none"
          onLoad={() => setLoading(false)}
        ></iframe>
      </div>
    </div>
  );
};

export default Hospital;
