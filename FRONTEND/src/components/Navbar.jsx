import React from 'react';
import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo/Name */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">URL SHORTNER</span>
            </Link>
          </div>
          
          {/* Right side - Navigation */}
          <div className="flex items-center">
            {/* <Link 
              to="/home" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Dashboard
            </Link>
            <Link 
              to="/auth" 
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;