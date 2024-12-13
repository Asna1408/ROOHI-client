
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import TableComponent from "../Common/TableComponent";
import Pagination from '../Common/Pagination';
import axios from 'axios';

interface Service {
  _id: string;
  service_name: string;
  service_type: { type_name: string }; 
  price: number;
  location: string;
  images: string[];
}


const PostTable: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  

  const fetchServices = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`/user/getallpost/${currentUser._id}`, {
        params: {
          page,
          limit: 10,
        },
      });
  
      if (response.status === 200) {
        const { services, totalPages } = response.data;
        setServices(services);
        setTotalPages(totalPages);
      } else {
        toast.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Error fetching services");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchServices(currentPage);
  }, [currentPage, currentUser]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const handleDelete = async (serviceId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`/user/deletepost/${serviceId}`);
  
        if (response.status === 200) {
          setServices((prevServices) =>
            prevServices.filter((service) => service._id !== serviceId)
          );
          toast.success("Service deleted successfully!");
        } else {
          toast.error("Failed to delete the service");
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error("Error deleting the service");
      }
    }
  };
  
  const handleEdit = (serviceId: string) => {
    navigate(`/editpost/${serviceId}`);
  };

  const columns = [
    { field: "images", headerName: "Photo" },
    { field: "service_name", headerName: "Service Name" },
    { field: "service_type.type_name", headerName: "Service Type" },
    { field: "price", headerName: "Price" },
    { field: "location", headerName: "Location" },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-4">
        <Link to="/addpost">
          <button className="bg-custom-gradient text-white px-4 py-2 font-semibold">Add Post</button>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};




export default PostTable;
