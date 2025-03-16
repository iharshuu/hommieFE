import React, { useState,useRef } from 'react'
import { MdPhotoCamera } from "react-icons/md";
import axios from 'axios';
export default function UploadImages() {
const [selectedFiles, setSelectedFiles] = useState(null);
const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    
        const files = event.target.files;
    if (files.length > 6) {
      alert('You can only select up to 6 images.');
      return;
    }
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('photos', selectedFiles[i]);
    }
    formData.append("email","dadiprasant24@gmail.com")
    formData.append("name","lucky pg for grnts")
    formData.append("location","anakapalli")

    try {
      const response = await axios.post('http://localhost:8080/homePage/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload success:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} style={{display:"none"}} ref={fileInputRef}/>
      <MdPhotoCamera onClick={handleButtonClick} style={{cursor:"pointer"}}/>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
