"use client";

import React, { useEffect, useRef, useState } from "react";
import DashboardSkeletonLoader from "./DashboardLoader";

const Hospital = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);


  return (
    <div className=" w-full p-6  bg-gray-100 min-h-screen flex flex-col 2xl:gap-12 gap-6        ">
  <section className="flex flex-col gap-12 ">
      <div>
          <h1 className="text-3xl font-bold text-black">Overview</h1>
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
          src="https://eu-central-1.quicksight.aws.amazon.com/embed/d73edb1aad7a494a8e8fcc3658e64e4e/dashboards/728c909f-7dd3-4444-b1f4-d62238c656de"
          className="w-full h-[1500px] border-none"
          onLoad={() => setLoading(false)}
        ></iframe>
      </div>
    </div>
  );
};

export default Hospital;
