const LocationForm = ({ formData, handleChange, nextStep, prevStep }) => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Location Details</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">House/Building, Apartment No:</label>
            <input
              type="text"
              name="houseNumber"
              id="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter house or apartment number"
            />
          </div>
          <div>
            <label htmlFor="locality" className="block text-sm font-medium text-gray-700">Locality/Area:</label>
            <input
              type="text"
              name="locality"
              id="locality"
              value={formData.locality}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter locality or area"
            />
          </div>
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode:</label>
            <input
              type="text"
              name="pincode"
              id="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter pincode"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country:</label>
            <input
              type="text"
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter country"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State:</label>
            <input
              type="text"
              name="state"
              id="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter state"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City:</label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter city"
            />
          </div>
          <div className="">
            <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark (Optional):</label>
            <input
              type="text"
              name="landmark"
              id="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter landmark"
            />
          </div>
          {/* <div className="">
            <label htmlFor="distanceFromUniversity" className="block text-sm font-medium text-gray-700">Distance from University(In miles):</label>
            <input
              type="text"
              name="distanceFromUniversity"
              id="distanceFromUniversity"
              value={formData.distanceFromUniversity}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 pl-3 pr-10 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter distance from university"
            />
          </div> */}
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

  
  export default LocationForm