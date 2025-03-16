import React from 'react';
import Navbar from '../../organisms/Navbar';

const AboutUs = () => {

    const whyChooseUsData = [
        {
          title: "Easy Search",
          description: "Effortlessly find your dream space with just a few clicks.",
        },
        {
          title: "Community",
          description: "Connect with like-minded individuals and create lasting bonds.",
        },
        {
          title: "Variety",
          description: "Explore a diverse range of housing options to suit your style.",
        },
        {
            title: "Safety First",
            description: "Rest assured with our secure and verified listings.",
          },
          {
            title: "Instant Updates",
            description: "Stay in the loop with real-time notifications on new listings.",
          },
          {
            title: "Support Team",
            description: "Our dedicated team is here to assist you every step of the way.",
          },
        // Add more objects as needed
      ];
  return (
    <>
    <Navbar/>
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">House Hunt Hub</h1>
          <p className="text-lg text-gray-700">
            Welcome to the ultimate destination for all your housing needs! Dive into a world of endless possibilities as you embark on your quest to find the perfect home.
          </p>
          <p className="text-lg text-gray-700">
            Whether you're searching for a cozy nest or a shared space filled with laughter and new friendships, our platform has got you covered. Say goodbye to the mundane and hello to the extraordinary!
          </p>
          <p className="text-lg text-gray-700">
            Join our vibrant community of house hunters today and let the adventure begin!
          </p>
        </div>
        <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Why Choose Us?</h2>
      <p className="text-lg text-gray-700 mb-4 flex justify-center">Discover the magic that sets us apart from the rest.</p>
      <div className="grid grid-cols-3 gap-6">
        {/* Mapping through whyChooseUsData array */}
        {whyChooseUsData.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
            {/* Icon */}
            
            <h2 className="text-xl font-bold flex justify-center items-center mb-2">{item.title}</h2>
            <p className="text-gray-700 flex justify-center text-center p-2 items-center">{item.description}</p>
          </div>
        ))}
      </div>
    </div>

        
        <div className="flex justify-around mt-12 items-center bg-white shadow-md p-4 py-6 rounded-lg">
      <div className="text-center">
        <p className="text-blue-500 text-4xl font-[700]">1000+</p>
        <p className="text-gray-700 font-semibold text-2xl">Happy Hunters</p>
      </div>
      <div className="text-center">
        <p className="text-blue-500 text-4xl font-[700]">500+</p>
        <p className="text-gray-700 font-semibold text-2xl">Listings Available</p>
      </div>
      <div className="text-center">
        <p className="text-blue-500 text-4xl font-[700]">24/7</p>
        <p className="text-gray-700 font-semibold text-2xl">Customer Support</p>
      </div>
    </div>
    <div className="mt-12 p-8 rounded-xl shadow-lg w-[60vw] mx-auto">
  <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Get in Touch</h2>
  {/* Get in Touch Section */}
  <form>
    <div className="mb-6 grid grid-cols-2 gap-6">
        <div>
      <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
      <input type="text" id="name" name="name" placeholder="Name"
        className="w-full px-4 py-3 border-0 bg-white rounded-full shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none" />
      </div>
      <div className="">
      <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
      <input type="email" id="email" name="email" placeholder="Email"
        className="w-full px-4 py-3 border-0 bg-white rounded-full shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none" />
    </div>
    </div>
   
    <div className="mb-6">
      <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
      <textarea id="message" name="message" placeholder="Message"
      rows={3}
        className="w-full px-4 py-3 border-0 bg-white rounded-full shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"></textarea>
    </div>
    <button type="submit"
      className="w-full bg-blue-500 text-white px-4 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
      Send Message
    </button>
  </form>
</div>

      </div>
    </div>
    </>
  );
};

export default AboutUs;
