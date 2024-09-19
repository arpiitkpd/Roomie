import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config.js';
import { useSelector } from 'react-redux';

function PostCard({
  $id, owner, featuredPictures, roomates, Gender, rent, address, from, to,  residential, roomsAllocated, condition
}) {
  const [cachedUrl, setCachedUrl] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  
  const userdata = useSelector((state) => state.auth.userData);
  const userId = userdata?.$id;

  
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date1 = new Date(from);
  

  // Fetch and cache image and user profile
  useEffect(() => {
    const fetchProfileAndImage = async () => {
      try {
        setIsLoading(true);

        // Fetch the user profile
        if (userId) {
          const prof = await appwriteService.getProfileById(userId);
          if (prof && prof.documents.length > 0) {
            setProfile(prof.documents[0]);
          }
        }

        // Check if the image is cached in localStorage
        const cachedImage = localStorage.getItem(featuredPictures);
        if (cachedImage) {
          setCachedUrl(cachedImage);
        } else {
          // Fetch and cache the image if it's not in the cache
          const url = appwriteService.getFilePreview(featuredPictures);
          
          localStorage.setItem(featuredPictures, url); // Cache the image URL
          setCachedUrl(url);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileAndImage();
  }, [featuredPictures, userId]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="max-w-80 bg-white px-6 pt-4 pb-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-500" style={{ maxWidth: "92%" }}>
        <div className="mb-3 text-sm block font-bold text-indigo-600">
          <div className="font-sans flex max-w-max items-center mb-1">
            <h1 className="text-xl text-black mr-2">{owner}</h1>
            {profile.age && (
              <span className="text-xl mr-3 font-normal p-0.5 text-black">{profile.age}</span>
            )}
          </div>
          <div className="flex max-w-max">
            <span className="mt-0.5 mr-3 p-0.5 w-20 flex justify-center text-green-800" style={{ background: "#4bc74d54", borderRadius: "15px" }}>{roomates} roomates</span>
            <span className="mt-0.5 mr-3 p-0.5 w-20 flex justify-center text-green-800" style={{ background: "#4bc74d54", borderRadius: "15px" }}>{Gender}</span>
          </div>
        </div>

        {/* Image section with lazy loading */}
        <div className="relative overflow-hidden h-48 w-full">
          {isLoading ? (
            <div className="h-full w-full bg-gray-200 rounded-xl animate-pulse"></div>
          ) : (
            <img loading="lazy" className="w-full h-full object-cover rounded-xl" src={cachedUrl} alt="Room Image" />
          )}
        </div>

        <div className="text-black mt-3">
          <span className="font-extrabold text-xl">$</span>
          <span className="font-extrabold text-xl mr-1">{rent}</span>
          <span className="text-xl font-normal">/m</span>
        </div>
        
        <div className="text-black flex my-1">
          <span style={{background:"#2358cd6b", borderRadius:"16px"}} className="text-lg font-normal px-1  mr-3">{roomsAllocated}</span>
          <span style={{background:"#2358cd6b", borderRadius:"16px"}} className="text-lg font-normal px-1  mr-3">{residential}</span>
          <span style={{background:"#2358cd6b", borderRadius:"16px"}} className="text-lg font-normal px-1 ">{condition}</span>
        </div>

        <div className="text-black flex">
          <span className="text-lg font-normal mr-2">{date1.toLocaleDateString('en-US', options)}</span>
          <span className="text-lg font-bold text-gray-500 mr-2">-</span>
          <span className="text-lg font-normal">{to}</span>
        </div>

        <div className="text-gray-600 flex mt-1 mb-1 max-w-fit justify-center items-center" style={{ padding: "1px 1px 0px 8px", background: "#827e7e6b", borderRadius: "23px", color: "#2d2c2c" }}>
          <span className="text-lg font-normal mr-2">{address}</span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
