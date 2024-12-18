
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableComponent from "../Common/TableComponent"; // Import the reusable TableComponent
import Pagination from "../Common/Pagination";
import axiosInstance from "../../constant/axiosInstance";

interface Booking {
  _id: string;
  service_id: {
    service_name: string;
  };
  user_id: {
    name: string;
  };
  booking_date: string;
  provider_id: string;
  status: string;
}

const BookingDetailsByService: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const fetchBookingDetails = async (page: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/user/bookdetails/bookings/${currentUser._id}?page=${page}&limit=10`
      );
      const data = response.data;

      setBookings(data.bookings);
      setTotalPages(data.totalPages);
    } catch (err) {
      toast.error("Failed to fetch booking details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingDetails(currentPage);
  }, [currentPage, currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    { field: "serialNumber", headerName: "No" },
    { field: "service_id.service_name", headerName: "Service Name" },
    { field: "user_id.name", headerName: "Customer Name" },
    { field: "booking_date", headerName: "Booked Date" },
    { field: "status", headerName: "Status" },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`;
  };

  const formattedBookings = bookings.map((booking, index) => ({
    ...booking,
    booking_date: formatDate(booking.booking_date),
    "service_id.service_name": booking.service_id?.service_name || "N/A",
    "user_id.name": booking.user_id?.name || "N/A",
    serialNumber: (currentPage - 1) * 10 + (index + 1),
  }));

  return (
    <div>
      <TableComponent
        columns={columns}
        data={formattedBookings}
        actions={(booking) => (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => navigate(`/bookingRequestdetail/${booking._id}`)}
          >
            View
          </button>
        )}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};


export default BookingDetailsByService;
