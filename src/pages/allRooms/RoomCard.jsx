import React, { useState } from 'react';
import { backendUrl } from '../../lib/config';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ property }) => {
  const navigate = useNavigate();

  // console.log(property , "property")

  const {
    propertyName,
    _id,
    distanceFromUniversity,
    price,
    photos,
    city,
    vacanypeople,
    type,
    nameForOtherType,
    basicFacilities,
  } = property;

  const [hoveredImage, setHoveredImage] = useState(null);

  const amenities = basicFacilities.join(', ');

  return (
    <div className="flex flex-col md:flex-row cursor-pointer bg-white border m-2 p-2 rounded-lg shadow-md overflow-hidden relative transition duration-300 transform hover:scale-105" onClick={()=>navigate(`${_id}`)}>
      <div className="md:flex-shrink-0 relative p-2">
        <img
          src={`${photos[0].path}`}
          alt={propertyName}
          className="w-full h-48 object-cover p-2 md:w-48 rounded-lg  transition duration-300 transform hover:scale-110"
        />
        {hoveredImage && (
          <img
            src={`${hoveredImage.path}`}
            alt={propertyName}
            className="absolute inset-0 w-full h-full object-cover z-10 rounded-t-lg md:rounded-t-none md:rounded-l-lg transition duration-300 opacity-80 hover:opacity-100"
          />
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="text-right mb-2">
          <div className="text-lg font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-800">
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)}
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900 mb-2">{propertyName}</div>
          <p className="text-gray-600 text-sm mb-4">{distanceFromUniversity} miles from University , {city}</p>
          <p className="text-gray-500 text-xs mb-4">Vacancies: {vacanypeople}</p>
          <p className="text-gray-500 text-xs mb-4">Amenities: {amenities}</p>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
              type === 'Apartment'
                ? 'bg-blue-200 text-blue-800'
                : type === 'Single-family Home'
                ? 'bg-green-200 text-green-800'
                : type === 'Condominium'
                ? 'bg-yellow-200 text-yellow-800'
                : type === 'Townhouse'
                ? 'bg-purple-200 text-purple-800'
                : type === 'On-Campus' 
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-800'
            } transition duration-300 transform hover:scale-110`}
          >
            {type === 'Other' ? nameForOtherType : type}
          </span>
          <div className="flex space-x-1">
            {photos.slice(1).map((photo, index) => (
              <img
                key={photo._id}
                src={`${photo.path}`}
                alt={`Thumbnail ${index + 1}`}
                className="h-8 w-8 rounded-full ring-2 ring-white cursor-pointer transition-opacity duration-300 hover:opacity-75 transform hover:scale-110"
                onMouseEnter={() => setHoveredImage(photo)}
                onMouseLeave={() => setHoveredImage(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
