
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import TableComponent from '../Common/TableComponent';
import Pagination from '../Common/Pagination'; // A reusable pagination component
import axiosInstance from '../../constant/axiosInstanceAdmin';

interface ServiceCategory {
  _id: string;
  type_name: string;
  description: string;
}

const ServiceList: React.FC = () => {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchServiceCategories = async (page: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/admin/ServiceList?page=${page}&limit=10`);
      setServiceCategories(response.data.categories);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to fetch service categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceCategories(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/admin/DeleteService-category/${id}`);
          setServiceCategories(serviceCategories.filter((category) => category._id !== id));
          Swal.fire('Deleted!', 'Service category has been deleted.', 'success');
        } catch {
          Swal.fire('Error', 'Failed to delete service category.', 'error');
        }
      }
    });
  };

  const columns = [
    { field: 'index', headerName: 'No' },
    { field: 'type_name', headerName: 'Service Type' },
    { field: 'description', headerName: 'Description' },
  ];

  const dataWithIndex = serviceCategories.map((category, index) => ({
    index: (currentPage - 1) * 10 + (index + 1),
    ...category,
  }));

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
        <TableComponent columns={columns} data={dataWithIndex} actions={(row) => (
          <span className="flex items-center">
            <Link to={`/Superadmin/EditServiceCategory/${row._id}`}>
              <FaEdit className="text-blue-500 cursor-pointer mr-2" />
            </Link>
            <FaTrash
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(row._id)}
            />
          </span>
        )} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ServiceList;
