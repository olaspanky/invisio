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
    <div className="flex-1 p-6  bg-gray-100 min-h-screen flex flex-col gap-12       ">
  <section className="flex flex-col gap-12 ">
      <div>
          <h1 className="text-3xl font-bold text-black">Cost of Care analytics</h1>
          </div>
          <div className=" p-9 flex flex-col gap-3 bg-[#DEEAFC] rounded-[20px]"> 
        
          <p className="text-sm text-[#3D84ED] text-[18px]">
          This analytics provides more specific insight into pattern of prescription for individual diseases or disease categories, with deeper insight into how doctors prescribe in branded or generic names and share of these for every disease. Whilst policies of the hospital could decide if doctors prescribe in brand or generic names, this analytics helps to provide opportunity for brand ownership of segment and opportunities available, brand share of diseases, and current doctors’ behavior.             </p>
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
          src="https://j65byqdrge7rxllgvy6rvnive40lifmx.lambda-url.eu-central-1.on.aws/?dashboardId=3049d86e-7230-40bd-aad4-0a93e757c3713049d86e-7230-40bd-aad4-0a93e757c371"
          className="w-full h-[1500px] border-none"
          onLoad={() => setLoading(false)}
        ></iframe>
      </div>
    </div>
  );
};

export default Hospital;
