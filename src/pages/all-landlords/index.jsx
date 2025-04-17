import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaRegCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../../lib/config';
import Navbar from '../../components/organisms/Navbar';
import FuzzySearch from "fuzzy-search";
import { BeatLoader } from "react-spinners";
import ChatPage from '../ChatPage/ChatPage';

const AllLandlords = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [houses, setHouses] = useState([]);
    const navigate = useNavigate();
    const [filteredCareer, setFilteredCareers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userChat, setUserChat] = useState(null); // Corrected state name

    useEffect(() => {
        const handleLandlords = async () => {
            const token = localStorage.getItem('hoomie');
            try {
                const response = await axios.get(`${backendUrl}homePage/view_landlords`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });
                setHouses(response.data?.usersWithProperties || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        handleLandlords();
    }, []);

    const handleOnChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const searcher = new FuzzySearch(houses, ['email', 'name'], { caseSensitive: false });
        const result = searcher.search(query);
        setFilteredCareers(result.length ? result : null);
    };

    const handleChat = () => {
        setUserChat(null);
    }

    const cred = JSON.parse(localStorage.getItem("cred"));

    // console.log(cred);
    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-[50vh]">
                    <BeatLoader color="#4A90E2" />
                </div>
            ) : userChat ? (
                <ChatPage userchat={userChat}/> // Render ChatPage if userChat is set
            ) : (
                <>
                <Navbar />
                <div className="flex flex-col h-screen mx-8 my-2">
                    <div className='flex justify-end mb-4'>
                        <div className="relative w-[20vw]">
                            <input
                                type="text"
                                id="search"
                                name="search"
                                value={searchQuery}
                                onChange={handleOnChange}
                                placeholder="Search by email or name..."
                                className="rounded-lg border p-3 pl-10 text-sm text-black w-full outline-none"
                            />
                            <div className="absolute top-[0.90rem] left-3">
                                <CiSearch className="text-[#A6A6A6] text-lg font-bold" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-grow overflow-hidden">
                        <div className="flex-grow p-4 overflow-y-auto">
                        {(filteredCareer || houses)
    .filter(house => house._id !== cred._id) // Filter out the logged-in user
    .map((house, index) => (
        <div 
            key={index} 
            className="flex justify-between items-center mb-6 bg-white rounded-lg shadow p-4 cursor-pointer" 
            onClick={() => navigate(`/all-landlords/${house?.email}`)}
        >
            <div>
                <h3 className="text-lg font-semibold">Landlord Name: {house?.name}</h3>
                <h3 className="text-lg font-semibold">Landlord EmailID: {house?.email}</h3>
                <p className="text-gray-500">Number of Properties: {house.propertyCount}</p>
            </div>
            <FaRegCommentDots 
                className="text-gray-500 text-2xl cursor-pointer" 
                onClick={(e) => {
                    e.stopPropagation();
                    setUserChat(house); // Set userChat to display ChatPage
                }} 
            />
        </div>
    ))
}
                        </div>
                    </div>
                </div>
                </>
            )}
        </>
    );
};

export default AllLandlords;
