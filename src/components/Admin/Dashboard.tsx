
import axios from 'axios';
import React, { useEffect, useState } from 'react';  
import { FaUsers, FaLaptop, FaMoneyBillWave } from 'react-icons/fa';  
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";




const Dashboard = () => { 
  const [userCount, setUserCount] = useState(0);
const [bookingCount, setBookingCount] = useState(0);
const [totalRevenue, setTotalRevenue] = useState(0);
  const [bookingStatusDistribution, setBookingStatusDistribution] = useState([]);
  const [revenueOverTime, setRevenueOverTime] = useState([]);
  const [filter, setFilter] = useState("month"); // Default filter


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


useEffect(() => {
  const fetchUserCount = async () => {
    try {
      const response = await axios.get('/admin/get-user-count');
      setUserCount(response.data.count);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  const fetchBookingCount = async () => {
    try {
      const response = await axios.get('/admin/get-booking-count');
      setBookingCount(response.data.count);
    } catch (error) {
      console.error("Error fetching booking count:", error);
    }
  };

  const fetchTotalRevenue = async () => {
    try {
      const response = await axios.get("/admin/get-totalrevenue");
      console.log("API Response for Revenue:", response.data);
      setTotalRevenue(response.data || 0);
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  };

  const fetchBookingStatus = async () => {
    try {
      const response = await axios.get("/admin/get-bookingstatus");
      setBookingStatusDistribution(response.data || []);
    } catch (error) {
      console.error("Error fetching booking status distribution:", error);
    }
  };

  const fetchRevenueOverTime = async () => {
    try {
        const response = await axios.get(`/admin/get-revenueOvertime?filter=${filter}`);
      setRevenueOverTime(response.data || []);
    } catch (error) {
      console.error("Error fetching revenue over time:", error);
    }
  };

  fetchUserCount();
  fetchBookingCount();
  fetchTotalRevenue();
  fetchBookingStatus();
  fetchRevenueOverTime();
}, [filter]);
  
  return (  
    <div className="flex flex-col p-6 h-full bg-gray-100 text-customGray">  
      <h1 className="text-2xl font-serif font-bold mb-6">Dashboard</h1>  
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">  
        <div className="bg-white p-4 rounded-lg shadow flex items-center">  
          <FaUsers className="text-customGold text-3xl mr-2" />  
          <div>  
            <h2 className="text-xl font-serif font-semibold">{userCount}</h2>  
            <p className="text-gray-500 font-serif">Total Users</p>  
          </div>  
        </div>  
        <div className="bg-white p-4 rounded-lg shadow flex items-center">  
          <FaLaptop className="text-customGold text-3xl mr-2" />  
          <div>  
            <h2 className="text-xl font-serif font-semibold">{bookingCount}</h2>  
            <p className="text-gray-500 font-serif">Total Bookings</p>  
          </div>  
        </div>  
        <div className="bg-white p-4 rounded-lg shadow flex items-center">  
          <FaMoneyBillWave className="text-customGold text-3xl mr-2" />  
          <div>  
            <h2 className="text-xl font-serif font-semibold">₹{totalRevenue}</h2>  
            <p className="text-gray-500 font-serif">Total Revenue</p>  
          </div>  
        </div>  
      </div>  
      <div className="bg-white p-4 rounded-lg shadow mb-4 ">  
      <h2 className="text-xl font-bold mb-4 font-serif">Booking Status</h2>
      <div className="bg-white p-4 rounded-lg shadow flex justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={bookingStatusDistribution}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {bookingStatusDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <h2 className="text-xl font-bold mb-4 mt-4 font-serif">Revenue Over Time</h2>
      <div className="filter-buttons flex space-x-4 my-4">
  <button
    onClick={() => setFilter("week")}
    className={`px-4 py-2 rounded-md font-medium ${
      filter === "week"
        ? "bg-custom-gradient text-white border-2 "
        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
    }`}
  >
    Week
  </button>
  <button
    onClick={() => setFilter("month")}
    className={`px-4 py-2 rounded-md font-medium ${
      filter === "month"
        ? "bg-custom-gradient text-white border-2 "
        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
    }`}
  >
    Month
  </button>
  <button
    onClick={() => setFilter("year")}
    className={`px-4 py-2 rounded-md font-medium ${
      filter === "year"
        ? "bg-custom-gradient text-white border-2 "
        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
    }`}
  >
    Year
  </button>
</div>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timePeriod" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>  
    </div>  
  );  
};  

export default Dashboard;