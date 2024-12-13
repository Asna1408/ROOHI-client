import { useState } from "react";
import { Link } from "react-router-dom";

const UserSidebar = () => {
  
  return (
    <div className="w-full">
      <aside className="flex flex-col space-y-4 mt-4">
        {/* <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="rounded-full mx-auto w-28 h-28"
        /> */}
        <Link to="/profile" className="bg-custom-gradient text-white py-2 px-4 text-center rounded">Profile</Link>
        <Link to="/post" className="bg-custom-gradient text-white py-2 px-4 text-center rounded">Posts</Link>
        {/* <Link to="/review" className="bg-custom-gradient text-white py-2 px-4 text-center rounded">Review</Link> */}

        <Link to="/bookingdetailsByUser" className="bg-custom-gradient text-white py-2 px-4 text-center rounded">My Bookings</Link>
        
        <Link to="/bookingdetailsByProvider" className="bg-custom-gradient text-white py-2 px-4 text-center rounded">Request Bookings</Link>
        <Link to="/chat" className="bg-custom-gradient text-white py-2 px-4 text-center rounded">Chat</Link>
      </aside>
    </div>
  );
};

export default UserSidebar;
