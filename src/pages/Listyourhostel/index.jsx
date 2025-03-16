import React from 'react'
import Navbar from '../../components/organisms/Navbar'
import PersonalHostel from '../../components/molecules/Card/PersonalHostel'
import { useNavigate } from 'react-router-dom'

const Listyourhostel = () => {

  const navigate = useNavigate()

    const handleNavigate = (hotelId) => {
        navigate(`/list-your-hostel/add-hostel`);
      };
  return (
    <>
    <Navbar/>
    <div>
    <button
        className="bg-[#005DE1] text-white flex ml-auto mx-16 mt-3 px-3 py-2 rounded-md font-semibold text-base"
        onClick={handleNavigate}
        >
        CREATE NEW
       </button>
       <>
       <PersonalHostel/>
       </>
    </div>
    </>
  )
}

export default Listyourhostel

// import React, { useState } from 'react';

// const Listyourhostel = () => {
//   const [images, setImages] = useState([]);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = [...images, ...files];
//     if (newImages.length <= 6) {
//       setImages(newImages);
//     } else {
//       alert('You can only upload up to 6 images.');
//     }
//   };

//   const removeImage = (index) => {
//     const newImages = [...images];
//     newImages.splice(index, 1);
//     setImages(newImages);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Process your images here, for example, upload them to a server
//     console.log('Submitting images...', images);
//     // After submission logic, e.g., clear images, show a notification, etc.
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex flex-wrap justify-center mb-4">
//         {images.map((image, index) => (
//           <div key={index} className="relative mx-2 mb-2">
//             <img
//               src={URL.createObjectURL(image)}
//               alt={`Preview ${index}`}
//               className="w-32 h-32 object-cover rounded-md"
//             />
//             <button
//               aria-label={`Remove image ${index}`}
//               className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//               onClick={() => removeImage(index)}
//             >
//               &times;
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="flex flex-col items-center">
//         <label
//           htmlFor="image-upload"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mb-4"
//         >
//           Upload Images
//         </label>
//         <input
//           id="image-upload"
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleImageChange}
//           className="hidden"
//         />
//         <button
//           type="submit"
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
//           onClick={handleSubmit}
//         >
//           Submit Images
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Listyourhostel;
