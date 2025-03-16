import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { backendUrl } from '../../lib/config';
import Navbar from '../../components/organisms/Navbar';
import { FaArrowLeft } from 'react-icons/fa';
import { BeatLoader } from "react-spinners";



const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white" onClick={()=>navigate(`/all-${room.category}s/${room._id}`)}>
      <img className="w-full h-48 object-cover" src={`${room?.photos[0].path}`} alt={room.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{room.name}</div>
        <p className="text-gray-700 text-base">
          City: {room.city}<br />
          Price:   {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(room.price)}

          
          <br />
          Distance from University: {room.distanceFromUniversity}<br />
          {/* Reviews: {room.reviews} */}
        </p>
      </div>
    </div>
  );
};

const HouseCard = ({ house }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={`${backendUrl}homepage/specificImage/${house?.photos[0].path}`} alt={house.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{house.name}</div>
        <p className="text-gray-700 text-base">
          City: {house.city}<br />
          Price: ${house.price}<br />
          Distance from University: {room.distanceFromUniversity}<br />
          {/* Reviews: {house.reviews} */}
        </p>
      </div>
    </div>
  );
};

const Landlords = () => {
 
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);

  const [rooms , setRooms] = useState([])

  const {id} = useParams()
  const [loading , setloading] = useState(false)




  const handlelandlords = async () => {
      const token = localStorage.getItem('hoomie');
      try {
          const response = await axios.get(`${backendUrl}homePage/view_specific_landlord_properties/${id}`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`, // Include the token in the Authorization header
              },
          });
          console.log(response.data);
          setHouses(response.data?.propertieshouse);
          setRooms(response.data?.propertiesroom)
      
          if (response.status === 200) {
          } else {
            console.error('Error uploading form data:', response.statusText);
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
      finally{
        setloading(true)
      }
  };

  useEffect(() => {
      handlelandlords();
  }, []);

  


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
    {
      loading ? 
    
    <div className="container mx-16">
      <h1 className="text-3xl font-bold text-center mb-8">Landlord Details</h1>
      <div className=" gap-8">
       
            <h2 className="text-xl font-bold mb-4"></h2>
            <div className="grid grid-cols-1 gap-4">
              <h3 className="text-lg font-semibold">Rooms</h3>
              <div className=' w-full gap-4 grid grid-cols-3'>
              {rooms.length >0 ?  rooms?.map((room, index) => (
                <RoomCard key={index} room={room} />
              )) 
            : 
            <h1>
              No Rooms availble
            </h1>
            }
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <h3 className="text-lg font-semibold">Houses</h3>
              <div className=' w-full gap-4 grid grid-cols-3'>
              {houses.length >0 ?  houses?.map((room, index) => (
                <RoomCard key={index} room={room} />
              )) 
            : 
            <h1>
              No Houses availble
            </h1>
            }
              </div>
            </div>
          
      </div>
    </div>
    :
    <div className="flex justify-center items-center h-[50vh]">
    <BeatLoader color="#4A90E2" />
  </div>
          }
    </>
  );
};

export default Landlords;
