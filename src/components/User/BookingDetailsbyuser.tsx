
import React, { useEffect, useState } from "react";
import TableComponent from "../Common/TableComponent";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../Common/Pagination";
import axiosInstance from "../../constant/axiosInstance";


interface Booking {
  _id: string;
  service_id: { service_name: string };
  booking_date: string;
  paymentIntentId: string;
  status: string;
}

const BookingDetailsByUser: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const fetchBookingDetails = async (page: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`https://perfect-bride.shop/user/bookdetails/${currentUser._id}/bookings`, {
        params: {
          page: page,
          limit: 10
        }
      });
  
      setBookings(response.data.bookings);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      toast.error("Failed to fetch booking details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingDetails(currentPage);
  }, [currentPage, currentUser]);

  if (loading) return <div>Loading...</div>;

  const columns = [
    { field: "serialNumber", headerName: "No" },
    { field: "service_name", headerName: "Service Name" },
    { field: "booking_date", headerName: "Booking Date" },
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
    service_name: booking.service_id?.service_name,
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
            onClick={() => navigate(`/bookingdetail/${booking._id}`)}
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

export default BookingDetailsByUser;
