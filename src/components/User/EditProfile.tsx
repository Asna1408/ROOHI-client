import React, { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import axios from "axios";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/profile/edit", { name, email });
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 mt-10 mb-10">
      <section className="flex-1 bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-customGold"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-customGold"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <button type="submit" className="bg-custom-gradient text-white py-2 px-4">Edit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
