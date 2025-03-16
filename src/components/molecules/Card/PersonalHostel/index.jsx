import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard';
import axios from 'axios';
import { backendUrl } from '../../../../lib/config';
import { BeatLoader } from "react-spinners";


const PersonalHostel = () => {

  const [hostelData , setHostelData] = useState([])

  const [loading , setloading] = useState(false)

  
    const handlelandlords = async () => {
        const token = localStorage.getItem('hoomie');
        try {  
           const responsemail = await axios.get(`${backendUrl}homePage/me`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, // Include the token in the Authorization header
          },
           })          
            const response = await axios.get(`${backendUrl}homePage/view_your_property/${responsemail?.data?.check?.email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`, // Include the token in the Authorization header
                },
            });
            console.log(response.data);
            setHostelData(response.data?.properties);
        
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
    {
      loading ? 
    
     <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4">
        {hostelData.length > 0 ? 
        <>
        {
        hostelData?.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))
      }
        </>
      : <h1 className='flex items-center mx-auto text-3xl'>No Data availble</h1>
      }
      </div>
    </div>
    :
    <div className="flex justify-center items-center h-[50vh]">
            <BeatLoader color="#4A90E2" />
          </div>
}
  
    </>
  )
}

export default PersonalHostel