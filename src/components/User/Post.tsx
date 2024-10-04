import React, { useState } from "react";
import { Link } from "react-router-dom";

const Post = () => {
  
  return (

      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 mb-10 mt-10">
    
        {/* Add Post Form */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mehendi Type */}

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-customGold md"
                placeholder="Provider name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Type</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-customGold md"
                placeholder="Enter Mehendi Type"
              />
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-medium text-gray-700">About</label>
              <textarea
                className="mt-1 block w-full p-2 border border-customGold md"
                placeholder="Enter details about your service"
               
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-customGold md"
                placeholder="Enter location"
              />
            </div>

            {/* Starting Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Starting Price</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-customGold md"
                placeholder="Enter starting price"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <div className="mt-1 flex items-center justify-center w-full">
                <label className="cursor-pointer bg-gray-100 rounded-lg p-6 border border-customGold text-red-500">
                  <input type="file" className="hidden"  />
                  <span className="text-center">+</span>
                </label>
              </div>
              
            </div>
          </div>

          {/* Submit Button */}
          <button className="bg-custom-gradient text-white mt-6 py-2 px-4  w-full md:w-1/2">
            Add Post
          </button>
        </section>
      </div>
  );
};

export default Post;
