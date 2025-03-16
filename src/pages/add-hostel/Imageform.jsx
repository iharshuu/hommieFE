import React, { useRef, useState } from 'react';
import { backendUrl } from '../../lib/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Imageform = ({ formData, handleChange,handlesave, nextStep, prevStep }) => {

  let navigate = useNavigate()

  
  const [images, setImages] = useState([]);
  const [selectedTags, setSelectedTags] = useState(false);


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];
    if (newImages.length <= 6) {
      setImages(newImages);
    } else {
      alert('You can only upload up to 6 images.');
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  

  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    
    const files = Array.from(event.target.files);
    // if (files.length !== 3) {
    //   alert('Please select exactly three images.');
    //   return;
    // }
    setSelectedFiles(files);

    const readers = [];
    const images = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        images.push(reader.result);
        if (images.length === files.length) {
          setUploadedImages(images);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };


  const handleSubmit = async () => {
    setSelectedTags(true)
    const token = localStorage.getItem('hoomie');
    const formDa = new FormData();
     
    console.log(images)
    formDa.photos = images
    // Append images to formData
    images.forEach((image, index) => {
      formDa.append(`photos`, image);
    });
    console.log(formDa)
  
    // Append other form data properties to formData
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
          value.forEach((item, index) => {
              formDa.append(`${key}[${index}]`, item);
          });
      } else {
          formDa.append(key, value);
      }
  });
  
    
    try {
      const response = await axios.post(`${backendUrl}homepage/upload`, formDa, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`, // Include the token in the Authorization header
        },

      });
  
      console.log(response.data);
        
      if (response?.data?.status === "S") {
        navigate('/list-your-hostel')
        setTimeout(()=>{
          window.location.href()
        })
      } else {
        console.error('Error uploading form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally{
      setSelectedTags(false)
    }
  };
  
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Upload Photos & Videos</h2>
        <div className="mb-8">
          {images.length > 0 ? (
            <div className="flex flex-wrap justify-center h-[40vh] mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative mx-2 mb-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-40 h-40 object-cover rounded-md"
                  />
                  <button
                    aria-label={`Remove image ${index}`}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => removeImage(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[40vh] bg-gray-100 rounded-md">
              <p className="text-gray-600 text-lg mb-4">No images uploaded yet</p>
              <p className="text-gray-500" >Click 
              <label
            htmlFor="image-upload"
            className="text-blue-500 hover:text-blue-700  font-bold py-2 px-1 rounded cursor-pointer"
          >
            here
          </label>
              to add images</p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
        {images.length >0 && 
          <label
            htmlFor="image-upload"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Upload More
          </label>
}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        

<div className="mt-8 flex justify-end">

<button
          onClick={prevStep}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back
        </button>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
            disabled={selectedTags}
          >
            {selectedTags ? "saving..." : "Save" }
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imageform;