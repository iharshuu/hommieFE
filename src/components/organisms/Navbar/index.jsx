import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaBell } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHelpCircle } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { IoReorderThreeOutline, IoClose } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { backendUrl } from "../../../lib/config";
import image from "../../../assets/image/ForgotPassword/image.png"



const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [userprofiledata , setuserprofiledata] = useState(null)

  const getMe = async () => {
    try {
        // Fetch user profile data
        const token = localStorage.getItem('cred');
        setuserprofiledata(JSON.parse(token))

      //   const response = await fetch(`${backendUrl}homePage/me`, {
      //     method: 'GET',
      //     headers: {
      //         'Content-Type': 'application/json',
      //         'Authorization': `${token}`, // Include the token in the Authorization header
      //     },
      // });
        
      //   // Parse response data
      //   const userData = await response.json();

      //   // Assuming userData contains the user profile data
      //   console.log('User Profile Data:', userData);
      //   setuserprofiledata(userData.check)

        // Set user profile data in state or perform other actions
        // For example, if you're using React with useState hook:
        // setUserProfile(userData);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error (e.g., show error message, retry request, etc.)
    } finally {
        setLoading(true);
    }
};

  useEffect(() => {
    getMe();
  }, [userprofiledata===null]);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeDropdownOnOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target )
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdownOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeDropdownOnOutsideClick);
    };
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    // Perform logout action
    localStorage.removeItem('cred')
    localStorage.removeItem('hoomie')
    navigate("/");
  };



  return (
    <div>
      <nav className=" py-4 px-20 sm:px-4 md:px-10 flex justify-between items-center border border-[#E8EDF1] sticky top-0 bg-white z-10">
        {windowWidth >= 600 && (
          <>
          <div className="flex ml-4 ">
            <img src={image} alt="imagelogo"  className="w-16 h-16 object-cover"/>
          </div>
            <div className="flex items-center ml-auto space-x-4 md:space-x-1">
              <Link to="/dashboard">
                <div
                  className={` p-2 text-sm hover:text-[#191919] font-semibold ${
                    currentPath === "/dashboard"
                      ? "text-[#191919]"
                      : "text-[#5B6871]"
                  }`}
                >
                  Home
                </div>
              </Link>
              <Link to="/all-houses">
                <div
                  className={` p-2 text-sm flex flex-row gap-1 hover:text-[#191919] font-semibold ${
                    currentPath === "/all-houses"
                      ? "text-[#191919]"
                      : "text-[#5B6871]"
                  }`}
                >
                   {/* <div className="p-1 rounded-full bg-gray-200">
                   <FaHouseChimneyUser className="" />
                </div> */}
                  All houses
                </div>
              </Link>
              <Link to="/all-rooms">
                <div
                  className={` p-2 text-sm hover:text-[#191919] font-semibold ${
                    currentPath === "/all-rooms"
                      ? "text-[#191919]"
                      : "text-[#5B6871]"
                  }`}
                >
                  All Rooms
                </div>
              </Link>
              <Link to="/all-landlords">
                <div
                  className={` p-2 text-sm hover:text-[#191919] font-semibold ${
                    currentPath === "/all-landlords"
                      ? "text-[#191919]"
                      : "text-[#5B6871]"
                  }`}
                >
                  Landlords
                </div>
              </Link>
              <Link to="/list-your-hostel">
                <div
                  className={` p-2 text-sm flex flex-row gap-1 hover:text-[#191919] font-semibold ${
                    currentPath === "/list-your-hostel"
                      ? "text-[#191919]"
                      : "text-[#5B6871]"
                  }`}
                >
                  {/* <div className="p-1 rounded-full bg-gray-200">
                <BsFillBuildingsFill className=""/>
                </div> */}
                  Rently agency
                </div>
              </Link>
              <Link to="/about-us">
                <div
                  className={` p-2 text-sm flex flex-row gap-1 hover:text-[#191919] font-semibold ${
                    currentPath === "/about-us"
                      ? "text-[#191919]"
                      : "text-[#5B6871]"
                  }`}
                >
                  {/* <div className="p-1 rounded-full bg-gray-200">
                <BsFillBuildingsFill className=""/>
                </div> */}
                  About us
                </div>
              </Link>
              
            </div>
            <div className="flex items-center ml-5 space-x-4" ref={dropdownRef}>
              <div className="relative group">
                <div
                  className="text-[#B0BABF] p-1 cursor-pointer"
                  onClick={toggleUserDropdown}
                >
                  <FaUser className="h-6 w-auto" />
                </div>
                {isUserDropdownOpen && (
                  <div className="absolute bg-[#ffff] shadow-sm border-spacing-0 right-0 mt-2 z-40 nav-dropdown w-fit">
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/my-profile/basic-details"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={() => setDrawerOpen(false)}
                        >
                          <div className="flex items-center border rounded-lg p-2 gap-4 w-full">
                          {userprofiledata?.photos[0]?.path ? (
                            <img src={userprofiledata?.photos[0]?.path} alt="User Photo" 
                            className="h-6 w-6 object-cover"
                            />
) : (
    <FaUser className="h-6 w-6" />
)}
                            <div className="w-36">
                              { loading ? (
                                <>
                                  <p className="font-semibold text-[#191919]">
                                    {userprofiledata.name || "N/A"}
                                  </p>
                                  <p className="text-[#5B6871] text-xs">
                                    {userprofiledata.email || "N/A"}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="font-semibold text-[#191919]">
                                    Loading...
                                  </p>
                                  <p className="text-[#5B6871] text-xs">
                                    Loading...
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='#'
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={() => 
                            window.location.href = "mailto:harshalmten@gmail.com"
                          }
                        >
                          <div className="flex items-center gap-2">
                            <IoHelpCircle className="h-6 w-6" />
                            <div>
                              <p className="font-semibold text-xs text-[#191919]">
                                Help & Support
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li
                        onClick={handleLogout}
                        className="block px-5 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <LuLogOut className="h-5 w-5" />
                          <div>
                            <p className="font-semibold text-xs">Logout</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
