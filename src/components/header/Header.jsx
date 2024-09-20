import React, { useState, useCallback } from 'react';
import './Header.css'
import { LogoutBtn } from "../index.js";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userId = useSelector((state) => state.auth.userData?.$id);
  const [menuVisible, setMenuVisible] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/rooms/${query.trim()}`);
    } else {
      navigate('/');
    }
  };

  // Prevent click event from closing the menu
  const handleSearchClick = (e) => {
    e.stopPropagation();
  };

  return (
    <nav className="bg-white w-full flex relative text-black justify-between items-center mx-auto px-8 h-20" style={{ fontWeight: 620, color: "#454444", boxShadow: "0px -35px 35px 2px" }}>
      <Link to="/" className="flex-shrink-0">
        <img
          src="./logo.png"
          alt="Logo"
          className="h-8 md:h-14" // Adjusts height for mobile and larger screens
        />
      </Link>

      <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
        <form onSubmit={handleSearch} className="inline-block">
          <div className="inline-flex items-center max-w-full">
            <div className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1 py-1" type="button">
              <input className="focus:outline-none block flex-grow flex-shrink overflow-hidden"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find your roofie"
              />
              <button type='submit' className="flex items-center justify-center relative h-8 w-8 rounded-full">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    fill: "none",
                    height: "12px",
                    width: "12px",
                    stroke: "currentcolor",
                    strokeWidth: 5.33333,
                    overflow: "visible",
                  }}
                >
                  <g fill="none">
                    <path
                      d="m13 24c6.075 0 11-4.925 11-11 0-6.075-4.925-11-11-11-6.075 0-11 4.925-11 11 0 6.075 4.925 11 11 11zm8-3 9 9"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="flex-initial">
        <div className="flex justify-end items-center relative">
          <div className="flex mr-4 items-center">
            <Link className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" style={{ border: "0.5px solid #e4e0e0" }} to="/add-room">
              <div className="flex items-center relative cursor-pointer whitespace-nowrap">Rent Your Room</div>
            </Link>
          </div>

          {authStatus ? (
            <div className="block">
              <div className="inline relative" onClick={toggleMenu}>
                <button type="button" className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg">
                  <div className="pl-1">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{ display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentcolor", strokeWidth: 3, overflow: "visible" }}
                    >
                      <g fill="none" fillRule="nonzero">
                        <path d="m2 16h28"></path>
                        <path d="m2 24h28"></path>
                        <path d="m2 8h28"></path>
                      </g>
                    </svg>
                  </div>

                  <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{ display: "block", height: "100%", width: "100%", fill: "currentcolor" }}
                    >
                      <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                    </svg>
                  </div>
                </button>
                {menuVisible && (
                  <div className="absolute top-full right-0 bg-white shadow-lg rounded-lg py-2 w-64 z-10">
                    {/* Mobile Search Bar */}
                    <div className="p-4">
                      <form onSubmit={handleSearch} className="relative border rounded-full w-full" onClick={handleSearchClick}>
                        <input
                          type="text"
                          className="pl-4 pr-10 py-2 w-full rounded-full focus:outline-none"
                          placeholder="Find your roofie"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" className="absolute right-2 top-2 h-6 w-6 flex items-center justify-center">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                              display: "block",
                              fill: "none",
                              height: "12px",
                              width: "12px",
                              stroke: "currentcolor",
                              strokeWidth: 5.33333,
                              overflow: "visible",
                            }}
                          >
                            <g fill="none">
                              <path d="m13 24c6.075 0 11-4.925 11-11 0-6.075-4.925-11-11-11-6.075 0-11 4.925-11 11 0 6.075 4.925 11 11 11zm8-3 9 9"></path>
                            </g>
                          </svg>
                        </button>
                      </form>
                    </div>

                    <ul className="text-gray-700 px-4">
                      <li className="py-2 hover:bg-gray-200 cursor-pointer">
                        <Link to={userId ? `/profile/${userId}` : "/login"}>Profile</Link>
                      </li>
                      <li className="py-2 hover:bg-gray-200 cursor-pointer">
                        <Link to="/setting">Setting</Link>
                      </li>
                      <li className="py-2 hover:bg-gray-200 cursor-pointer">
                        <LogoutBtn />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <Link className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" to="/login">
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">Login</div>
              </Link>
              <Link className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" to="/signup">
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">Signup</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
