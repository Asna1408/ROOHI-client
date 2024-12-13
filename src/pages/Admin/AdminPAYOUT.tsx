import React, { useState } from "react";
import axios from "axios";
import AdminFooter from "../../components/Admin/AdminFooter";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";

const InitiatePayout: React.FC = () => {
  const [formData, setFormData] = useState({
    providerId: "",
    stripeAccountId: "",
    amount: 0,
    currency: "usd",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/admin/initiate-payout", formData);
      setMessage(`Payout initiated successfully: ${response.data.transfer.id}`);
    } catch (error: any) {
      setMessage(`Failed to initiate payout: ${error.response?.data?.message || error.message}`);
    }

    setLoading(false);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }
    

  return (
    <div>
      <div className="flex flex-col h-screen">
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-6 bg-gray-100 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="max-w-md mx-auto pt-2 pb-3 pr-6 pl-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Initiate Payout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Service Provider ID</label>
          <input
            type="text"
            name="providerId"
            value={formData.providerId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Stripe Account ID</label>
          <input
            type="text"
            name="stripeAccountId"
            value={formData.stripeAccountId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="inr">INR</option>
            
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-custom-gradient text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Processing..." : "Initiate Payout"}
        </button>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </form>
    </div>
    </main>
      </div>
      <AdminFooter />
    </div>
    </div>

  );
};

export default InitiatePayout;
