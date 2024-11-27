import React, { useState } from "react";
import axios from "axios";

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

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Initiate Payout</h2>
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
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Processing..." : "Initiate Payout"}
        </button>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default InitiatePayout;
