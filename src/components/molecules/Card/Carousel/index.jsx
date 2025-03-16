import React, { useState, useEffect } from 'react';
import image from "../../../../assets/image/ForgotPassword/8602057.png"

const Carousel = () => {
  const images = [
    "https://i.pinimg.com/564x/59/c1/9c/59c19cdc20a1c9d3777a1b7a4d0614ac.jpg",
    "https://scdn.aro.ie/Sites/50/brochner_hotels/uploads/images/Gallery/General/hostel_suite_alternate.jpg",
    "https://scdn.aro.ie/Sites/50/brochner_hotels/uploads/images/Gallery/General/standard_double_room_beds.jpg"
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 2000); // Change slide every 2 seconds
    return () => clearTimeout(timer);
  }, [currentSlide, images.length]);

  const goToPrevious = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  return (
    <main className="bg-blue-500 rounded-lg h-[50vh] shadow-xl p-8 mb-6 mx-16 relative overflow-hidden">
        {/* Left content - Text */}
        <div className="text-white w-2/3 p-16">
          <h1 className="text-4xl font-bold mb-4">
            Get access to 40,000+ houses across India
          </h1>
          <p className="mb-6">
            We provide clean and hygienic Houses in affordable prices with safe and secure environments.
          </p>
        </div>

        <div className="absolute right-[10%] bottom-0">
          <img
          src={image}
          className='w-48 h-full object-cover'
          />
        </div>
      </main>

  );

};

export default Carousel;
