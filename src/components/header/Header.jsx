import React,{useState} from 'react'
import {LogoutBtn} from "../index.js"
import { useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'


function Header() {
  const authStatus = useSelector((state)=> state.auth.status)
  const userId = useSelector((state)=> state.auth.userData?.$id)
//   const authStatus = true
const [menuVisible, setMenuVisible] = useState(false);

const toggleMenu = () => {
  setMenuVisible(!menuVisible);
};

const [query, setQuery] = useState("");
const navigate = useNavigate();

const handleSearch = (e) => {
  e.preventDefault();
  if (query) {
    // Navigate to the search route with the query as a URL parameter
    navigate(`/rooms/${query}`);
  }
};

  return (
<nav  className=" bg-white w-full flex relative text-black justify-between items-center mx-auto px-8 h-20" style={{fontWeight:620, color: "#454444",boxShadow:"0px -35px 35px 2px"}}>
   
    <div className="inline-flex">
        <Link className="_o6689fn" to="/"
            ><div className="hidden md:block mr-2">
                <img src="./logo.svg" className='max-w-40' alt="Logo"  />
            </div>
            <div className="block md:hidden mr-1">
             <img src="./logo.svg" className='max-w-34' alt="Logo"  />
            </div>
        </Link>
    </div>

    
    <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
        <form onSubmit={handleSearch} className="inline-block">
            <div className="inline-flex items-center max-w-full">
                <div className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1" type="button">
                    <input className="focus:outline-none block flex-grow flex-shrink overflow-hidden"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find your Roomie"
                    />
                    <button type='submit' className="flex items-center justify-center relative  h-8 w-8 rounded-full">
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
                                    d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
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
          <Link className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full"style={{ border: "0.5px solid #e4e0e0"}} to="/add-room">
            <div className="flex items-center relative cursor-pointer whitespace-nowrap">Rent Your Room</div>
          </Link>
          
        </div>

        {
          authStatus?(
            <div className="block">
            <div className="inline relative"onClick={toggleMenu}>
                <button type="button" className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg">
                    <div className="pl-1" >
                        <svg
                            
                            viewBox="0 0 32 32"
                            xmlns="https://via.placeholder.com/40"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentcolor", strokeWidth: 3, overflow: "visible"}}
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
                            style={{display: "block", height: "100%", width: "100%", fill: "currentcolor"}}
                        >
                            <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                        </svg>
                    </div>
                    
                </button>
                {menuVisible && (
                    <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg py-2 w-40 z-10">
                      <ul className="text-gray-700">
                        <Link to={userId?`/profile/${userId}`:"/login"}>
                          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                            Profile
                          </li>
                        </Link>
                        
                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                          Settings
                        </li>
                        
                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                          <LogoutBtn/>
                        </li>
                      </ul>
                    </div>
      )}
            </div>
        </div>
          ): <div>
             <Link className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" to="/login">
          <div className="flex items-center relative cursor-pointer whitespace-nowrap">Login</div>
        </Link>
        <Link className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" to="/signup">
          <div className="flex items-center relative cursor-pointer whitespace-nowrap">Signup</div>
        </Link>
          </div>
         
        }

        
      </div>
    </div> 
</nav>
)
}

export default Header