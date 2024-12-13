import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import FormComponent from '../Common/FormComponent'; 

interface BookingDetail {
  status: string;
  paymentIntentId: string;
  _id: string;
  user_id: {
    name: string;
    email: string;
    phone: number;
  };
  service_id: {
    service_name: string;
    price: number;
  };
  booking_date: string;
}

const AdminBookingSingledetail: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>(); 
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
          <FormComponent label="Service Name" value={bookingDetails.service_id.service_name} disabled />
          <FormComponent label="Booked Date" value={bookingDetails.booking_date} disabled />
          <FormComponent label="User Name" value={bookingDetails.user_id.name} disabled />
          <FormComponent label="Email" value={bookingDetails.user_id.email} disabled />
          <FormComponent label="Phone" value={bookingDetails.user_id.phone} disabled />
          <FormComponent label="Payment" value={bookingDetails.service_id.price} disabled />
          <FormComponent label="Status" value={bookingDetails.status} disabled />
          <FormComponent label="Payment ID" value={bookingDetails.paymentIntentId} disabled />
        </div>

       
        {/* <button
          className="px-4 py-2 bg-custom-gradient text-white rounded-md"
        >
           <Link to="/Superadmin/Payout">
          Initiate Payout
          </Link>

        </button> */}
      </div>
    </div>
  );
};

export default AdminBookingSingledetail;
