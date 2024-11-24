// import React, { useEffect, useState } from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';  // Import SweetAlert
// import TableComponent from '../Common/TableComponent'; // Import your TableComponent

// interface ServiceCategory {
//   _id: string;
//   type_name: string;
//   description: string;
// }

// function ServiceList() {
//   const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);  // State for service categories
//   const [loading, setLoading] = useState<boolean>(false);  // Loading state for fetching data
//   const [error, setError] = useState<string | null>(null);  // Error state

//   // Fetch service categories from the backend
//   useEffect(() => {
//     const fetchServiceCategories = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('/admin/ServiceList');  // Adjust API endpoint
//         setServiceCategories(response.data);
//       } catch (err) {
//         setError('Failed to fetch service categories');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServiceCategories();
//   }, []);

//   // Delete a service category with SweetAlert confirmation
//   const handleDelete = async (id: string) => {
//     // Use SweetAlert for confirmation
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`/admin/DeleteService-category/${id}`);  // Adjust API endpoint for deleting
//           // Update the state after successful deletion
//           setServiceCategories(serviceCategories.filter(category => category._id !== id));

//           // Show success message
//           Swal.fire('Deleted!', 'Service category has been deleted.', 'success');
//         } catch (err) {
//           setError('Failed to delete service category');
//           Swal.fire('Error', 'Failed to delete service category', 'error');
//         }
//       }
//     });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   // Define columns for the TableComponent
//   const columns = [
//     { field: 'index', headerName: 'No' },
//     { field: 'type_name', headerName: 'Service Type' },
//     { field: 'description', headerName: 'Description' },
//     {
//       field: 'actions', 
//       headerName: '',
//       // Render action buttons in the table
//       render: (row: ServiceCategory) => (
//         <span className="flex items-center">
//           <Link to={`/Superadmin/EditServiceCategory/${row._id}`}>
//             <FaEdit className="text-blue-500 cursor-pointer mr-2" />
//           </Link>
//           <FaTrash
//             className="text-red-500 cursor-pointer"
//             onClick={() => handleDelete(row._id)}
//           />
//         </span>
//       )
//     },
//   ];

//   const dataWithIndex = serviceCategories.map((category, index) => ({
//     index: index + 1, // Serial number starting from 1
//     ...category,
//   }));


//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-serif text-customGray font-bold">Services</h1>
//         <Link to="/Superadmin/AddServiceCategory">
//           <button className="bg-custom-gradient text-white py-2 px-4 rounded hover:bg-custom-gradient">
//             Add Service
//           </button>
//         </Link>
//       </div>

//       <div className="overflow-x-auto">
//         <TableComponent columns={columns} data={dataWithIndex} actions={(row) => (
//           <span className="flex items-center">
//             <Link to={`/Superadmin/EditServiceCategory/${row._id}`}>
//               <FaEdit className="text-blue-500 cursor-pointer mr-2" />
//             </Link>
//             <FaTrash
//               className="text-red-500 cursor-pointer"
//               onClick={() => handleDelete(row._id)}
//             />
//           </span>
//         )} />
//       </div>
//     </div>
//   );
// }

// export default ServiceList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import TableComponent from '../Common/TableComponent';
import Pagination from '../Common/Pagination'; // A reusable pagination component

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
      const response = await axios.get(`/admin/ServiceList?page=${page}&limit=10`);
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
          await axios.delete(`/admin/DeleteService-category/${id}`);
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
