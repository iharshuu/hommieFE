import React, { useEffect, useState } from "react";
import Select from "react-select"; // Assuming you have installed react-select
import { AiOutlineSave, AiOutlineArrowLeft } from "react-icons/ai";
import { backendUrl } from "../../lib/config";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Navbar from "../../components/organisms/Navbar"

import {toast} from "sonner"


const EditPropertyPage = () => {
  const [formData, setFormData] = useState();
  const { id } = useParams();

  const navigate = useNavigate()


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlelandlords = async () => {
    const token = localStorage.getItem('hoomie');
       try{ 
        const response = await axios.get(`${backendUrl}homePage/view_propertie/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`, // Include the token in the Authorization header
            },
        });
        console.log(response.data);
        
        if (response?.data?.status === "S") {
          setFormData(response?.data?.propertydata);
        } else {
          console.error('Error uploading form data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Something Went Wrong !!")
    }
};

useEffect(() => {
    handlelandlords();
}, []);

  const handleSave = async() => {
    // Handle save functionality here, you can send formData to backend
    const token = localStorage.getItem('hoomie');
    console.log("Saved:", formData);
    try{ 
     const response = await axios.put(`${backendUrl}homePage/view_propertie/${id}`, formData, {
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `${token}`, // Include the token in the Authorization header
         },
     });
     console.log(response.data);
     
     if (response?.data?.status === "S") {
       setFormData(response?.data?.propertydata);
       toast.success('Sucessfully updated !!')

     } else {
       console.error('Error uploading form data:', response.statusText);
       toast.error(response.message)


     }
 } catch (error) {
     console.error('Error fetching data:', error);
 }
    // Redirect to previous page or any other route after saving
  };

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

  return (
    <>
        <Navbar/>
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Property Name
          </label>
          <input
            type="text"
            name="propertyName"
            value={formData?.propertyName}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 cursor-not-allowed font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData?.email}
           // onChange={handleInputChange}
            className="border border-gray-300 cursor-not-allowed p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2">
    Category
  </label>
  <select
    name="category"
    value={formData?.category}
    onChange={handleInputChange}
    className="border border-gray-300 p-2 w-full rounded"
  >
    <option value="">Select Category</option>
    <option value="room">Room</option>
    <option value="house">House</option>
  </select>
</div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Property Built
          </label>
          <input
            type="text"
            name="propertyBuilt"
            value={formData?.propertyBuilt}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Mobile Number
          </label>
          <input
            type="text"
            name="mobileNumber"
            value={formData?.mobileNumber}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2">
    Type
  </label>
    <select
      name="type"
      value={formData?.type}
      onChange={handleInputChange}
      className="border border-gray-300 p-2 w-full rounded"
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
   {
      formData?.type === 'Others' &&

    <div className="mb-4">
      
      <input
        type="text"
        name="nameForOtherType"
        value={formData?.nameForOtherType}
        onChange={handleInputChange}
        className="border border-gray-300 p-2 w-full rounded"
      />
    </div>
}
  

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            House Number
          </label>
          <input
            type="text"
            name="houseNumber"
            value={formData?.houseNumber}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Locality
          </label>
          <input
            type="text"
            name="locality"
            value={formData?.locality}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Pincode
          </label>
          <input
            type="text"
            name="pincode"
            value={formData?.pincode}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData?.country}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData?.state}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData?.city}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Landmark
          </label>
          <input
            type="text"
            name="landmark"
            value={formData?.landmark}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Distance From University
          </label>
          <input
            type="text"
            name="distanceFromUniversity"
            value={formData?.distanceFromUniversity}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Basic Facilities
          </label>
          <Select
            options={amenityOptions?.basicFacilities}
            isMulti
            name="basicFacilities"
            value={formData?.basicFacilities.map(option => ({ value: option, label: option }))}
            onChange={selectedOptions => setFormData({ ...formData, basicFacilities: selectedOptions.map(option => option.value) })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Outdoor Activities
          </label>
          <Select
            options={amenityOptions?.outdoorActivities}
            isMulti
            name="outdoorActivities"
            value={formData?.outdoorActivities.map(option => ({ value: option, label: option }))}
            onChange={selectedOptions => setFormData({ ...formData, outdoorActivities: selectedOptions.map(option => option.value) })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Common Area
          </label>
          <Select
            options={amenityOptions?.commonArea}
            isMulti
            name="commonArea"
            value={formData?.commonArea.map(option => ({ value: option, label: option }))}
            onChange={selectedOptions => setFormData({ ...formData, commonArea: selectedOptions.map(option => option.value) })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Security
          </label>
          <Select
            options={amenityOptions?.security}
            isMulti
            name="security"
            value={formData?.security.map(option => ({ value: option, label: option }))}
            onChange={selectedOptions => setFormData({ ...formData, security: selectedOptions.map(option => option.value) })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Entertainment
          </label>
          <Select
            options={amenityOptions?.entertainment}
            isMulti
            name="entertainment"
            value={formData?.entertainment.map(option => ({ value: option, label: option }))}
            onChange={selectedOptions => setFormData({ ...formData, entertainment: selectedOptions.map(option => option.value) })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Bedrooms
          </label>
          <input
            type="text"
            name="bedrooms"
            value={formData?.bedrooms}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Room Size
          </label>
          <input
            type="text"
            name="roomSize"
            value={formData?.roomSize}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData?.description}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={formData?.price}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        {/* Add other input fields here for all the properties */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <AiOutlineSave className="mr-2" /> Save
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            <AiOutlineArrowLeft className="mr-2" /> Back
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default EditPropertyPage;
