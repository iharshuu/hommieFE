// AmenitiesForm.js
import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const amenityOptions = {
  basicFacilities: [
    { value: 'electricity', label: 'Electricity' },
    { value: 'waterSupply', label: 'Water Supply' },
    { value: 'heating', label: 'Heating' },
    { value: 'Elevator/ Lift', label: 'Elevator/ Lift' },
    { value: 'Laundry', label: 'Laundry' },
  ],
  outdoorActivities: [
    { value: 'swimmingPool', label: 'Swimming Pool' },
    { value: 'garden', label: 'Garden' },
    { value: 'playground', label: 'Playground' },
    { value: 'Golf', label: 'Golf' },
    { value: 'Telescope', label: 'Telescope' },
    { value: 'Cycling', label: 'Cycling' },
  ],
  commonArea: [
    { value: 'Lawn', label: 'Lawn' },
    { value: 'Reception', label: 'Reception' },
    { value: 'Balcony/ Terrace', label: 'Balcony/ Terrace' },
    { value: 'Library', label: 'Library' },
    { value: 'Lounge', label: 'Lounge' },
  ],
  security:[
    { value: 'CCTV', label: 'CCTV' },
    { value: 'Fire extinguishers', label: 'Fire extinguishers' },
    { value: 'Security alarms', label: 'Security alarms' },
    { value: 'Security Guard', label: 'Security Guard' },
    { value: 'Carbon Monoxide Detector', label: 'Carbon Monoxide Detector' },
  ],
  entertainment:[
    { value: 'Movie Room', label: 'Movie Room' },
    { value: 'Music System', label: 'Music System' },
    { value: 'Events', label: 'Events' },
    { value: 'Pub', label: 'Pub' },
    { value: 'Night Club', label: 'Night Club' },
  ]
};

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '0.375rem',
    borderColor: '#d1d5db',
  }),
  option: (provided) => ({
    ...provided,
    color: 'black',
  }),
};

const AmenitiesForm = ({ formData, setFormData, handleChange, nextStep, prevStep,handleAmenitiesChange }) => {
  const [amenities, setAmenities] = useState({
    basicFacilities: [],
    outdoorActivities: [],
    commonArea: [],
    security: [],
    entertainment: []
  });

  const handleLocalAmenitiesChange = (type, selectedOption) => {
    const updatedAmenities = { ...amenities, [type]: selectedOption };
    setAmenities(updatedAmenities);

    // Map selected options to their values for formData
    const amenitiesForFormData = {};
    Object.keys(updatedAmenities).forEach((amenityType) => {
      amenitiesForFormData[amenityType] = updatedAmenities[amenityType].map(option => option.value);
    });

    // Update formData in the parent component
    handleAmenitiesChange(amenitiesForFormData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Amenities</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(amenityOptions).map((type) => (
          <div key={type}>
            <label htmlFor={type} className="block text-sm font-medium text-gray-700">{type}</label>
            <CreatableSelect
              isMulti
              name={type}
              options={amenityOptions[type]}
              className="mt-1"
              styles={customSelectStyles}
              onChange={(selectedOption) => handleLocalAmenitiesChange(type, selectedOption)}
              placeholder={`Select ${type}...`}
              value={amenities[type]}
            />
          </div>
        ))}
        <div>
          <label htmlFor="numberofrooms" className="block text-sm font-medium text-gray-700">Number of Available Room(s)</label>
          <input
            type="number"
            name="bedrooms"
            id="numberofrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter number of rooms"
          />
        </div>
        {formData.category === "room" &&  <div>
          <label htmlFor="vacanypeople" className="block text-sm font-medium text-gray-700">Number of vacany people(s)</label>
          <input
            type="number"
            name="vacanypeople"
            id="vacanypeople"
            value={formData.vacanypeople}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter number of rooms"
          />
        </div>
}
        <div>
          <label htmlFor="roomSize" className="block text-sm font-medium text-gray-700">Room Size(In Sq)</label>
          <input
            type="number"
            name="roomSize"
            id="roomSize"
            value={formData.roomSize}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter rooms size in sq"
          />
        </div>
        <div className='my-2'>
          <label htmlFor="RoomDescription" className="block text-sm font-medium text-gray-700">Room Description</label>
          <textarea
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Room Description"
            className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          onClick={prevStep}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AmenitiesForm;
