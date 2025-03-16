import React ,{useState} from 'react';
import { FaArrowRight, FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../../../../lib/config';

const HostelCard = ({ propertyName, city, price, distanceFromUniversity, type ,_id ,category ,photos}) => {
  const navigate = useNavigate()
    return (
      <div className="w-[25vw] rounded overflow-hidden shadow-lg cursor-pointer bg-white" onClick={()=>navigate(`/all-${category}s/${_id}`)} >
      <img className="w-[25vw] h-48 p-2 object-cover" src={`${photos[0]?.path}`} alt="Room Image" />
          <div className="font-bold text-xl ml-3 mt-2">{propertyName}</div>
      <div className="px-3 py-2 flex justify-between items-center">
        <div>
          <p className="text-gray-700 py-2 text-base">
            {city}
          </p>
          <p className="text-gray-900 text-lg">
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs py-2 text-gray-600">{distanceFromUniversity} miles from university</span>
          <span className="text-xs text-gray-500">{type}</span>
        </div>
      </div>
    </div>
    
    );
  };

  const HostelsGrid = ({properties}) => {
   
  
    // State to keep track of the current index
    const [currentIndex, setCurrentIndex] = useState(0);
  
    // Function to handle right arrow click
   
  
    // Calculate the subset of hostels to display
  
    return (
      <div className="container mx-auto px-4">

        <div className='text-black font-semibold text-2xl'>
          Top commented 
        </div>
        <div className="flex flex-row gap-8 justify-center ">


         
          
          {/* Map through the displayedHostels array to render HostelCard components */}
          {properties.map((hostel, index) => (
            <div key={index} className="my-1 px-1 w-full lg:my-4 lg:px-4 lg:w-[25vw]">
              <HostelCard  {...hostel} />
            </div>
          ))}
          
          
        </div>
      </div>
    );
  };
  
  export default HostelsGrid;