import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert

interface ServiceCategory {
  _id: string;
  type_name: string;
  description: string;
  image?: string;  // Assuming you may have an image for the service category
}

function ServiceList() {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);  // State for service categories
  const [loading, setLoading] = useState<boolean>(false);  // Loading state for fetching data
  const [error, setError] = useState<string | null>(null);  // Error state

  // Fetch service categories from the backend
  useEffect(() => {
    const fetchServiceCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/admin/ServiceList');  // Adjust API endpoint
        setServiceCategories(response.data);
      } catch (err) {
        setError('Failed to fetch service categories');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceCategories();
  }, []);

  // Delete a service category with SweetAlert confirmation
  const handleDelete = async (id: string) => {
    // Use SweetAlert for confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/admin/DeleteService-category/${id}`);  // Adjust API endpoint for deleting
          // Update the state after successful deletion
          setServiceCategories(serviceCategories.filter(category => category._id !== id));

          // Show success message
          Swal.fire('Deleted!', 'Service category has been deleted.', 'success');
        } catch (err) {
          setError('Failed to delete service category');
          Swal.fire('Error', 'Failed to delete service category', 'error');
        }
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-serif text-customGray font-bold">Services</h1>
        <Link to="/Superadmin/AddServiceCategory">
          <button className="bg-custom-gradient text-white py-2 px-4 rounded hover:bg-custom-gradient">
            Add Service
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-custom-gradient">
              <th className="py-2 px-4 text-left text-white font-bold">NO</th>
              {/* <th className="py-2 px-4 text-left text-white font-bold">IMAGE</th> */}
              <th className="py-2 px-4 text-left text-white font-bold">SERVICE TYPE</th>
              <th className="py-2 px-4 text-left text-white font-bold">DESCRIPTION</th>
              <th className="py-2 px-4 text-left text-white font-bold">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {serviceCategories.length > 0 ? (
              serviceCategories.map((category, index) => (
                <tr key={category._id} className="bg-white-100">
                  <td className="py-2 px-4">{index + 1}</td>
                  
                  <td className="py-2 px-4">{category.type_name}</td>
                  <td className="py-2 px-4">{category.description}</td>
                  <td className="py-2 px-4">
                    <span className="flex items-center">
                      <Link to={`/Superadmin/EditServiceCategory/${category._id}`}>
                        <FaEdit className="text-blue-500 cursor-pointer mr-2" />
                      </Link>
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(category._id)}
                      />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">No service categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceList;
