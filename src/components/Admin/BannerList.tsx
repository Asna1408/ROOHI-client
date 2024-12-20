
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';  
import TableComponent from '../Common/TableComponent'; 
import Pagination from '../Common/Pagination';
import axiosInstance from '../../constant/axiosInstanceAdmin';

interface Banner {
    _id: string;
    title: string;
    description: string;
    images:string[];
    isActive:Boolean;
  
  }

const BannerList: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchBanners = async (page: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`https://perfect-bride.shop/admin/banner?page=${page}&limit=10`);
      setBanners(response.data.banners);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to fetch banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners(currentPage);
  }, [currentPage]);

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
              await axiosInstance.delete(`https://perfect-bride.shop/admin/banner/deleteBanner/${BannerId}`);  
              setBanners(banners.filter(banner => banner._id !== BannerId));
              Swal.fire('Deleted!', 'Banner has been deleted.', 'success');
            } catch (err) {
              setError('Failed to delete Banner');
              Swal.fire('Error', 'Failed to delete Banner', 'error');
            }
          }
        });
      };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-serif text-customGray font-bold">Banners</h1>
        <Link to="/superadmin/banner/AddBanner">
          <button className="bg-custom-gradient text-white py-2 px-4 rounded hover:bg-custom-gradient">
            Add Banner
          </button>
        </Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <TableComponent
              columns={[
                { field: 'index', headerName: 'No' },
                { field: 'images', headerName: 'Banner' },
                { field: 'title', headerName: 'Banner Title' },
                { field: 'description', headerName: 'Description' },
                { field: 'isActiveText', headerName: 'Status' },
              ]}
              data={banners.map((banner, index) => ({
                index: (currentPage - 1) * 10 + (index + 1),
                ...banner,
                isActiveText: banner.isActive ? 'Active' : 'Not Active',
              }))}
              actions={(row) => (
                <span className="flex items-center">
                  <Link to={`/superadmin/banner/${row._id}`}>
                    <FaEdit className="text-blue-500 cursor-pointer mr-2" />
                  </Link>
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(row._id)}
                  />
                </span>
              )}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default BannerList;


