import React, { useState } from "react";
import { Link } from "react-router-dom";

const Post = () => {
  
  return (

      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 mb-10 mt-10">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 flex flex-col space-y-4">
          <Link to="/profile" className="bg-red-500 text-white py-2 px-4 text-center rounded-lg">Profile</Link>
          <Link to="/dashboard" className="bg-red-500 text-white py-2 px-4 text-center rounded-lg">Dashboard</Link>
          <Link to="/posts" className="bg-red-500 text-white py-2 px-4 text-center rounded-lg">Posts</Link>
          <Link to="/booking" className="bg-red-500 text-white py-2 px-4 text-center rounded-lg">Booking</Link>
          <Link to="/notifications" className="bg-red-500 text-white py-2 px-4 text-center rounded-lg">Notifications</Link>
          <Link to="/chat" className="bg-red-500 text-white py-2 px-4 text-center rounded-lg">Chat</Link>
        </aside>

        {/* Add Post Form */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Add Post</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mehendi Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Mehendi Type</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-red-500 rounded-md"
                placeholder="Enter Mehendi Type"
              />
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-medium text-gray-700">About</label>
              <textarea
                className="mt-1 block w-full p-2 border border-red-500 rounded-md"
                placeholder="Enter details about your service"
               
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-red-500 rounded-md"
                placeholder="Enter location"
              />
            </div>

            {/* Starting Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Starting Price</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-red-500 rounded-md"
                placeholder="Enter starting price"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <div className="mt-1 flex items-center justify-center w-full">
                <label className="cursor-pointer bg-gray-100 rounded-lg p-6 border border-red-500 text-red-500">
                  <input type="file" className="hidden"  />
                  <span className="text-center">+</span>
                </label>
              </div>
            
                <div className="mt-2 text-sm text-gray-600">
                  Selected file: Asna T M
                </div>
              
            </div>
          </div>

          {/* Submit Button */}
          <button className="bg-red-500 text-white mt-6 py-2 px-4 rounded-lg w-full md:w-1/2">
            Add Post
          </button>
        </section>
      </div>
  );
};

export default Post;
