import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../redux/store'; 
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from '../../constant/axiosInstance';


const BookingForm: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = queryParams.get('serviceId'); 
  const selectedDate = useSelector((state: RootState) => state.booking.selectedDate); 
  const { currentUser } = useSelector((state: any) => state.user);
  const [service, setService] = useState<any>(null); 
  const [stripePromise] = useState(() => loadStripe('pk_test_51Q7VPGGWw2JRPJ2C46Z6Y0HaJDXkEAd0vriu3U4OU1HZs2cvcH4hhzsdbk9pPeoesJgMFUdkAUtJzsabxoJsRHhE00KCLyUpjO')); // Replace with your Stripe public key


  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date selected';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format as d/m/y (dd/mm/yyyy)
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
       
        const response = await axiosInstance.get(`https://perfect-bride.shop/user/servicedetails/${serviceId}`);
        console.log("Service details fetched:", response.data); // Debugging
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };

    if (serviceId) {
      fetchServiceDetails();
    }
  }, [serviceId]);

  console.log(serviceId,currentUser?._id,selectedDate, "All information passsed" )

  const handleBooking = async () => {
    if (!serviceId || !currentUser?._id || !selectedDate) {
      console.error('Missing required booking information');
      return;
    }
  
    const amount = service.price * 100; // Amount in cents (e.g., service price in INR converted to cents)
    const currency = 'inr'; // Currency, you can change as per requirement
  
    try {
      const response = await axiosInstance.post('https://perfect-bride.shop/user/booknowcheckout', {
        serviceId,
        userId: currentUser._id,
        selectedDate,
        amount,
        currency,
      });
  
      const { sessionId } = response.data;
  
      const stripe = await stripePromise; 
  
      if (!stripe) {
        console.error('Stripe.js has not loaded yet.');
        return;
      }
  
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error during booking process:', error);
    }
  };

  const defaultPhone = "1234567890";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4"> 
      <div className="w-full lg:w-1/2 border p-6 rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold mb-4 flex item-center justify-center">Booking Form</h1>

        {service ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Artist Name</label>
              <input
                type="text"
                value={service.service_name}
                disabled
                className="border w-full p-2 rounded bg-gray-200"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Selected Date</label>
              <input
                value={formatDate(selectedDate)}
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
                value={currentUser.phone || defaultPhone}
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
                value={`₹${service.price}`} 
                disabled
                className="border w-full p-2 rounded bg-gray-200"
              />
            </div>
          </div>
        ) : (
          <p>Loading service details...</p>
        )}

        <button
          className="bg-custom-gradient text-white px-4 py-2 hover:bg-red-600 w-full mt-4"
          onClick={handleBooking} 
        >
          CONFIRM PAYMENT
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
