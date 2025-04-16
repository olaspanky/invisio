// components/Dashboard.tsx
import React from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import Card from "./Card";  

const Dashboard: React.FC = () => {

    const cardData = [
        { title: "Disease Burden", description: "The disease burden analytics charts reports trend of diseases diagnosed by different physician specialities. This offers insight on flow of patients diagnosed by specialists and supports targeting of physicians for specific diseases of interest" },
        { title: "HCP Treatment Mapping", description: "This analytics provides insight into doctors’ treatment preference for each disease diagnosed and treated and across diseases categories. All drugs prescribed are mapped to and standardized using global best practice of the WHO Anatomical Therapeutic Chemical (ATC) classification system, from levels 1 to 5" },
        { title: "Prescription Analytics", description: "This analytics provides more specific insight into pattern of prescription for individual diseases or disease categories, with deeper insight into how doctors prescribe in branded or generic names and share of these for every disease. " },
        { title: "Diagnostics", description: "This dashboard presents analytics of clinical diagnostic test requests from anonymized real world data, providing a wide, unprecedented view of diagnostic test requests across Nigeria, Africa’s most populous country. Individual data is processed only for purpose of analysis while maintaining form as gathered in real practice." },
        { title: "Cost of Care Analytics", description: "The disease prevalence analytics charts reports trend of diseases diagnosed by different physician specialities. This offers insight on flow of patients diagnosed by specialists and supports targeting of physicians for specific diseases of interest" }
      ];


  return (
    <div className="flex-1  bg-gray-100 min-h-screen flex flex-col pb-12 gap-12">
     


      <section className="flex flex-col gap-5 2xl:gap-12 ">
      <div>
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          </div>
          <div className=" p-3 2xl:p-9 flex flex-col gap-3 bg-[#DEEAFC] rounded-[20px] bg-contain bg-no-repeat bg-right"  style={{
                backgroundImage: `url('/assets/top.png')`,
            }}> 
          <p className="text-[18px] text-[#3D84ED] ">
            Welcome back, 
          </p>
          <p>
          <span className="font-semibold text-[#0061DA] text-[24px]">Gbolade Akintunmi</span>
          </p>
          <p className="text-sm text-[#3D84ED] text-[18px]">
            Helping you uncover market opportunities with INVISIO™
          </p>

          
            </div>  
        </section>  

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 2xl:gap-20">
        {cardData.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} />
        ))}
      </div>



    </div>
  );
};

export default Dashboard;