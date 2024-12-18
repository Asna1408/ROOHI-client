import axios from 'axios';
import React, { useEffect,useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../constant/axiosInstance';


const BookingSuccess = () => {
  const [searchParams] = useSearchParams(); 
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const hasCalled = useRef(false);

  const sessionId = searchParams.get('session_id');
  const serviceId = searchParams.get('service_id');  
  const userId = searchParams.get('user_id');
  const selectedDate = searchParams.get('selected_date');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (sessionId) {
        console.log(sessionId,"new session id")

        if (hasCalled.current) {
          return; // Prevents multiple calls
        }
        hasCalled.current = true;
        
        try {

const response = await axiosInstance.get(`/user/booking/success`,{
  params: {session_id: sessionId,
    service_id: serviceId,
    user_id: userId,
    selected_date: selectedDate }
        });
  setBookingDetails(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching booking details:", error);
          toast.error("Failed to retrieve booking details");
          setLoading(false);
        }
      }else{
        toast.error("Session ID is missing in the URL")
      }
    };
    fetchBookingDetails();
  }, [sessionId,serviceId,userId,selectedDate]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center p-10 mt-5 mb-5"> 
      <div className="w-full lg:w-1/2 border p-6 rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold mb-4 flex item-center justify-center font-serif text-customGray">BOOKED SUCCESSFULLY</h1>
        <div className=" p-6 rounded-lg mt-6 text-center">
          <p className="text-xl text-customGray font-serif mb-4">THANK YOU FOR BOOKING</p>
          <div className='flex justify-center space-x-4'>
            <button className="bg-custom-gradient text-white px-4 py-2 text-lg">
                <Link to="/services" className="text-white">CONTINUE BOOKING</Link>
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

