import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../constant/axiosInstance";

const EditProfile = () => {
  const { userId } = useParams(); 
  const navigate = useNavigate(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`https://perfect-bride.shop/user/editProfile/${userId}`);
        const userData = response.data;
        setName(userData.name || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData = { name, email, phone };
      await axiosInstance.post(`https://perfect-bride.shop/user/editProfile/${userId}`, updateData);
      toast.success('Profile Updated Successfully');

      navigate("/profile"); 
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error('Failed to Update Profile');
    }
  };

  return (
    <div className="container mx-auto  flex flex-col md:flex-row gap-6 mt-10 mb-10">
      <section className="flex-1 bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-customGold md"
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
                className="mt-1 block w-full p-2 border border-customGold md"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full p-2 border border-customGold md"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-custom-gradient text-white py-2 px-4 lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
