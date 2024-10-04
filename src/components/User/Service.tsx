import React from 'react';
import { FaFilter, FaStar } from 'react-icons/fa';

const Service = () => {
  const services = [
    {
      id: 1,
      name: "Shaz Hennas",
      location: "Kochi",
      price: 1400,
      rating: 9,
      imageUrl:
        "https://example.com/image1.jpg", // Replace with your image URL
      link: "/service/1" // Replace with the actual link to the service detail page
    },
    {
      id: 2,
      name: "Shaz Hennas",
      location: "Kochi",
      price: 1400,
      rating: 9,
      imageUrl:
        "src/assets/user/category/olive_branch.png", // Replace with your image URL
      link: "/service/2" // Replace with the actual link to the service detail page
    },
    // Add more services as needed
  ];

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl text-customGray font-bold font-serif mb-6">ALL SERVICES</h1>

      {/* Search and Filter Section */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border p-2 rounded w-full max-w-xs"
        />
        <button className="flex items-center space-x-2 text-customGold">
          <span>Filter</span>
          <FaFilter className="w-5 h-5" />
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="border rounded-lg overflow-hidden shadow-lg text-customGray">
            {/* Image with href */}
            <a href="/artist">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
            </a>
            <div className="p-4">
              {/* Name with href */}
              <a href={service.link}>
                <h2 className="font-bold text-xl hover:underline">{service.name}</h2>
              </a>
              <p className="text-sm text-gray-600">{service.location}</p>
              <p className="text-lg font-bold mt-2">₹{service.price}</p>
              <div className="flex items-center space-x-1 mt-2">
                <FaStar className="text-customGold" />
                <span className="text-lg">{service.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
