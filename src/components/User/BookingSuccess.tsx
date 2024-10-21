import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';


const BookingSuccess = () => {
  const [searchParams] = useSearchParams(); // Extract query parameters
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (sessionId) {
        try {
          const response = await axios.get(`/user/booking/success/${sessionId}`); // Make API call to fetch booking details
          setBookingDetails(response.data);
          setLoading(false);
        } catch (error) {

          setLoading(false);
        }
      }
    };
    fetchBookingDetails();
  }, [sessionId]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center p-10 mt-5 mb-5"> {/* Added flexbox properties and background */}
      <div className="w-full lg:w-1/2 border p-6 rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold mb-4 flex item-center justify-center font-serif text-customGray">BOOKED SUCCESSFULLY</h1>
        <div className=" p-6 rounded-lg mt-6 text-center">
          <p className="text-xl text-customGray font-serif mb-4">THANK YOU FOR BOOKING</p>
          <div className='flex justify-center space-x-4'>
            <button
              className="bg-custom-gradient text-white  px-4 py-2 text-lg "

            >
              CONTINUE BOOKING
            </button>
            {/* <button
                    className="bg-custom-gradient text-white  px-4 py-2 text-lg"
                    
                >
                   VIEW DETAILS
                </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
