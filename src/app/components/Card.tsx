import React from "react";
import { FiSearch, FiUser } from "react-icons/fi";

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-5 2xl:p-12 pr-7 2xl:pr-20 text-[#3D84ED] rounded-lg shadow-md hover:shadow-lg transition-shadow text-[18px]">
      <h2 className=" font-semibold mb-2">{title}</h2>
      <p className=" leading-6 2xl:leading-9 text-black">{description}</p>
    </div>
  );
};

export default Card;