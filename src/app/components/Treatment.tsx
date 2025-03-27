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
    <div className="w-full p-6  bg-gray-100 min-h-screen flex flex-col 2xl:gap-12 gap-6        ">
  <section className="flex flex-col gap-12 ">
      <div>
          <h1 className="text-3xl font-bold text-black">Treatment Mapping</h1>
          </div>
          <div className=" p-9 flex flex-col gap-3 bg-[#DEEAFC] rounded-[20px]"> 
        
          <p className="text-sm text-[#3D84ED] text-[18px]">
          This analytics provides insight into doctors’ treatment preference for each disease diagnosed and treated and across diseases categories. All drugs prescribed are mapped to and standardized using global best practice of the WHO Anatomical Therapeutic Chemical (ATC) classification system, from levels 1 to 5. Level 1 is the organ or system on which they act and their therapeutic, level 2 to 4 are the pharmacological or therapeutic sub-group, and level 5 is the drug itself. This offers insight on therapy area and drug opportunity or brand share of disease for planning and performance assessment.This analytics provides insight into doctors’ treatment preference for each disease diagnosed and treated and across diseases categories. All drugs prescribed are mapped to and standardized using global best practice of the WHO Anatomical Therapeutic Chemical (ATC) classification system, from levels 1 to 5. Level 1 is the organ or system on which they act and their therapeutic, level 2 to 4 are the pharmacological or therapeutic sub-group, and level 5 is the drug itself. This offers insight on therapy area and drug opportunity or brand share of disease for planning and performance assessment.</p>            </div>  
        </section> 


      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden relative">
      {loading && (
         <>
         <DashboardSkeletonLoader/>
         </>
        )}

        <iframe
          ref={iframeRef}
          src="https://j65byqdrge7rxllgvy6rvnive40lifmx.lambda-url.eu-central-1.on.aws/?dashboardId=29b55067-cb28-494b-bbcf-d4f3a69b0f0c"
          className="w-full h-[1500px] border-none"
          onLoad={() => setLoading(false)}
        ></iframe>
      </div>
    </div>
  );
};

export default Hospital;
