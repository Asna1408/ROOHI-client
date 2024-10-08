import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../../redux/store'; 
import { loadStripe } from '@stripe/stripe-js';


const BookingForm: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = queryParams.get('serviceId'); 
  const selectedDate = useSelector((state: RootState) => state.booking.selectedDate); 
  const { currentUser } = useSelector((state: any) => state.user);
  const [service, setService] = useState<any>(null); 
  const [stripePromise] = useState(() => loadStripe('pk_test_51Q7VPGGWw2JRPJ2C46Z6Y0HaJDXkEAd0vriu3U4OU1HZs2cvcH4hhzsdbk9pPeoesJgMFUdkAUtJzsabxoJsRHhE00KCLyUpjO')); // Replace with your Stripe public key

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        console.log("Fetching service with ID:", serviceId); 
        const response = await axios.get(`/user/servicedetails/${serviceId}`);
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

  // Sample frontend code to handle booking
  const handleBooking = async () => {
    if (!serviceId || !currentUser?._id || !selectedDate) {
      console.error('Missing required booking information');
      return;
    }

    const amount = service.price * 100; // Amount in cents (e.g., service price in INR converted to cents)
    const currency = 'inr'; // Currency, you can change as per requirement

    try {
      const response = await fetch('/user/booknowcheckout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          userId: currentUser._id,
          selectedDate,
          amount,
          currency,
        }),
      });

      if (!response.ok) {
        // Handle error
        const error = await response.json();
        console.error('Error creating booking:', error);
        return;
      }

      const { sessionId } = await response.json();
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4"> {/* Added flexbox properties and background */}
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
                value={selectedDate || 'No date selected'}
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
          onClick={handleBooking} // Calling the handleBooking function on button click
        >
          CONFIRM PAYMENT
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
