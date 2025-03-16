import React, { useState } from 'react';
import { LuPlusCircle, LuMinusCircle  } from "react-icons/lu";



const Accordion = ({ heading, smallHeading, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col p-6 sm:p-3 gap-6 sm:gap-3 border border-solid border-gray-300 bg-blue-50 rounded-xl">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex flex-col" >
        <span className="text-xs font-semibold text-black">{smallHeading}</span>
        <span className="text-xl sm:text-base font-semibold text-black">{heading}</span>
        </div>
        <span className="text-xl">
          {isOpen ? <LuMinusCircle /> : <LuPlusCircle />}
        </span>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-4 sm:gap-2 text-sm text-gray-500 font-normal leading-6">
         {text}
        </div>
      )}
    </div>
  );
};

export default Accordion;
