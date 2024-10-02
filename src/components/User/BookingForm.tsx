import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const timeSlots = ['11:30 AM', '12:30 PM', '1:30 PM', '4:30 PM', '5:30 PM', '6:30 PM'];

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <h1 className="text-3xl font-bold font-serif text-customGray mb-6">BOOKING</h1>
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">

        {/* Booking Form */}
        <div className="w-full lg:w-1/2 border p-6 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="border w-full p-2 rounded"
                dateFormat="MM/dd/yyyy"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Artist Name</label>
              <input
                type="text"
                value="SHAZ mehendi"
                disabled
                className="border w-full p-2 rounded bg-gray-200"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Name</label>
              <input type="text" className="border w-full p-2 rounded" />
            </div>
            <div>
              <label className="block mb-2 font-semibold">City</label>
              <input type="text" className="border w-full p-2 rounded" />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Email</label>
              <input type="email" className="border w-full p-2 rounded" />
            </div>
            <div>
              <label className="block mb-2 font-semibold">State</label>
              <input type="text" className="border w-full p-2 rounded" />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Contact No</label>
              <input type="text" className="border w-full p-2 rounded" />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Payment</label>
              <input type="text" className="border w-full p-2 rounded" />
            </div>
          </div>
          <button className="bg-custom-gradient text-white px-4 py-2 hover:bg-red-600 w-full mt-4">
            BOOK NOW
          </button>
        </div>

        {/* Slot Booking */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Select Time Slot</h2>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-2">
              {format(selectedDate || new Date(), 'EEEE, MMMM dd')}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleSlotSelect(slot)}
                  className={`border  px-4 py-2 ${
                    selectedSlot === slot ? 'bg-custom-gradient text-white' : 'bg-white text-customGold'
                  } hover:bg-custom-gradient hover:text-white`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timezone */}
      <div className="mt-4 text-center">
        <p className="text-gray-500 text-sm">Asia/Calcutta ({format(new Date(), 'hh:mm a')})</p>
      </div>
    </div>
  );
};

export default BookingForm;
