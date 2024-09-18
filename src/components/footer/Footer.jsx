import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
   
    <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto text-center">
      <p className="text-sm md:text-base">&copy; 2024 Your Website. All rights reserved.</p>
      <div className="mt-4 flex justify-center flex-wrap">
        <Link to="/contact" className="text-gray-400 hover:text-white transition duration-300 mx-2">Contact Us</Link>
        <span className="text-gray-400 mx-2">|</span>
        <Link to="/privacy" className="text-gray-400 hover:text-white transition duration-300 mx-2">Privacy Policy</Link>
      </div>
    </div>
  </footer>
  )
}

export default Footer