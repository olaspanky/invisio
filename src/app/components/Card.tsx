import React from "react";
import { FiSearch, FiUser } from "react-icons/fi";

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-12 pr-20 text-[#3D84ED] rounded-lg shadow-md hover:shadow-lg transition-shadow text-[18px]">
      <h2 className=" font-semibold mb-2">{title}</h2>
      <p className=" leading-9">{description}</p>
    </div>
  );
};

export default Card;