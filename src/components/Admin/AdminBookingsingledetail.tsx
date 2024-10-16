import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface BookingDetail {
  status: string;
  paymentIntentId: string;
  _id: string;
  user_id: {
    name: string;
    email: string;
    phone:number;
  };
  service_id: {
    service_name: string;
    price: number;
  };
  booking_date: string;
 
}


const AdminBookingSingledetail: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>(); // Extract bookingId from the URL
  const [bookingDetails, setBookingDetails] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch booking details by bookingId
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`/admin/Bookdetails/${bookingId}`);
        setBookingDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError('Failed to load booking details');
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookingDetails) {
    return <div>No booking details found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full lg:w-1/2 border p-6 rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Booking Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold">Service Name</label>
            <input
              type="text"
              value={bookingDetails.service_id.service_name}
              disabled
              className="border w-full p-2 rounded bg-gray-200"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Booked Date</label>
            <input
              type="text"
              value={bookingDetails.booking_date}
              disabled
              className="border w-full p-2 rounded bg-gray-200"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">User Name</label>
            <input
              type="text"
              value={bookingDetails.user_id.name}
              disabled
              className="border w-full p-2 rounded bg-gray-200"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={bookingDetails.user_id.email}
              disabled
              className="border w-full p-2 rounded bg-gray-200"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Phone</label>
            <input
              type="text"
              value={bookingDetails.user_id.phone}
              disabled
              className="border w-full p-2 rounded bg-gray-200"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Payment</label>
            <input
              type="text"
              value={bookingDetails.service_id.price}
              disabled
              className="border w-full p-2 rounded bg-gray-200"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Status</label>
            <input
              type="text"
              value={bookingDetails.status}
              disabled
              className="border w-full p-2 rounded bg-gray-200"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Payment ID</label>
            <input
              type="text"
              value={bookingDetails.paymentIntentId}
              disabled
              className="border w-full p-2 rounded bg-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingSingledetail;
