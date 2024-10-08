// Service.tsx
import React, { useEffect, useState } from 'react';
import { FaFilter, FaStar } from 'react-icons/fa';

interface Service {
  _id: string;
  service_name: string;
  location: string;
  price: number;
  rating: number; // Assuming you want to show this rating
  images: string[]; // To access image URLs
}

const Service = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/user/getallpost');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

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
          <div key={service._id} className="border rounded-lg overflow-hidden shadow-lg text-customGray">
            {/* Image with href */}
            <a href={`/artist/${service._id}`}>
              <img
                src={service.images[0]} // Access the first image
                alt={service.service_name}
                className="w-full h-48 object-cover"
              />
            </a>
            <div className="p-4">
              {/* Name with href */}
              <a href={`/artist/${service._id}`}>
                <h2 className="font-bold text-xl hover:underline">{service.service_name}</h2>
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
