import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import Swal for confirmation dialog



const Bookeddetails: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { currentUser } = useSelector((state: any) => state.user);
  const { BookingId } = useParams(); // Fetch BookingId from the route parameter
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const navigate = useNavigate()
  

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
            navigate('/bookingdetailsByUser')
            // You can handle additional logic here, such as redirecting the user
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
        <h1 className="text-2xl font-bold mb-4 flex item-center justify-center">Booking Form</h1>

        {bookingDetails ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Artist Name</label>
              <input
                type="text"
            value={bookingDetails.service_id.service_name}
                disabled
                className="border w-full p-2 rounded bg-gray-200"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Selected Date</label>
              <input
                          value={bookingDetails.booking_date}

                disabled
                className="border w-full p-2 rounded bg-gray-200"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={currentUser.name}
                disabled
                className="border w-full p-2 rounded bg-gray-200"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Contact No</label>
              <input
                type="text"
                name="contactNo"
                value={currentUser.phone}
                disabled
                className="border w-full p-2 rounded bg-gray-200"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={currentUser.email}
                disabled
                className="border w-full p-2 rounded bg-gray-200"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Payment</label>
              <input
                type="text"
                name="payment"
                value ={bookingDetails.service_id.price}
                disabled
                className="border w-full p-2 rounded bg-gray-200"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Status</label>
              <input
                type="text"
                name="payment"
                value ={bookingDetails.status}
                disabled
                className="border w-full p-2 rounded bg-gray-200"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Payment ID</label>
              <input
                type="text"
                name="payment"
                value ={bookingDetails.paymentIntentId}
                disabled
                className="border w-full p-2 rounded bg-gray-200"
              />
            </div>
          </div>
        ) : (
          <p>Loading service details...</p>
        )}

{bookingDetails && bookingDetails.status === 'canceled' ? (  
          <button  
            className="bg-gray-400 text-white px-4 py-2 w-full mt-4"  
            disabled  
          >  
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
