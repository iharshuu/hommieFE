import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const questions = [
  {
    title: "Find Vacant Homes",
    content:
      "Embark on a journey to discover your dream home among our selection of vacant houses waiting just for you.",
  },
  {
    title: "Room Sharing Options",
    content:
      "Explore the possibilities of sharing a room with like-minded individuals and create unforgettable memories together.",
  },
  {
    title: "How to Get Started?",
    content: "Simply log in to begin your adventure in finding the perfect place to call home.",
  },
  {
    title: "Any Hidden Fees?",
    content: "Absolutely not! We believe in transparency and making your house-hunting experience as smooth as silk.",
  },
  {
    title: "Need Assistance?",
    content:
      "Our team of experts is here to assist you every step of the way. Feel free to reach out for any help you may need.",
  },
];

const FaqQuestion = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-300">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-4 text-lg font-semibold text-gray-800 transition hover:text-blue-600"
      >
        {title}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <FaChevronDown className="text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden px-6 pb-4 text-gray-600"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl w-[70vw] mx-auto my-10 p-6 border border-gray-200">
      <h3 className="text-4xl font-bold text-center text-blue-700 mb-6">Curious Minds Want to Know</h3>
      <div className="divide-y divide-gray-200">
        {questions.map((question, index) => (
          <FaqQuestion
            key={index}
            title={question.title}
            content={question.content}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqQuestions;
