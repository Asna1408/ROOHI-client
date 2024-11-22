import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert
import TableComponent from '../Common/TableComponent'; // Import your TableComponent

interface Banner {
  _id: string;
  title: string;
  description: string;
  images:string[];
  isActive:Boolean;

}

function BannerList() {
  const [banner, setBanner] = useState<Banner[]>([]);  // State for service categories
  const [loading, setLoading] = useState<boolean>(false);  // Loading state for fetching data
  const [error, setError] = useState<string | null>(null);  // Error state

  // Fetch service categories from the backend
  useEffect(() => {
    const fetchBanner = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/admin/banner');  // Adjust API endpoint
        setBanner(response.data);
      } catch (err) {
        setError('Failed to fetch Banner');
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  const handleDelete = async (BannerId: string) => {
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
          await axios.delete(`/admin/banner/deleteBanner/${BannerId}`);  // Adjust API endpoint for deleting
          setBanner(banner.filter(banner => banner._id !== BannerId));
          Swal.fire('Deleted!', 'Banner has been deleted.', 'success');
        } catch (err) {
          setError('Failed to delete Banner');
          Swal.fire('Error', 'Failed to delete Banner', 'error');
        }
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Define columns for the TableComponent
  const columns = [
    { field: 'index', headerName: 'No' },
    { field: 'images', headerName: 'Banner' },
    { field: 'title', headerName: 'Banner Title' },
    { field: 'description', headerName: 'Description' },
    { field: 'isActiveText', headerName: 'Status' },  ];

  const dataWithIndex = banner.map((banner, index) => ({
    index: index + 1, 
    ...banner,
    isActiveText: banner.isActive ? 'Active' : 'Not Active',
  }));


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-serif text-customGray font-bold">Banners</h1>
        <Link to="/Superadmin/banner/AddBanner">
          <button className="bg-custom-gradient text-white py-2 px-4 rounded hover:bg-custom-gradient">
            Add Banner
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <TableComponent columns={columns} data={dataWithIndex} actions={(row) => (
          <span className="flex items-center">
            <Link to={`/Superadmin/banner/${row._id}`}>
              <FaEdit className="text-blue-500 cursor-pointer mr-2" />
            </Link>
            <FaTrash
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(row._id)}
            />
          </span>
        )} />
      </div>
    </div>
  );
}

export default BannerList;
