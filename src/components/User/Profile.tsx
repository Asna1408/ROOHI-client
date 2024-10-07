import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // If you're using React Router

const Profile = () => {

  const currentUser = useSelector((state: any) => state.user.currentUser);
  console.log('CurrentUser:',currentUser)
  
  return (
  
    
   
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 mt-10 mb-10">
        {/* Sidebar */}
        

        {/* Profile Edit Section */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-lg">
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name and Email Inputs */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value ={currentUser.name}
                className="mt-1 block w-full p-2 border border-customGold md"
                
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value ={currentUser.email}
                className="mt-1 block w-full p-2 border border-customGold md"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Edit and Change Password Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <button className="bg-custom-gradient text-white py-2 px-4 lg">Edit</button>
            <button className="bg-custom-gradient text-white py-2 px-4 lg">Change Password</button>
          </div>
        </section>
      </div>

  );
};

export default Profile;
