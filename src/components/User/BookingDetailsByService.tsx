import React, { useEffect, useState } from "react";  
import axios from "axios";  
import { toast } from "react-toastify";  
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Booking {  
  _id: string;  
  service_id: {  
    service_name: string,  
  };  
  user_id: {  
    name: string,  
  };  
  booking_date: string;  
  provider_id: string;  
  paymentIntentId: string;  
  status: string;  
}  

const BookingDetailsByService: React.FC = () => {  
  const [bookings, setBookings] = useState<Booking[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);  
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate()

  useEffect(() => {  
    const fetchBookingDetails = async () => {  
      try {  
        console.log("Fetching bookings for Provider ID:", currentUser._id); // Debugging line  
        const response = await axios.get(`/user/bookdetails/bookings/${currentUser._id}`);  
        setBookings(response.data);  
      } catch (err) {  
        console.error(err); // Log the detailed error  
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

  return (  
    <div className="overflow-x-auto p-4">  
      <table className="min-w-full bg-white border border-gray-300 shadow-md">  
        <thead>  
          <tr className="bg-custom-gradient text-customGray font-serif">  
            <th className="py-2 px-4 border-b">No</th>  
            <th className="py-2 px-4 border-b">Service Name</th>  
            <th className="py-2 px-4 border-b">Customer Name</th>  
            
            <th className="py-2 px-4 border-b">Payment Intent</th>  
            <th className="py-2 px-4 border-b">Status</th>  
            <th className="py-2 px-4 border-b">Action</th>  
          </tr>  
        </thead>  
        <tbody>  
          {bookings.map((booking, index) => (  
            <tr key={booking._id} className="hover:bg-gray-100">  
              <td className="py-2 px-3 border-b">{index + 1}</td>  
              <td className="py-2 px-3 border-b">{booking.service_id.service_name}</td>  
              <td className="py-2 px-3 border-b">{booking.user_id.name}</td>  
              
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

export default BookingDetailsByService;