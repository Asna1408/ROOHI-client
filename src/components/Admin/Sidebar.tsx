import React from 'react';
import { Link } from 'react-router-dom';
import {  FaHome, FaUsers, FaCalendarAlt,  FaFlag, FaToolbox , FaCalendarCheck} from 'react-icons/fa';

// Define the props type
interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`bg-white text-customGray h-screen fixed top-0 transition-transform duration-300 w-[255px] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          
          <span className="text-xl font-bold font-serif">PERFECT BRIDE</span>
        </div>
      </div>
    

    <ul className="mt-6">
      <li className="flex items-center p-4 text-lg font-serif hover:bg-custom-gradient hover:text-white">
        <FaHome className="mr-2 text-customGold hover:text-white" />
        <Link to="/SuperAdmin/dashboard" className="hover:text-white">Dashboard</Link>
      </li>
      <li className="flex items-center p-4 text-lg font-serif hover:bg-custom-gradient hover:text-white">
        <FaUsers className="mr-2 text-customGold" />
        <Link to="/SuperAdmin/UserList" className="hover:text-white">Users</Link>
      </li>
      <li className="flex items-center p-4 text-lg font-serif hover:bg-custom-gradient hover:text-white">
        <FaFlag className="mr-2 text-customGold" />
        <Link to="/banner" className="hover:text-white">Banner</Link>
      </li>
      <li className="flex items-center p-4 text-lg font-serif hover:bg-custom-gradient hover:text-white">
        <FaToolbox className="mr-2 text-customGold" />
        <Link to="/Superadmin/ServiceList" className="hover:text-white">Services</Link>
      </li>
      <li className="flex items-center p-4 text-lg font-serif hover:bg-custom-gradient hover:text-white">
        <FaCalendarCheck  className="mr-2 text-customGold" />
        <Link to="/Superadmin/BookingList" className="hover:text-white">Booking</Link>
      </li>
      
      <li className="flex items-center p-4 text-lg font-serif hover:bg-custom-gradient hover:text-white">
        <FaCalendarAlt className="mr-2 text-customGold" />
        <Link to="/calendar" className="hover:text-white">Calendar</Link>
      </li>
    </ul>
  
    </div>
  );
};

export default Sidebar;
