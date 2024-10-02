import React from "react";
import { Link } from "react-router-dom";

const ArtistProfile = () => {
  return (
    <div className="max-w-6xl mx-auto p-10">
      {/* Artist Header */}
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-serif mb-4">Shaz Mehendi Artist</h1>
          <div className="mb-4">
            <img
              src="https://via.placeholder.com/300" // Replace with your image URL
              alt="mehendi"
              className="rounded-md w-full md:w-2/3"
            />
          </div>
          <div className="flex space-x-4 mb-6">
  <Link to="/send-message">
    <button className="bg-custom-gradient text-white py-2 px-4">Send Message</button>
  </Link>
  <Link to="/booknow">
    <button className="bg-custom-gradient text-white py-2 px-4">Book Now</button>
  </Link>
</div>
        </div>

        {/* Albums Section */}
        <div className="md:w-1/3 flex flex-col items-center">
          <h2 className="font-semibold mb-2 font-serif">Albums</h2>
          <div className="grid grid-cols-3 gap-2 mb-2 font-serif">
            {/* Album Images */}
            <img src="https://via.placeholder.com/100" alt="album-1" className="w-full rounded-md" />
            <img src="https://via.placeholder.com/100" alt="album-2" className="w-full rounded-md" />
            <img src="https://via.placeholder.com/100" alt="album-3" className="w-full rounded-md" />
            <img src="https://via.placeholder.com/100" alt="album-4" className="w-full rounded-md" />
            <img src="https://via.placeholder.com/100" alt="album-5" className="w-full rounded-md" />
            <img src="https://via.placeholder.com/100" alt="album-6" className="w-full rounded-md" />
          </div>
          <button className="bg-gray-200 py-1 px-3 text-sm rounded">View 220 More</button>
        </div>
      </div>

      {/* About, Reviews, Favourite, Price Tabs */}
      <div className="flex justify-between border-b mb-6 mt-6">
        <button className="px-4 py-2 font-medium">About</button>
        <button className="px-4 py-2 font-medium">Reviews</button>
        <button className="px-4 py-2 font-medium">Favourite</button>
        <button className="px-4 py-2 font-medium">Price</button>
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <h2 className="font-bold text-lg">Price</h2>
        <p className="text-red-500 font-semibold">₹1500 Per Hand</p>
      </div>

      {/* About Section */}
      <div className="mb-6">
        <h2 className="font-bold text-lg">About</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-6">
        <h2 className="font-bold text-lg">Reviews</h2>
        <div className="space-y-4">
          {/* Repeat the following block for each review */}
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded">
            <div>
              <p className="font-semibold">Asna</p>
              <p className="text-gray-600">Good work</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold text-red-500 mr-2">5.0</p>
              <span className="text-red-500">★</span>
            </div>
          </div>
        </div>
      </div>

      {/* Review & Rating Section */}
      {/* <div className="mb-6"> */}
        {/* <h2 className="font-bold text-lg">Review & Rating</h2>
        <div className="bg-gray-100 p-4 rounded">
          <div className="flex items-center space-x-2"> */}
            {/* Stars for rating */}
            {/* {[...Array(5)].map((_, i) => (
              <span key={i} className="text-gray-400">★</span>
            ))}
          </div>
          <textarea
            placeholder="Share your experience about us"
            className="mt-4 w-full p-2 bg-white border rounded"
          />
          <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Submit</button>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default ArtistProfile;
