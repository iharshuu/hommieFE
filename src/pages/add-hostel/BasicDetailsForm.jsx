import React, { useState } from "react";

const propertyOptions = {
  House: "A private, standalone dwelling typically offering multiple rooms, outdoor spaces, and exclusive amenities.",
  RoomSharing: "A shared living space providing a personal room within a larger house or apartment, often with communal areas."
};

const BasicDetailsForm = ({ formData, handleChange, nextStep }) => {
  const [selectedCategory, setSelectedCategory] = useState(formData.category);

  // Function to handle the click on a property type
  const handlePropertyTypeChange = (category) => {
    setSelectedCategory(category);
    handleChange({ target: { name: "category", value: category } });
  };
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Basic Details</h2>
        <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800">Please select your property type from below options</h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div
            className={`p-4 border ${selectedCategory === 'house' ? 'border-indigo-500 bg-indigo-100' : 'border-gray-300'} rounded-lg shadow-md cursor-pointer`}
            onClick={() => handlePropertyTypeChange('house')}
          >
            <h4 className="text-lg font-semibold">House</h4>
            <p className="text-sm ">{propertyOptions.House}</p>
            {selectedCategory === 'house' && <div className="mt-2 flex justify-end">
              <span className="text-indigo-600">Selected</span>
            </div>}
          </div>
          <div
            className={`p-4 border ${selectedCategory === 'room' ? 'border-indigo-500 bg-indigo-100' : 'border-gray-300'} rounded-lg shadow-md cursor-pointer`}
            onClick={() => handlePropertyTypeChange('room')}
          > 
            <h4 className="text-lg font-semibold">Room Sharing</h4>
            <p className="text-sm ">{propertyOptions.RoomSharing}</p>
            {selectedCategory === 'room' && <div className="mt-2 flex justify-end">
              <span className="text-indigo-600">Selected</span>
            </div>}
          </div>
        </div>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700">Property Name</label>
            <input
              type="text"
              name="propertyName"
              id="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter property name"
            />
          </div>
          <div>
            <label htmlFor="propertyBuilt" className="block text-sm font-medium text-gray-700">Property Built</label>
            <input
              type="text"
              name="propertyBuilt"
              id="propertyBuilt"
              value={formData.propertyBuilt}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="YYYY"
            />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter mobile number"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              //onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 cursor-not-allowed pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select property type</option>
              <option value="Apartment">Apartment</option>
              <option value="Single-family Home">Single-family Home</option>
              <option value="Condominium">Condominium</option>
              <option value="Townhouse">Townhouse</option>
              {/* <option value="On-Campus">On-Campus</option> */}
              <option value="Others">Others</option>
            </select>
          </div>
         {formData.type === "Others" &&  <div>
            <input
              type="name"
              name="typeother"
              value={formData.nameForOtherType}
              onChange={handleChange}
              className="mt-5 focus:ring-indigo-500 border pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder=""
            />
          </div>
}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (Monthly)</label>
            <input
              type="price"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter the price"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={nextStep}
            className="float-right inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue
          </button>
        </div>
      </div>
    );
  };
  

  export default BasicDetailsForm;
