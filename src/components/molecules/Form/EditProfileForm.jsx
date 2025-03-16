import React, { useEffect, useState } from 'react';
import { HiUserCircle } from "react-icons/hi";
import { toast } from "sonner";
import axios from "axios";

import statesData from "../../../lib/states.json";
import { backendUrl } from '../../../lib/config';

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    state: "",
    profileImageUrl: null,
    imageFile: null,
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genderOptions = [
    { label: 'Select gender', value: '' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  // Fetch user profile
  const getMe = async () => {
    try {
      const token = localStorage.getItem('hoomie');
      const { data } = await axios.get(`${backendUrl}homePage/me`, {
        headers: { Authorization: token },
      });

      if (data.check) {
        setFormData({
          fullName: data.check.name || "",
          gender: data.check.gender || "",
          email: data.check.email || "",
          state: data.check.state || "",
          profileImageUrl: data.check?.photos?.[0]?.path || null,
          imageFile: null,
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        profileImageUrl: URL.createObjectURL(file),
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.fullName || !formData.gender || !formData.state) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.fullName);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('state', formData.state);

    if (formData.imageFile) {
      formDataToSend.append('photos', formData.imageFile);
    }

    try {
      const token = localStorage.getItem('hoomie');
      const { data } = await axios.put(`${backendUrl}homePage/userprofile`, formDataToSend, {
        headers: { Authorization: token },
      });

      if (data.status === "S") {
        localStorage.setItem("cred", JSON.stringify(data.user));
        toast.success("Profile updated successfully!");
        getMe(); // Refresh profile
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 ">
      {loading ? (
        <p className="text-center text-gray-500">Loading profile...</p>
      ) : (
        <>
          <div className="flex flex-col items-center">
            {formData.profileImageUrl ? (
              <img src={formData.profileImageUrl} alt="Profile" className="w-28 h-28 rounded-full object-cover" />
            ) : (
              <HiUserCircle className="w-28 h-28 text-gray-500" />
            )}
            <label className="cursor-pointer mt-2 text-blue-500 text-sm underline">
              {formData.profileImageUrl ? "Change Profile Photo" : "Upload an Image"}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>

          <form className="mt-4 space-y-4">
            <div>
              <label className="text-sm">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input
                type="text"
                value={formData.email}
                disabled
                className="w-full rounded-lg border p-3 text-sm outline-none bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 text-sm outline-none"
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3 text-sm outline-none"
                >
                  <option value="">Select state</option>
                  {statesData?.states?.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              className={`w-full bg-gray-600 text-white py-2 rounded-md text-sm transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
              }`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditProfileForm;
