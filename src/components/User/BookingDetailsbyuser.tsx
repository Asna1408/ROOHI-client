import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Booking {
  _id: string;
  service_id: { service_name: string };
  booking_date: string;
  paymentIntentId: string;
  status: string;
}

const BookingDetailsbyuser: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate()


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
  };

  useEffect(() => {
    // Fetch booking details by userId
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/user/bookdetails/${currentUser._id}/bookings`); // Adjust endpoint accordingly
        if (response.ok) {
            const data = await response.json();
        setBookings(data);
    } else {
        toast.error('Failed to fetch booking details');
      }
      } catch (err) {
        setError("Failed to fetch booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-custom-gradient text-customGray font-serif">
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Booking Date</th>
            <th className="py-2 px-4 border-b">Payment Intent</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id} className="hover:bg-gray-100">
              <td className="py-2 px-3 border-b">{index + 1}</td>
              <td className="py-2 px-3 border-b">{booking.service_id?.service_name}</td>
              <td className="py-2 px-3 border-b">{formatDate(booking.booking_date)}</td>
              <td className="py-2 px-3 border-b">{booking.paymentIntentId}</td>
              <td className="py-2 px-3 border-b">{booking.status}</td>
              <td className="py-2 px-3 border-b">
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => navigate(`/bookingdetail/${booking._id}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingDetailsbyuser;
