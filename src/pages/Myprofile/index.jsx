import React , {useState , useEffect} from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { HiUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
import ProfileRoutes from '../../routes/ProfileRoutes';
import { NavLink } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import EditProfileForm from '../../components/molecules/Form/EditProfileForm';
import Navbar from '../../components/organisms/Navbar';

const MyProfile = ({ children }) => {
  const navigate = useNavigate();

  const handleBack = () => {
     navigate('/dashboard');
  };
  const activeLink = 'bg-black text-white';
  const inactiveLink = 'text-gray-700 hover:bg-gray-950 hover:text-white';

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <>
      <Navbar/>
      <div className="mx-16 mt-8 flex flex-col gap-5">
        <div className="">
          <button
            className="text-[#121212] text-sm hover:text-gray-500 cursor-pointer flex items-center py-3 px-4 gap-2"
            onClick={handleBack}
          >
            <BiArrowBack className="font-bold" /> Back
          </button>
        </div>
        <div className="flex flex-row gap-20">
        <div className="w-[25vw] border-2 border-gray-200 rounded-lg shadow-md flex flex-col items-center p-4">
      <div className="w-full flex justify-center">
      </div>
      <div className="w-full mt-4">
        <div className="mt-6 flex flex-col gap-3">
          <NavLink
            to="/my-profile/basic-details"
            className={({ isActive }) => `w-full flex text-left pl-2 py-2 text-lg items-center font-medium rounded-md ${isActive ? activeLink : inactiveLink}`}
          >
            Basic Details <span className='flex ml-auto mr-3'><IoIosArrowForward /></span>
          </NavLink>
          <NavLink
            to="/my-profile/change-password"
            className={({ isActive }) => `w-full flex items-center text-left pl-2 py-2 text-lg font-medium rounded-md ${isActive ? activeLink : inactiveLink}`}
          >
            Change Password <span className='flex ml-auto mr-3'><IoIosArrowForward /></span>
          </NavLink>
        </div>
      </div>
    </div>
  
          <div className="w-[60vw] border-2 border-gray-200 rounded-lg shadow-md flex flex-col  p-2 ">
            <ProfileRoutes />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
