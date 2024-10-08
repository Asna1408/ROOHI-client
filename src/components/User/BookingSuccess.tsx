// BookingSuccess.jsx
import React from 'react';

const BookingSuccess = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Booking Successful</h1>
      <div className="bg-white p-4 shadow-md rounded text-center">
        <p className="mb-2">Thank you for your booking!</p>
        <p className="mb-2">Your service is scheduled.</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
