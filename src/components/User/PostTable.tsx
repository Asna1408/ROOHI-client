import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you have Redux for user management
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import TableComponent from "../Common/TableComponent";

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


  const columns = [
    { field: 'images', headerName: 'Photo' },
    { field: 'service_name', headerName: 'Service Name' },
    { field: 'service_type.type_name', headerName: 'Service Type' },
    { field: 'price', headerName: 'Price' },
    { field: 'location', headerName: 'Location' },
  ];

  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-4">
        <Link to="/addpost">
          <button className="bg-custom-gradient text-white px-4 py-2 font-semibold">
            Add Post
          </button>
        </Link>
      </div>

      <TableComponent
        columns={columns}
        data={services}
        actions={(service) => (
          <>
            <button
              className="mr-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => handleEdit(service._id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => handleDelete(service._id)}
            >
              Delete
            </button>
          </>
        )}
      />
    </div>

  );
};

export default PostTable;
