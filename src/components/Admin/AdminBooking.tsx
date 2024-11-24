// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import TableComponent from "../Common/TableComponent"; // Import your TableComponent

// interface Booking {
//   _id: string;
//   user_id: {
//     name: string;
//     email: string;
//   };
//   service_id: {
//     service_name: string;
//     price: number;
//   };
//   booking_date: string;
//   status: string;
// }

// const BookingList: React.FC = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch bookings from backend API
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get("/admin/bookdetails"); // Ensure the URL is correct
//         setBookings(response.data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   const columnsForBookings = [
//     { field: 'index', headerName: 'NO' },
//     { field: "user_id.name", headerName: "User Name" },
//     { field: "user_id.email", headerName: "Email" },
//     { field: "service_id.service_name", headerName: "Service" },
//     { field: "service_id.price", headerName: "Price (INR)" },
//     { field: "status", headerName: "Status" },
//   ];

//   const dataWithIndex = bookings.map((category, index) => ({
//     index: index + 1, // Serial number starting from 1
//     ...category,
//   }));


//   return (
//     <div className="overflow-x-auto p-4">
//       <h1 className="text-2xl font-serif text-customGray font-bold mb-6">
//         Bookings
//       </h1>
//       <TableComponent
//         columns={columnsForBookings}
//         data={dataWithIndex}
//         actions={(booking) => (
//           <button
//             onClick={() => navigate(`/Superadmin/BookingList/${booking._id}`)} // Navigate to the detailed page
//             className="bg-red-500 text-white px-2 py-1 rounded hover:bg-opacity-75"
//           >
//             View
//           </button>
//         )}
//       />
//     </div>
//   );
// };

// export default BookingList;



import { useEffect, useState } from "react";
import Pagination from "../Common/Pagination";
import TableComponent from "../Common/TableComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface Booking {
  _id: string;
  user_id: {
    name: string;
    email: string;
  };
  service_id: {
    service_name: string;
    price: number;
  };
  booking_date: string;
  status: string;
}

const AdminBooking: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/admin/bookdetails?page=${currentPage}&limit=10`);
        const { bookings, totalPages } = response.data;

        setBookings(bookings);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentPage]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const columnsForBookings = [
    { field: 'index', headerName: 'NO' },
    { field: "user_id.name", headerName: "User Name" },
    { field: "user_id.email", headerName: "Email" },
    { field: "service_id.service_name", headerName: "Service" },
    { field: "service_id.price", headerName: "Price (INR)" },
    { field: "status", headerName: "Status" },
  ];

  const dataWithIndex = bookings.map((booking, index) => ({
    index: index + 1 + (currentPage - 1) * 10, // Adjust serial number for pagination
    ...booking,
  }));

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-serif text-customGray font-bold mb-6">Bookings</h1>
      <TableComponent
        columns={columnsForBookings}
        data={dataWithIndex}
        actions={(booking) => (
          <button
            onClick={() => navigate(`/Superadmin/BookingList/${booking._id}`)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-opacity-75"
          >
            View
          </button>
        )}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AdminBooking;
