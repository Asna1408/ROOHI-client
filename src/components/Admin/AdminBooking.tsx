import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bookings from backend API
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/admin/bookdetails'); // Ensure the URL is correct
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-serif text-customGray font-bold mb-6">Bookings</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-custom-gradient">
            <th className="py-2 px-4 text-left text-white font-bold">NO</th>
            <th className="py-2 px-4 text-left text-white font-bold">USER NAME</th>
            <th className="py-2 px-4 text-left text-white font-bold">EMAIL</th>
            <th className="py-2 px-4 text-left text-white font-bold">SERVICE</th>
            <th className="py-2 px-4 text-left text-white font-bold">PRICE</th>
            <th className="py-2 px-4 text-left text-white font-bold">STATUS</th>
            <th className="py-2 px-4 text-left text-white font-bold">VIEW</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id} className="bg-white-100">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{booking.user_id.name}</td>
              <td className="py-2 px-4">{booking.user_id.email}</td>
              <td className="py-2 px-4">{booking.service_id.service_name}</td>
              <td className="py-2 px-4">${booking.service_id.price}</td>
              <td className="py-2 px-4">${booking.status}</td>
              <td className="py-2 px-4">
                <span className="flex items-center">
                <button
                    onClick={() => navigate(`/Superadmin/BookingList/${booking._id}`)} // Navigate to the detailed page
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-opacity-75"
                  >
                    View
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
