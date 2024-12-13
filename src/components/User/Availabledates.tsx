import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedDate } from "../../redux/user/BookingSlice"; 
import { toast } from 'react-toastify';

interface AvailableDatesProps {
  serviceId: string; 
}

const Availabledates: React.FC<AvailableDatesProps> = ({ serviceId }) => {
  const [availableDates, setAvailableDates] = useState<string[]>([]); 
  const [selectedDate, setSelectedDateState] = useState<string | null>(null); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const response = await axios.get(`/user/services/${serviceId}/availability`);
        const { availableDates} = response.data;

        console.log(response.data);

        setAvailableDates(availableDates);
      } catch (error) {
        toast.error("failed to fetch ")
        console.error('Error fetching availability:', error);

      }
    };

    fetchAvailableDates();
  }, [serviceId]);

  // Handle date selection
  const handleDateSelect = (date: string) => {
      setSelectedDateState(date);
  };

  
  const handleConfirmDate = () => {
    if (selectedDate) {
      dispatch(setSelectedDate(selectedDate)); // Store the selected date in Redux
      navigate(`/bookingform?serviceId=${serviceId}`); 
    } else {
      toast('Please select a date before confirming.');
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <h1 className="text-3xl font-bold font-serif text-customGray mb-6">BOOKING</h1>
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
        
        {/* Date Slot Booking */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold font-serif mb-4">Select Date</h2>
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              {availableDates.map((date, index) => (
                <button
                  key={index}
                  className={`border px-4 py-2 ${
                    selectedDate === date ? 'bg-green-500' : 'bg-custom-gradient'
                  } text-white hover:bg-custom-gradient hover:text-white`}
                  onClick={() => handleDateSelect(date)}
                >
                  { format(new Date(date), 'dd MMM yyyy')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Date Button */}
      <div className="mt-8 text-center">
        <button
          className="bg-custom-gradient text-white px-6 py-3 rounded-lg"
          onClick={handleConfirmDate}
          disabled={!selectedDate} 
        >
          Confirm Date
        </button>
      </div>
    </div>
  );
};

export default Availabledates;
