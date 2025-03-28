"use client";

import React, { useEffect, useRef, useState } from "react";
import DashboardSkeletonLoader from "./DashboardLoader";
const Hospital = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);

   

  return (
    <div className="w-full p-6  bg-gray-100 min-h-screen flex flex-col 2xl:gap-12 gap-6        ">
  <section className="flex flex-col gap-12 ">
      <div>
          <h1 className="text-3xl font-bold text-black">Disease Burden</h1>
          </div>
          <div className=" p-3 2xl:p-9 flex flex-col gap-3 bg-[#DEEAFC] rounded-[20px]"> 
        
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
          src="https://eu-central-1.quicksight.aws.amazon.com/embed/5d0007682a074045ac4532b25ac0d887/dashboards/afcd898a-e7e4-4481-9eaf-250f6883788e"
          className="w-full h-[2500px] border-none"
          onLoad={() => setLoading(false)}
        ></iframe>
      </div>
    </div>
  );
};

export default Hospital;
