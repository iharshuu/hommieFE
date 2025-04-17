import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FaArrowLeft } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";
import {
  MdSecurity,
  MdOutdoorGrill,
  MdGroup,
  MdLocalMovies,
} from "react-icons/md";
import { motion } from "framer-motion";
import Navbar from "../../components/organisms/Navbar";
import { backendUrl } from "../../lib/config";
import Review from "../reviews/Reviews1";
import jsPDF from "jspdf";
import { toast } from "sonner";

const RoomDetails = () => {
  const [room, setRoom] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [customerDetails, setCustomerDetails] = useState();
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const script = JSON.parse(localStorage.getItem("cred"));
    setCustomerDetails(script);
    const fetchRoom = async () => {
      const token = localStorage.getItem("hoomie");
      try {
        const res = await axios.get(`${backendUrl}homePage/view_propertie/${id}`, {
          headers: { Authorization: token },
        });
        if (res.status === 200) {
          const data = res.data?.propertydata;
          setRoom(data);
          if (data?.photos?.length > 0) {
            setSelectedImage(data.photos[0].path);
          }
        }
      } catch (err) {
        console.error("Failed to fetch room:", err);
      }
    };

    fetchRoom();
  }, [id]);

  const generatePDF = async (status, paymentId, amount) => {
    const doc = new jsPDF();
  
    // Load Hommie logo
    const logoUrl = "https://hommiefe.vercel.app/assets/image-21V97lk_.png";
    const image = await fetch(logoUrl)
      .then(res => res.blob())
      .then(blob => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      }));
  
    // Add Logo
    doc.addImage(image, "PNG", 80, 10, 50, 30);
  
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Payment Receipt", 105, 40, { align: "center" });
  
    doc.setDrawColor(200);
    doc.line(20, 45, 190, 45); // top line
  
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
  
    const details = [
      ["Status", status.toUpperCase()],
      ["Name", customerDetails?.name || "N/A"],
      ["Email", customerDetails?.email || "N/A"],
      ['paidto', "Hommie"],
      ["Property Name", propertyName],

      ["Payment ID", paymentId],
      ["Amount", ` ${(amount / 100).toLocaleString("en-IN")} Rs/-`],
      ["Date", new Date().toLocaleString()],
    ];
  
    let y = 55;
    details.forEach(([label, value]) => {
      doc.setFont(undefined, "bold");
      doc.text(`${label}:`, 25, y);
      doc.setFont(undefined, "normal");
      doc.text(`${value}`, 70, y);
      y += 10;
    });
  
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Thank you for booking with Hommie!", 105, y + 10, { align: "center" });
  
    doc.save(`Hommie-Receipt-${paymentId}.pdf`);
  };
  

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}order`, {
        amount: price * 100,
        currency: "INR",
        receipt: new Date().getTime().toString(),
      });

      const options = {
        key: "rzp_test_REHiXvIdoU0pqW",
        amount: price * 100,
        currency: "INR",
        name: "Hommie",
        description: "Room Booking Payment",
        image: "https://hommiefe.vercel.app/assets/image-21V97lk_.png",
        order_id: data.id,
        handler: async (response) => {
          await axios.post(`${backendUrl}order/validate`, response);
          generatePDF("success", response.razorpay_payment_id, room.price * 100);
          toast.success("Payment Successful!");
        },
        prefill: {
          name: customerDetails?.name || "Customer",
          email: customerDetails?.email || "",
        },
        notes: {
          address: "Hommie Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        generatePDF("failed", response.error.metadata.payment_id, property.price * 100);
        toast.failure("Payment Failed: " + response.error.description);
      });

      rzp1.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.failure("Payment initiation failed.");
    }
  };

  if (!room) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="#4A90E2" />
      </div>
    );
  }

  const {
    propertyName,
    description,
    email,
    mobileNumber,
    houseNumber,
    locality,
    city,
    state,
    country,
    pincode,
    landmark,
    basicFacilities,
    outdoorActivities,
    commonArea,
    security,
    entertainment,
    bedrooms,
    roomSize,
    price,
    photos,
  } = room;

  return (
    <>
      <Navbar />

      <div className="w-[95%] md:w-[90%] mx-auto p-4 max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        {/* Main Image */}
        {selectedImage && (
          <motion.img
            key={selectedImage}
            src={selectedImage}
            alt="Selected"
            className="w-full h-[40vh] md:h-[60vh] object-contain rounded-md shadow mb-4"
            initial={{ opacity: 0.6, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Thumbnails */}
        <div className="flex gap-3 overflow-x-auto mb-8 no-scrollbar">
          {photos.map((img, i) => (
            <motion.img
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              key={i}
              src={img.path}
              alt={`Thumbnail ${i + 1}`}
              className={`h-20 w-28 md:h-24 md:w-32 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${
                selectedImage === img.path
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImage(img.path)}
            />
          ))}
        </div>

        <div className="flex justify-end mb-8">
          <button
            onClick={paymentHandler}
            className="bg-black text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            Pay Now
          </button>
        </div>

        {/* Info */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-blue-800 mb-2">{propertyName}</h2>
          <p className="text-gray-600 mb-4">{description}</p>

          <div className="grid gap-2 text-gray-700 mb-4 text-sm md:text-base">
            <div className="flex items-center">
              <FiMail className="mr-2" /> {email}
            </div>
            <div className="flex items-center">
              <FiPhoneCall className="mr-2" /> {mobileNumber}
            </div>
            <div className="flex items-center">
              <FiMapPin className="mr-2" />
              {`${houseNumber}, ${locality}, ${city}, ${state}, ${country} - ${pincode}`}
            </div>
            <div>Landmark: {landmark}</div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md shadow-sm">
            <div className="flex flex-col md:flex-row justify-between gap-2 text-gray-800 font-medium">
              <span>Bedrooms: {bedrooms}</span>
              <span>Room Size: {roomSize}</span>
              <span className="text-green-700 font-bold text-lg">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(price)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Amenities */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-5">Amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AmenityCard title="Basic Facilities" icon={<MdSecurity className="text-blue-600" />} items={basicFacilities} bg="from-blue-100 to-blue-200" hoverBg="bg-blue-50" />
            <AmenityCard title="Outdoor Activities" icon={<MdOutdoorGrill className="text-green-600" />} items={outdoorActivities} bg="from-green-100 to-green-200" hoverBg="bg-green-50" />
            <AmenityCard title="Common Area" icon={<MdGroup className="text-yellow-600" />} items={commonArea} bg="from-yellow-100 to-yellow-200" hoverBg="bg-yellow-50" />
            <AmenityCard title="Entertainment" icon={<MdLocalMovies className="text-red-600" />} items={entertainment} bg="from-red-100 to-red-200" hoverBg="bg-red-50" />
            <AmenityCard title="Security" icon={<MdSecurity className="text-purple-600" />} items={security} bg="from-purple-100 to-purple-200" hoverBg="bg-purple-50" />
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReview(!showReview)}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-md shadow-md hover:from-purple-600 hover:to-indigo-600"
          >
            {showReview ? "Hide Reviews" : "Show Reviews"}
          </motion.button>
          {showReview && (
            <div className="mt-4">
              <Review postId={id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const AmenityCard = ({ title, icon, items, bg, hoverBg }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`relative group bg-gradient-to-br ${bg} shadow-lg rounded-lg overflow-hidden`}
  >
    <div className="p-6">
      <div className="flex items-center">
        {icon}
        <h4 className="text-lg font-semibold text-gray-800 ml-3">{title}</h4>
      </div>
    </div>
    <div className={`absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${hoverBg} bg-opacity-95 overflow-auto`}>
      <ul className="list-disc pl-5 space-y-2 max-h-[50vh]">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default RoomDetails;
