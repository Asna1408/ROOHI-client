import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import Swal for confirmation dialoge
import FormComponent from '../Common/FormComponent';

const Bookeddetails: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state: any) => state.user);
  const { BookingId } = useParams(); // Fetch BookingId from the route parameter
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const navigate = useNavigate();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format as d/m/y (dd/mm/yyyy)
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`/user/bookdetailsbyid/${BookingId}`);
        setBookingDetails(response.data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    if (BookingId) {
      fetchBookingDetails();
    }
  }, [BookingId]);

  // Function to handle booking cancellation
  const handleCancelBooking = async () => {
    if (!BookingId) {
      console.error('Missing required booking information');
      return;
    }

    // Confirm cancellation using Swal.fire
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Make a POST request to cancel the booking
          const response = await axios.post(`/user/cancel/${BookingId}`, {
            BookingId,
          });

          if (response.status === 200) {
            Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
            navigate('/bookingdetailsByUser');
          } else {
            Swal.fire('Error!', 'Failed to cancel booking.', 'error');
          }
        } catch (error) {
          console.error('Error during cancellation:', error);
          Swal.fire('Error!', 'An error occurred during cancellation.', 'error');
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full lg:w-1/2 border p-6 rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold mb-4 flex item-center justify-center">Booking Details</h1>

        {bookingDetails ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormComponent label="Artist Name" value={bookingDetails.service_id.service_name} disabled />
            <FormComponent 
              label="Selected Date" 
              value={formatDate(bookingDetails.booking_date)} // Format the booking date
              disabled 
            />
            <FormComponent label="Name" value={currentUser.name} disabled />
            <FormComponent label="Contact No" value={currentUser.phone} disabled />
            <FormComponent label="Email" value={currentUser.email} disabled />
            <FormComponent label="Payment" value={bookingDetails.service_id.price} disabled />
            <FormComponent label="Status" value={bookingDetails.status} disabled />
            <FormComponent label="Payment ID" value={bookingDetails.paymentIntentId} disabled />
          </div>
        ) : (
          <p>Loading service details...</p>
        )}

        {bookingDetails && bookingDetails.status === 'canceled' ? (
          <button className="bg-gray-400 text-white px-4 py-2 w-full mt-4" disabled>
            Cancelled
          </button>
        ) : (
          <button
            className="bg-custom-gradient text-white px-4 py-2 hover:bg-red-600 w-full mt-4"
            onClick={handleCancelBooking} // Call handleCancelBooking on button click
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default Bookeddetails;
