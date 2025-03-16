import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../../../lib/config";
import axios from "axios";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleNavigate = (hotelId) => {
    navigate(`/list-your-hostel/edit/${hotelId}`);
  };

  const handledelete = async(hotelId) =>{
    const token = localStorage.getItem('hoomie');

    try {
      const response = await axios.delete(`${backendUrl}homepage/view_properties/${hotelId}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`, // Include the token in the Authorization header
        },

      });
  
      console.log(response.data);
        
      if (response?.data?.status === "S") {
        setTimeout(()=>{
          window.location.href()
        })
      } else {
        console.error('Error uploading form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="bg-white flex flex-row shadow-lg rounded-lg overflow-hidden w-full">
    <img
      src={`${hotel.photos[0].path}`} // Assuming the first photo is the main image
      alt="Hotel"
      className="w-48 h-48 p-2 object-cover"
    />
    <div className="p-2 px-4 w-full flex flex-row justify-between">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{hotel.propertyName}</h2>
        <p className="text-gray-600 mb-2">{`${hotel.city}, ${hotel.country}`}</p>
        <p className="text-sm text-gray-600 mb-2">{` ${hotel?.type === "Other" ? hotel?.nameForOtherType : hotel?.type}`}</p>
        <p className="text-lg font-bold text-green-600 mb-4">
          
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(hotel.price)}

          </p>
      </div>
      <div className="flex flex-col">
      <span className="w-fit flex ml-auto mt-2 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
  {`${hotel.category}`}
</span>
  
        <div className="flex justify-end mt-auto py-4">
          <button
            className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
            onClick={() => handleNavigate(hotel._id)}
          >
            <CiEdit className="mr-1" /> Edit
          </button>
          <button
            className="flex items-center text-red-600 hover:text-red-800 focus:outline-none ml-2"
            onClick={() => handledelete( hotel._id)}
          >
            <MdDeleteOutline className="mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default HotelCard;
