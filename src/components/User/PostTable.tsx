import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you have Redux for user management
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

interface Service {
  _id: string;
  service_name: string;
  service_type: { type_name: string }; // Populated service type
  price: number;
  location: string;
  images: string[];
}

const PostTable: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`/user/getallpost/${currentUser._id}`);
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          toast.error('Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Error fetching services');
      }
    };

    fetchServices();
  }, [currentUser]);

  const handleDelete = async (serviceId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/user/deletepost/${serviceId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Filter out the deleted service from the state
          setServices((prevServices) => prevServices.filter(service => service._id !== serviceId));
          toast.success('Service deleted successfully!');
        } else {
          toast.error('Failed to delete the service');
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Error deleting the service');
      }
    }
  };

  const handleEdit = (serviceId: string) => {

    console.log("edit url",`/editpost/${serviceId}`)
    navigate(`/editpost/${serviceId}`); // Navigate to edit page
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-4">
        <Link to="/addpost">
          <button className="bg-custom-gradient text-white px-4 py-2 font-semibold">
            Add Post
          </button>
        </Link>
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-custom-gradient text-customGray font-serif">
            <th className="py-2 px-4 border-b">Photo</th>
            <th className="py-2 px-4 border-b">Service Name</th>
            <th className="py-2 px-4 border-b">Service Type</th>
            <th className="py-2 px-4 border-b">Price (INR)</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id} className="hover:bg-gray-100">
              <td className="py-2 px-3 border-b">
                <img
                  src={service.images[0] || "https://via.placeholder.com/150"}
                  alt={service.service_name}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td className="py-2 px-3 border-b">{service.service_name}</td>
              <td className="py-2 px-3 border-b">{service.service_type?.type_name}</td>
              <td className="py-2 px-3 border-b">{service.price}</td>
              <td className="py-2 px-3 border-b">{service.location}</td>
              <td className="py-2 px-3 border-b">
                <button 
                  className="mr-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(service._id)} // Edit button
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(service._id)} // Delete button
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
