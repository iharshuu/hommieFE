import React, { useEffect, useState } from 'react';
import BasicDetailsForm from './BasicDetailsForm';
import LocationForm from './LocationForm';
import AmenitiesForm from './AmenitiesForm';
import Imageform from './Imageform';
import Navbar from '../../components/organisms/Navbar';

const AddHostel = () => {
  // State to keep track of the current step
  const [step, setStep] = useState(1);
  // State to keep track of form data
  const [formData, setFormData] = useState({
    // Basic Details
    propertyName: '',
    propertyBuilt: '',
    mobileNumber: '',
    name: '',
    email: '',
    type: '',
    category: "",
    nameForOtherType: "",
    // Location
    houseNumber: '',
    locality: '',
    pincode: '',
    country: '',
    state: '',
    city: '',
    landmark: '',
    distanceFromUniversity: '',
    // Amenities
    basicFacilities: [],
    outdoorActivities: [],
    commonArea: [],
    security: [],
    entertainment: [],
    bedrooms: '',
    roomSize: '',
    vacanypeople: '',
    description: '',
    price: '',
    photos : []
  });
   
  useEffect(() => {
    const details = localStorage.getItem("cred");
    if (details) {
      const parsedDetails = JSON.parse(details);
      setFormData({ ...formData, email: parsedDetails.email });
    }
  }, []);
  

  // Function to handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAmenitiesChange = (amenities) => {
    setFormData({ ...formData, ...amenities });
  };
  
  const handlesave =() =>{
    // console.log(formData)
  }

  // Function to navigate to the next form step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Function to navigate to the previous form step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Conditional rendering based on the step
  switch (step) {
    case 1:
      return (
        <>
        <Navbar/>
        <BasicDetailsForm formData={formData} handleChange={handleChange} nextStep={nextStep} />
        </>
      );
    case 2:
      return (
        <>
        <Navbar/>
        <LocationForm formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep}/>
        </>

      );
    case 3:
      return (
        <>
          <Navbar/>
          <AmenitiesForm
            formData={formData}
            handleChange={handleChange} // For non-amenities fields
            handleAmenitiesChange={handleAmenitiesChange} // For amenities
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </>
      );
    default:
      return (
        <>
        <Navbar/>
        <Imageform formData={formData} handlesave={handlesave} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep}/>
        </>

      );
  }


};

export default AddHostel;
