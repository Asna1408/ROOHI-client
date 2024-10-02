


import React from 'react';  
import { FaUsers, FaHome, FaLaptop, FaMoneyBillWave } from 'react-icons/fa';  

const Dashboard = () => {  
  return (  
    <div className="flex flex-col p-6 h-full bg-gray-100 text-customGray">  
      <h1 className="text-2xl font-serif font-bold mb-6">Dashboard</h1>  
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">  
        <div className="bg-white p-4 rounded-lg shadow flex items-center">  
          <FaUsers className="text-customGold text-3xl mr-2" />  
          <div>  
            <h2 className="text-xl font-serif font-semibold">66k</h2>  
            <p className="text-gray-500 font-serif">Total Users</p>  
          </div>  
        </div>  
        <div className="bg-white p-4 rounded-lg shadow flex items-center">  
          <FaLaptop className="text-customGold text-3xl mr-2" />  
          <div>  
            <h2 className="text-xl font-serif font-semibold">420k</h2>  
            <p className="text-gray-500 font-serif">Total Bookings</p>  
          </div>  
        </div>  
        <div className="bg-white p-4 rounded-lg shadow flex items-center">  
          <FaMoneyBillWave className="text-customGold text-3xl mr-2" />  
          <div>  
            <h2 className="text-xl font-serif font-semibold">10k</h2>  
            <p className="text-gray-500 font-serif">Total Revenue</p>  
          </div>  
        </div>  
      </div>  

      <h2 className="text-xl font-bold mb-4 font-serif">Total Revenue</h2>  
      <div className="bg-white p-4 rounded-lg shadow mb-4">  
        <div className="flex justify-between mb-4">  
          <button className="bg-custom-gradient font-serif text-white px-4 py-2 rounded">Weekly</button>  
          <button className="px-4 py-2 font-serif rounded">Monthly</button>  
          <button className="px-4 py-2 font-serif rounded">Yearly</button>  
        </div>  
        <div className="h-40 bg-blue-200 rounded-lg"></div>  
        {/* Placeholder for the chart */}  
      </div>  

      <div className="bg-white p-4 rounded-lg shadow">  
        <h3 className="text-lg font-semibold mb-2">Statistics</h3>  
        <ul>  
          <li className="flex justify-between mb-2">  
            <span>Total Sales</span>  
            <span>5995 +15%</span>  
          </li>  
          <li className="flex justify-between mb-2">  
            <span>Total Customers</span>  
            <span>5894 +15%</span>  
          </li>  
          <li className="flex justify-between mb-2">  
            <span>Total Income</span>  
            <span>4453 +25%</span>  
          </li>  
          <li className="flex justify-between mb-2">  
            <span>Total Expense</span>  
            <span>7454 +2%</span>  
          </li>  
        </ul>  
      </div>  
    </div>  
  );  
};  

export default Dashboard;