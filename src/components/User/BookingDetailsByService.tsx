import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableComponent from "../Common/TableComponent"; // Import the reusable TableComponent

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
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`/user/bookdetails/bookings/${currentUser._id}`);
        setBookings(response.data);
      } catch (err) {
        toast.error("Failed to fetch booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Define columns for the table
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


  // Prepare data with custom accessor logic for nested fields
  const formattedBookings = bookings.map((booking,index) => ({
    ...booking,
    booking_date: formatDate(booking.booking_date),
    "service_id.service_name": booking.service_id?.service_name || "N/A",
    "user_id.name": booking.user_id?.name || "N/A",
    serialNumber: index + 1,
  }));

  return (
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
  );
};

export default BookingDetailsByService;
