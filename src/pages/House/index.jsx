import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiMail, FiPhoneCall, FiMapPin, FiHome, FiKey, FiCamera } from 'react-icons/fi';
import { MdSecurity, MdOutdoorGrill, MdGroup, MdLocalMovies } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { backendUrl } from '../../lib/config';
import Navbar from '../../components/organisms/Navbar';
import { FaArrowLeft } from "react-icons/fa";


import Review from '../reviews/Reviews1';
import { BeatLoader } from 'react-spinners';

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()


  const[review,setReview]=useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      const token = localStorage.getItem('hoomie');
      try {
        const response = await axios.get(`${backendUrl}homePage/view_propertie/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`, // Include the token in the Authorization header
          },
        });
        if (response.status === 200) {
          setProperty(response.data?.propertydata);
        } else {
          console.error('Error fetching property data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div className="flex justify-center items-center h-[50vh]">
    <BeatLoader color="#4A90E2" />
</div>
  }

  const {
    propertyName,
    description,
    email,
    mobileNumber,
    houseNumber,
    locality,
    city,
    state,
    country,
    pincode,
    landmark,
    distanceFromUniversity,
    basicFacilities,
    outdoorActivities,
    commonArea,
    security,
    entertainment,
    bedrooms,
    roomSize,
    price,
    photos,
  } = property;

  return (
    <>
    <Navbar/>
    <div className='ml-5 mt-3'>
    <button
      onClick={() => {
         navigate(-1)
      }}
      className=" px-2 py-0.75"
    >
      <div className="gap-x-2 text-[#6B7280] text-[14px] font-[500] leading-5 flex items-center">
        {/* <img src={ArrowLeftIcon} className=""/> */}
        <FaArrowLeft />
        <span className="ml-1">Back</span>
      </div>
    </button>
    </div>
    <div className="w-[75vw] mx-auto px-4 py-8 bg-white rounded-lg shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Property Images Carousel */}
        <div className='h-[80vh] order-2'>
        <div className="order-2 relative">
          {/* Combined Card */}
          <div className="overflow-hidden bg-white rounded-lg shadow-xl">
            {/* Carousel */}
            <div className="carousel rounded-lg overflow-hidden">
              <div className="flex overflow-x-auto snap-x snap-mandatory overflow-y-hidden no-scrollbar">
                {photos && photos.length > 0 && photos.map((image, index) => (
                  <div key={index} className="snap-center w-full flex-none transition duration-500 ease-in-out transform hover:scale-105">
                    <img src={image.path} alt={`Property image ${index + 1}`} className="w-full h-[50vh] object-cover rounded-lg" />
                  </div>
                ))}
              </div>
              <div className="absolute top-2 right-2 bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-full shadow-lg">
                <FiCamera className="text-white" size="24" />
              </div>
            </div>

            {/* Room Details */}
            <div className="px-6 py-4 bg-blue-50">
              <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
                <FiHome className="text-xl mr-2" />Room Details
              </h3>
              <div className='flex flex-row items-center justify-between gap-4'>
                <p className="text-gray-600 mb-2">Bedrooms: {bedrooms}</p>
                <p className="text-gray-600 mb-2">Room Size: {roomSize}</p>
              </div>
              <p className="font-bold text-xl flex items-center justify-center text-green-600">Price:   {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)}
              </p>
            </div>
          </div>
        </div>
        </div>

        {/* Property Details */}
        <div className="md:order-1">
          <div className='h-[80vh]'>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">{propertyName}</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{description}</p>
          <div className="mb-8">
            <h3 className="font-semibold text-xl text-gray-800 mb-4 flex items-center hover:text-indigo-500 transition duration-300">
              <FiKey className="text-2xl mr-3" />Contact Information
            </h3>
            <p className="text-gray-600 flex items-center hover:text-indigo-500 transition duration-300">
              <FiMail className="text-xl mr-3" />{email}
            </p>
            <p className="text-gray-600 flex items-center hover:text-indigo-500 transition duration-300">
              <FiPhoneCall className="text-xl mr-3" />{mobileNumber}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
              <FiMapPin className="text-xl mr-2" />Location
            </h3>
            <p className="text-gray-600">
              {houseNumber}, {locality}, {city}, {state}, {country} - {pincode}
            </p>
            <p className="text-gray-600">Landmark: {landmark}</p>
            {/* <p className="text-gray-600">Distance from university: {distanceFromUniversity} miles</p> */}
          </div>
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-5">Amenities</h3>
            <div className="grid w-[70vw] h-[50vh] grid-cols-3 gap-6">
              {/* Basic Facilities */}
              <div className="relative group bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <MdSecurity className="text-2xl text-blue-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-800">Basic Facilities</h4>
                  </div>
                </div>
                <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-50 bg-opacity-95 max-h-[50vh] overflow-auto no-scrollbar">
                  <ul className="list-disc pl-5 space-y-2">
                    {basicFacilities.map((facility, index) => (
                      <li key={index} className="text-gray-700">{facility}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Outdoor Activities */}
              <div className="relative group bg-gradient-to-br from-green-100 to-green-200 shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <MdOutdoorGrill className="text-2xl text-green-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-800">Outdoor Activities</h4>
                  </div>
                </div>
                <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-green-50 bg-opacity-95">
                  <ul className="list-disc pl-5 space-y-2">
                    {outdoorActivities.map((activity, index) => (
                      <li key={index} className="text-gray-700">{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Common Area */}
              <div className="relative group bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <MdGroup className="text-2xl text-yellow-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-800">Common Area</h4>
                  </div>
                </div>
                <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-yellow-50 bg-opacity-95">
                  <ul className="list-disc pl-5 space-y-2">
                    {commonArea.map((area, index) => (
                      <li key={index} className="text-gray-700">{area}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Entertainment */}
              <div className="relative group bg-gradient-to-br from-red-100 to-red-200 shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <MdLocalMovies className="text-2xl text-red-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-800">Entertainment</h4>
                  </div>
                </div>
                <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-50 bg-opacity-95">
                  <ul className="list-disc pl-5 space-y-2">
                    {entertainment.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Security */}
              <div className="relative group bg-gradient-to-br from-purple-100 to-purple-200 shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center">
                    <MdSecurity className="text-2xl text-purple-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-800">Security</h4>
                  </div>
                </div>
                <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-50 bg-opacity-95">
                  <ul className="list-disc pl-5 space-y-2">
                    {security.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div>{ <button onClick={()=>setReview(!review)} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{!review?"Show Reviews":"Hide Reviews"}</button>}</div>
          <div>{review&&<Review postId={id}/>}</div>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default PropertyDetails;
