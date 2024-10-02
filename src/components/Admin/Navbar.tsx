import React from 'react';
import { FaBars, FaSearch, FaCog, FaBell } from 'react-icons/fa';

// Define the props with their appropriate types
interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className={`flex items-center justify-between p-4 shadow transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-4'}`}>
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar}>
          <FaBars className="text-gray-600 text-2xl" />
        </button>
        <FaSearch className="text-gray-600 text-2xl" />
      </div>
      <div className="flex items-center space-x-4">
        <FaCog className="text-gray-600 text-2xl" />
        <FaBell className="text-gray-600 text-2xl" />
        <img
          src="https://via.placeholder.com/40" // Replace with your profile image URL
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </div>
    </header>
  );
};

export default Navbar;
