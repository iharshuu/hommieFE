import React from 'react';
import { FaWifi, FaToiletPaper, FaGlassWhiskey, FaUtensils } from 'react-icons/fa';
import { MdOutlineFreeBreakfast, MdOutlineLocalLibrary } from 'react-icons/md';

const EssentialCard = () => {
  return (
    <div className="bg-white text-black p-8">
      {/* Container for the content */}
      <div className="w-[80vw] flex flex-row mx-auto gap-7">
        {/* Welcome Text */}
        <h1 className="  text-3xl w-[40vw] font-bold  px-6 ">
          Welcome to Hoomie, where your dream House or shared living experience awaits!
        </h1>
        
        {/* Text Block */}
        <div className=" flex flex-col w-[40vw] gap-3">
          <p className="text-xl">
            Join our vibrant community of adventurers and seekers of shared spaces.
          </p>
          <p className="text-xl">
            Discover hidden gems and cozy corners around the globe with like-minded individuals.
          </p>
          <p className="text-xl">
            Let VacayHub be your guide to unforgettable journeys and unforgettable connections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EssentialCard;
