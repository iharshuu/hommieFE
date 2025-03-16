import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import 'rc-slider/assets/index.css';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../../lib/config';
import axios from 'axios';
import PropertyCard from './PropertyCard';
import Navbar from '../../components/organisms/Navbar';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FuzzySearch from "fuzzy-search";
import { BeatLoader } from "react-spinners";



function valuetext(value) {
    return `$${value}`;
}

const Allhouses = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [houses, setHouses] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [priceRange, setPriceRange] = useState([200, 2000]); // Default price range
    const [loading , setloading] = useState(false)


    const [filteredcareer , setFilteredCareers] = useState()

    const handlelandlords = async () => {
        const token = localStorage.getItem('hoomie');
        try {
            const response = await axios.get(`${backendUrl}homePage/view_properties/house`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            });
            setHouses(response.data?.properties);
            const prices = response.data?.properties.map(property => property.price);
            if (prices.length > 0) {
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                setPriceRange([minPrice, maxPrice]);
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

    const handleCheckboxChange = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const handlefilter = async () => {
        setloading(false)
        const token = localStorage.getItem('hoomie');
        if (selectedTypes.length === 0) {
            handlelandlords();
        } else {
            try {
                const response = await axios.get(`${backendUrl}homePage/view_property/house`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                    params: {
                        selectedTypes: selectedTypes
                    }
                });
                if (response?.data.status === "S") {
                    setHouses(response?.data?.properties);
                } else {
                    console.error('Error fetching properties:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
            finally{
                setloading(true)
              }
        }
    };

    const handleChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleOnChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    
        const searcher = new FuzzySearch(houses, ['propertyName' , "city"], {
          caseSensitive: false,
        });
        const result = searcher.search(query);
        console.log(result)
        setFilteredCareers(result);
      };
    
    return (
        <>
            <Navbar/>
            <div className="flex flex-col mx-8 h-screen">
            <div className="flex items-center ml-auto px-10  py-4">
            <div className="relative w-[30vw]">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        value={searchQuery}
                         onChange={handleOnChange}
                        placeholder="Search by name or city..."
                        className="rounded-lg border p-3 pl-10 text-sm text-black w-full outline-none"
                    />
                    <div className="absolute top-[0.90rem] left-3 ">
                        <CiSearch className="text-[#A6A6A6] text-lg font-bold" />
                    </div>
                </div>
</div>

                <div className="flex flex-grow  overflow-hidden">
                    <div className="w-1/4 bg-gray-50 p-4 overflow-y-auto ">
                        <div className='mt-5'>
                            <h2 className="text-lg font-semibold mb-2">Price Range</h2>
                            <Box sx={{ width: 200 }}>
                                <Slider
                                    getAriaLabel={() => 'Price range'}
                                    value={priceRange}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                    min={5000}
                                    max={200000}
                                />
                            </Box>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold mb-2">Property Types</h2>
                            <div className="flex flex-col space-y-2">
                                {[
                                    { label: 'Apartment', type: 'Apartment' },
                                    { label: 'Single-family Home', type: 'Single-family Home' },
                                    { label: 'Condominium', type: 'Condominium' },
                                    { label: 'Townhouse', type: 'Townhouse' },
                                    // { label: 'On-Campus', type: 'On-Campus' }

                                ].map((filter) => (
                                    <label key={filter.type} className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedTypes.includes(filter.type)}
                                            onChange={() => handleCheckboxChange(filter.type)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span>{filter.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <button onClick={handlefilter} className='bg-green-500 px-4 py-2 text-white mt-8 rounded-md hover:bg-green-600 transition duration-300'>
                            Apply Filters
                        </button>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto no-scrollbar ">
                        {
                            loading ? 
                        <>
                        {(filteredcareer || houses)?.map((house) => {
                            if (house.price >= priceRange[0] && house.price <= priceRange[1]) {
                                return <PropertyCard key={house._id} property={ house} />;
                            }
                            return null;
                        })}
                        </>
                        :
                        <div className="flex justify-center items-center h-[50vh]">
        <BeatLoader color="#4A90E2" />
      </div>
                    }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Allhouses;
