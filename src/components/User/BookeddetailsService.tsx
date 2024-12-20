import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import FormComponent from "../Common/FormComponent";
import axiosInstance from "../../constant/axiosInstance";

const BookeddetailsService: React.FC = () => {
  const { BookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState<
    "pending" | "confirmed" | "canceled" | "completed"
  >("pending");

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No date available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format as d/m/y (dd/mm/yyyy)
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `https://perfect-bride.shop/user/bookdetailsbyid/${BookingId}`
        );
        setBookingDetails(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    if (BookingId) {
      fetchBookingDetails();
    }
  }, [BookingId]);

  // Function to handle booking cancellation
  const handleCancelBooking = async () => {
    if (!BookingId) {
      console.error("Missing required booking information");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.post(
            `https://perfect-bride.shop/user/cancel/${BookingId}`,
            {
              BookingId,
            }
          );

          if (response.status === 200) {
            setStatus("canceled");
            Swal.fire(
              "Cancelled!",
              "Your booking has been cancelled.",
              "success"
            );
            navigate("/bookingdetailsByProvider");
          } else {
            Swal.fire("Error!", "Failed to cancel booking.", "error");
          }
        } catch (error) {
          console.error("Error during cancellation:", error);
          Swal.fire(
            "Error!",
            "An error occurred during cancellation.",
            "error"
          );
        }
      }
    });
  };

  const handleCompleteBooking = async () => {
    if (!BookingId) {
      console.error("Missing required booking information");
      return;
    }

    try {
      const response = await axiosInstance.post(`https://perfect-bride.shop/user/complete/${BookingId}`);
      if (response.status === 200) {
        setStatus("completed");
        Swal.fire(
          "Completed!",
          "Your booking has been marked as completed.",
          "success"
        );
      } else {
        Swal.fire("Error!", "Failed to mark booking as completed.", "error");
      }
    } catch (error) {
      console.error("Error during completion:", error);
      Swal.fire("Error!", "An error occurred during completion.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full lg:w-1/2 border p-6 rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold mb-4 flex item-center justify-center">
          Booking Details
        </h1>

        {bookingDetails ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormComponent
              label="Artist Name"
              value={bookingDetails.service_id.service_name}
              disabled
            />
            <FormComponent
              label="Selected Date"
              value={formatDate(bookingDetails.booking_date)} // Format the booking date
              disabled
            />
            <FormComponent
              label="Name"
              value={bookingDetails.user_id.name}
              disabled
            />
            <FormComponent
              label="Contact No"
              value={bookingDetails.user_id.phone}
              disabled
            />
            <FormComponent
              label="Email"
              value={bookingDetails.user_id.email}
              disabled
            />
            <FormComponent
              label="Payment"
              value={bookingDetails.service_id.price}
              disabled
            />
            <FormComponent
              label="Status"
              value={bookingDetails.status}
              disabled
            />
            <FormComponent
              label="Payment ID"
              value={bookingDetails.paymentIntentId}
              disabled
            />
          </div>
        ) : (
          <p>Loading service details...</p>
        )}

        {status === "canceled" ? (
          <button
            className="bg-gray-400 text-white px-4 py-2 w-full mt-4"
            disabled
          >
            Cancelled
          </button>
        ) : status === "completed" ? (
          <button
            className="bg-green-600 text-white px-4 py-2 w-full mt-4"
            disabled
          >
            Completed
          </button>
        ) : (
          <>
            <button
              className="bg-custom-gradient text-white px-4 py-2 hover:bg-red-600 w-full mt-4"
              onClick={handleCancelBooking}
            >
              Cancel Booking
            </button>
            <button
              className="bg-custom-gradient text-white px-4 py-2 hover:bg-green-600 w-full mt-4"
              onClick={handleCompleteBooking}
            >
              Complete Booking
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookeddetailsService;
