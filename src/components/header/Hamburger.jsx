import React, { useState } from "react";

const Hamburger = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="relative flex justify-end items-center bg-gray-800 p-4">
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div
          className="text-white text-2xl cursor-pointer"
          onClick={toggleMenu}
        >
          &#9776;
        </div>
      </div>
      {menuVisible && (
        <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg py-2 w-40 z-10">
          <ul className="text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              Settings
            </li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
