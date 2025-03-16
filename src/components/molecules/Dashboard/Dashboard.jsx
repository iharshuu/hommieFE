import React, { useEffect, useState } from 'react'
import Navbar from '../../organisms/Navbar'
import Carousel from '../Card/Carousel'
import EssentialCard from '../Card/EssentialCard'
import Reviews from '../Card/Review'
import FaqQuestions from '../FaqQuestions'
import Rooms from '../Card/Roomcard'
import ProtectedFooter from '../../organisms/Footer/protected'
import HostelsGrid from '../Card/HostelGrid'
import { backendUrl } from '../../../lib/config'
import axios from 'axios'

const Dashboard = () => {

  const [properties , setProperties] = useState()

  const handlecomment = async() =>{
    const token = localStorage.getItem('hoomie');

    try {
      const response = await axios.get(`${backendUrl}homepage/top-commented/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`, // Include the token in the Authorization header
        },

      });
  
      console.log(response.data);
      setProperties(response?.data?.properties)
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

  useEffect(()=>{
    handlecomment()
  },[])

  return (
    <div>
        <Navbar/>
        <div className='mt-5'>
          <Carousel/>
        {properties?.length >2 && <HostelsGrid properties={properties}/> }
        <EssentialCard/>
        {/* <Rooms/> */}
        <FaqQuestions/>
        <Reviews/>
        <ProtectedFooter/>
        </div>
    </div>
  )
}

export default Dashboard