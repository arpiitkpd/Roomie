import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logo, Input, Button, Select } from './index.js';
import appwriteService from '../appwrite/config.js';
import { profile } from '../store/profileSlice.js';
import { useForm } from 'react-hook-form';

function ProfileForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const userdata = useSelector((state) => state.auth.userData);
   // Ensure userId is defined

  const createProfile = async (data) => {
    setError("");
    try {
      const file = await appwriteService.uploadFile(data.profilePicture[0]);
      console.log(file);
      
      const userId = userdata?.$id;
      const dbProfile = await appwriteService.createProfile({
        ...data,
        userId: userId,
        profilePicture: file?.$id // Handle file upload
      });
      if (dbProfile) {
        dispatch(profile());
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8">
        <div className="mb-4 flex justify-center">
          <Logo className="w-24 h-auto" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-900">
          Complete Your Profile
        </h2>

        {error && (
          <p className="text-red-600 mt-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit(createProfile)} className="mt-6">
          <div className="space-y-4">
            <div className="mb-4">
              <Input
                label="Profile Picture:"
                type="file"
                className="block w-full text-gray-700 bg-gray-100 border border-gray-300 rounded-md"
                {...register("profilePicture")}
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-4 flex justify-center">
                  <img src={imagePreview} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full" />
                </div>
              )}
            </div>
            <Input
              label="Name:"
              placeholder="Enter your Name"
              type="text"
              className="block w-full p-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md"
              {...register("name", { required: true })}
            />
            <Input
              label="Bio:"
              placeholder="Enter your bio"
              type="text"
              className="block w-full p-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md"
              {...register("bio")}
            />
            <Input
              label="Age:"
              type="text"
              placeholder="Enter your Age"
              className="block w-full p-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md"
              {...register("age", { required: true })}
            />
            <Select
              options={["male", "female"]}
              label="Gender:"
              className="block w-full p-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md"
              {...register("gender", { required: true })}
            />
            
            <Button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              Complete Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
