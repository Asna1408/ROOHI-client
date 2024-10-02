import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router

const Profile = () => {
  return (
  
    
   
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 mt-10 mb-10">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 flex flex-col space-y-4">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-full mx-auto w-28 h-28"
          />
          <Link to="/profile" className="bg-custom-gradient text-white py-2 px-4 text-center lg">Profile</Link>
          <Link to="/dashboard" className="bg-custom-gradient text-white py-2 px-4 text-center lg">Dashboard</Link>
          <Link to="/posts" className="bg-custom-gradient text-white py-2 px-4 text-center lg">Posts</Link>
          <Link to="/review" className="bg-custom-gradient text-white py-2 px-4 text-center lg">Review</Link>
          <Link to="/notifications" className="bg-custom-gradient text-white py-2 px-4 text-center lg">Notifications</Link>
          <Link to="/chat" className="bg-custom-gradient text-white py-2 px-4 text-center lg">Chat</Link>
        </aside>

        {/* Profile Edit Section */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name and Email Inputs */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-customGold md"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full p-2 border border-customGold md"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Edit and Change Password Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <button className="bg-custom-gradient text-white py-2 px-4 lg">Edit</button>
            <button className="bg-custom-gradient text-white py-2 px-4 lg">Change Password</button>
          </div>
        </section>
      </div>

  );
};

export default Profile;
