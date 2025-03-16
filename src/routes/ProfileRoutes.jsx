import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import EditProfileForm from '../components/molecules/Form/EditProfileForm';
import ChangePasswordForm from '../components/molecules/Form/ChangePasswordForm';
import { backendUrl } from "../lib/config"

const BasicDetails = () => {

  
  return(  
  <div>
    {/* Content for Basic Details goes here */}
    <EditProfileForm />
  </div>
  )
  }

const ChangePassword = () => (
  <div>
    {/* Content for Change Password goes here */}
    <ChangePasswordForm />
  </div>
);

const ProfileRoutes = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
      {windowWidth >= 600 && (
        <>
            <Routes>
          <Route path="/basic-details" element={<BasicDetails />} index />
          <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </>
      )}

      {windowWidth < 600 && (
        <Routes>

        <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      )}
      </>
  );
};

export default ProfileRoutes;
