import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { text: "The hostel was fantastic! Clean rooms, friendly staff, and a great vibe. Met amazing people and had a memorable stay!", name: "Alice Johnson" },
  { text: "Loved the experience! The dorms were cozy, the staff was super helpful, and the shared spaces were perfect for socializing. Highly recommended!", name: "Mark Anderson" },
  { text: "A budget-friendly gem! The atmosphere was vibrant, the facilities were well-maintained, and the location was ideal. Will visit again for sure!", name: "Sophie Martinez" },
  { text: "Such a welcoming place! The rooftop views were incredible, and the community feel made my trip extra special. Great value for money!", name: "David Lee" },
  { text: "This hostel exceeded expectations! Clean beds, fun common areas, and excellent service. A great place to stay for travelers of all kinds!", name: "Emma Wilson" },
  { text: "Fantastic stay! The breakfast was delicious, the staff was accommodating, and the social scene was lively. Perfect for meeting fellow travelers!", name: "Michael Carter" },
  { text: "Safe, fun, and comfortable! The rooms were spacious, the staff was kind, and the activities made it easy to connect with others.", name: "Emily Brown" }
];


const Review = ({ text, name }) => (
  <motion.div
    className="bg-blue-50 rounded-lg p-6 shadow-md flex flex-col items-center space-y-3 w-[30%]"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex flex-row items-start">
      <FaQuoteLeft className="text-gray-400 text-xl mr-2" />
      <p className="text-gray-600 text-sm">{text}</p>
      <FaQuoteRight className="text-gray-400 text-xl ml-2" />
    </div>
    <p className="text-gray-700 text-base font-semibold">- {name}</p>
  </motion.div>
);

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const visibleItems = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate the visible testimonials dynamically
  const visibleTestimonials = testimonials
    .concat(testimonials) // Duplicate to create an infinite loop effect
    .slice(index, index + visibleItems);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Guest Testimonials
      </h2>
      <div className="overflow-hidden w-full flex justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index} 
            className="flex space-x-6"
          >
            {visibleTestimonials.map((testimonial, i) => (
              <Review key={i} text={testimonial.text} name={testimonial.name} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reviews;
