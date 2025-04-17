import React, { Suspense, lazy } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
// import ChatPage from "./pages/ChatPage/ChatPage";
import { BeatLoader } from "react-spinners";


const Login = lazy(() => import("./components/molecules/Login"));
const Signup = lazy(() => import("./components/molecules/Sigin"));
const Dashboard = lazy(() => import("./components/molecules/Dashboard/Dashboard"));
const Setpassword = lazy(() => import("./components/molecules/Setpassword"));
const Forgotpassword = lazy(() => import("./components/molecules/Forgotpassword"));
const Resetpassword = lazy(() => import("./components/molecules/Restpassword"));
const MyProfile = lazy(() => import("./pages/Myprofile"));
const UploadImages = lazy(() => import("./uploadImages/UploadImages"));
const Listyourhostel = lazy(() => import("./pages/Listyourhostel"));
const Addhostel = lazy(() => import("./pages/add-hostel"));
const Allhouses = lazy(() => import("./pages/all-houses/All-houses"));
const AllRooms = lazy(() => import("./pages/allRooms/AllRooms"));
const PropertyDetails = lazy(() => import("./pages/House"));
const RoomDetails = lazy(() => import("./pages/Roompage"));
const AllLandlords = lazy(() => import("./pages/all-landlords"));
const Landlords = lazy(() => import("./pages/Landlord"));
const EditPropertyPage = lazy(() => import("./pages/Edit-hostel"));
const AboutUs = lazy(() => import("./components/molecules/AboutUS"));
const ChatPage = lazy(() => import("./pages/ChatPage/ChatPage"));

const Loading = () => (
  <div className="flex justify-center items-center h-[50vh]">
                    <BeatLoader color="#4A90E2" />
                </div>
);

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all-houses" element={<Allhouses />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/all-houses/:id" element={<PropertyDetails />} />
            <Route path="/all-rooms" element={<AllRooms />} />
            <Route path="/all-rooms/:id" element={<RoomDetails />} />
            <Route path="/all-landlords" element={<AllLandlords />} />
            <Route path="/chat" element={<ChatPage  />} />
            <Route path="/all-landlords/:id" element={<Landlords />} />
            <Route path="/setpassword/:id" element={<Setpassword />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/resetpassword/:id" element={<Resetpassword />} />
            <Route path="/my-profile/*" element={<MyProfile />} />
            <Route path="/upload" element={<UploadImages />} />
            <Route path="/list-your-hostel/*" element={<Listyourhostel />} />
            <Route path="/list-your-hostel/add-hostel" element={<Addhostel />} />
            <Route path="/list-your-hostel/edit/:id" element={<EditPropertyPage />} />
            <Route path="/" element={<Navigate to={"/login"} replace />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
