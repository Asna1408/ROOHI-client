import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import FormComponent from '../Common/FormComponent';
import { toast } from 'react-toastify';
import axiosInstance from '../../constant/axiosInstance';

const Bookeddetails: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state: any) => state.user);
  const { BookingId } = useParams(); 
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [rating, setRating] = useState<number>(0); // State for rating
  const [review, setReview] = useState<string>(""); 
  const [submitError, setSubmitError] = useState<string>(""); 
  const navigate = useNavigate();


  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format as d/m/y (dd/mm/yyyy)
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosInstance.get(`/user/bookdetailsbyid/${BookingId}`);
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
         
          const response = await axiosInstance.post(`/user/cancel/${BookingId}`, {
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

  // console.log( bookingDetails.service_id.id)
  const handleSubmitReview = async () => {
    if (rating === 0 || review.trim() === "") {
      toast.error("Please provide a rating and review.");
      return;
    }

    try {
      const response = await fetch('/user/review/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id:currentUser._id,
          service_id: bookingDetails.service_id._id,
          rating,
          review,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review , review cannot be submitted before service");
      }

      // Clear the form after successful submission
      setRating(0);
      setReview("");
      setSubmitError("");
      toast.success("Review submitted successfully!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        setSubmitError("An unknown error occurred");
      }
    }
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
              value={formatDate(bookingDetails.booking_date)} 
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
) : bookingDetails?.status === 'completed' ? (
  <>
  <button className="bg-green-500 text-white px-4 py-2 w-full mt-4" disabled>
    Completed
  </button>

  <div className="mt-10">
    <h2 className="font-bold text-lg font-serif text-customGray">Review & Rating</h2>
    <div className="bg-gray-100 p-4 rounded mt-4">
      <div className="flex items-center space-x-2">
        {/* Stars for rating */}
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`cursor-pointer ${i < rating ? "text-customGold" : "text-gray-400"}`}
            onClick={() => setRating(i + 1)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="Share your experience about us"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="mt-4 w-full p-2 bg-white border rounded"
      />
      {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
      <button
        className="mt-4 bg-custom-gradient text-white py-2 px-4 rounded"
        onClick={handleSubmitReview}
      >
        Submit
      </button>
    </div>
  </div>
  </>
) : (
  <button
    className="bg-custom-gradient text-white px-4 py-2 hover:bg-red-600 w-full mt-4"
    onClick={handleCancelBooking} 
  >
    Cancel Booking
  </button>
)}
      </div>
    </div>
  );
};

export default Bookeddetails;
