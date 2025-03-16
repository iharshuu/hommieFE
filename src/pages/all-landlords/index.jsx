import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../../lib/config';
import Navbar from '../../components/organisms/Navbar';
import FuzzySearch from "fuzzy-search";
import { BeatLoader } from "react-spinners";



const AllLandlords = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [houses, setHouses] = useState([]);
    const navigate = useNavigate();
    const [filteredcareer , setFilteredCareers] = useState()
    const [loading , setloading] = useState(false)



    const handlelandlords = async () => {
        const token = localStorage.getItem('hoomie');
        try {
            const response = await axios.get(`${backendUrl}homePage/view_landlords`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`, // Include the token in the Authorization header
                },
            });
            console.log(response.data);
            setHouses(response.data?.usersWithProperties);
        
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

    const handleOnChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    
        const searcher = new FuzzySearch(houses, ['_id'], {
          caseSensitive: false,
        });
        const result = searcher.search(query);
        console.log(result)
        setFilteredCareers(result);
      };

    return (
        <>
        <Navbar/>
        {
            loading ? 
        
        <div className="flex flex-col h-screen mx-8 my-2">
            <div className='flex justify-end '>
                <div className="relative w-[20vw]">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        value={searchQuery}
                        onChange={handleOnChange}
                        placeholder="Search by email..."
                        className="rounded-lg border p-3 pl-10 text-sm text-black w-full outline-none"
                    />
                    <div className="absolute top-[0.90rem] left-3 ">
                        <CiSearch className="text-[#A6A6A6] text-lg font-bold" />
                    </div>
                </div>
            </div>
            <div className="flex flex-grow overflow-hidden">
                <div className="flex-grow p-4 overflow-y-auto">
                    {(filteredcareer || houses).map((house, index) => (
                        <div key={index} className="flex mb-8 bg-white rounded-lg shadow cursor-pointer overflow-hidden" onClick={() => navigate(`/all-landlords/${house?._id}`)} >
                            <div className="flex-1 p-4">
                                <h3 className="text-xl font-semibold">{house?._id}</h3>
                                {/* <p className="text-gray-500">{house.location}</p>
                                <p className="text-gray-500">{house.email}</p> */}
                            </div>
                            <div className='p-4 flex items-center'>
                                <p className="text-gray-500 text-lg">Number of Houses: {house.count}</p>
                            </div>
                        </div>
                    ))}
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

export default AllLandlords;
