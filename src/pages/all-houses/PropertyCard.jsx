import React, { useState } from 'react';
import { backendUrl } from '../../lib/config';
import { useNavigate, useRoutes } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate()

  const {
    propertyName,
    _id,
    distanceFromUniversity,
    price,
    photos,
    city,
    type,
    nameForOtherType,
    basicFacilities,
  } = property;

  const [hoveredImage, setHoveredImage] = useState(null);

  // Convert basic facilities array to a string for display
  const amenities = basicFacilities?.join(',')

  return (
    <div className="flex flex- md:flex-row cursor-pointer bg-white border m-2 rounded-lg shadow-md overflow-hidden relative" onClick={()=>navigate(`${_id}`)}>
      <div className="md:flex-shrink-0 relative p-2">
        <img
          src={`${photos[0].path}`}
          alt={propertyName}
          className="w-full h-48 object-cover p-2 md:w-48"
        />
        {hoveredImage && (
          <img
            src={`${hoveredImage.path}`}
            alt={propertyName}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-lg font-bold text-gray-900 mb-2">{propertyName}</div>
          <p className="text-gray-600 text-sm mb-4">{distanceFromUniversity} miles from University , {city}</p>
          <p className="text-gray-500 text-xs mb-4">{amenities}</p>
          {/* {type === 'Other' && <p className="text-gray-500 text-xs mb-4"> {nameForOtherType}</p>}
          {type !== 'Other' && <p className="text-gray-500 text-xs mb-4">{type}</p>} */}
        </div>
        <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">
  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)}
</div>
          <div className="flex -space-x-1 overflow-hidden absolute top-4 right-2">
  <span
    className={`py-1 px-3 rounded-full text-xs ${
      type === 'Apartment'
        ? 'bg-blue-200 text-blue-700'
        : type === 'Single-family Home'
        ? 'bg-green-200 text-green-700'
        : type === 'Condominium'
        ? 'bg-yellow-200 text-yellow-700'
        : type === 'Townhouse'
        ? 'bg-purple-200 text-purple-700'
        : type === 'On-Campus' 
        ? 'bg-black text-white'
        : 'bg-gray-200 text-gray-700'
    }`}
  >
    {type === 'Other' ? nameForOtherType : type}
  </span>
</div>

          <div className="flex -space-x-1 overflow-hidden">
            {photos.slice(1).map((photo, index) => (
              <img
                key={photo._id}
                src={`${photo.path}`}
                alt={`Thumbnail ${index + 1}`}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white cursor-pointer transition-opacity duration-300 hover:opacity-50"
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

export default PropertyCard;
