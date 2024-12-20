import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { REGEX, VALIDATION_MESSAGES } from "../../constant/validation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showconfirmPassword,setShowconfirmpassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation()
  const query = new URLSearchParams(location.search);
  const email = query.get('email');
  console.log(email)
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error(VALIDATION_MESSAGES.PASSWORD.REQUIRED);
      return;
    }
    if (!REGEX.PASSWORD.test(password)) {
      toast.error(VALIDATION_MESSAGES.PASSWORD.INVALID);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("password and confirm password is not match");
      return;
    }


    try {
      const res = await axios.post('https://perfect-bride.shop/user/reset-password', {
        email: email,
        password: password
      })


      console.log(res.data)
      if (res.data) {
        toast.success("Password has been reset successfully.");
        navigate("/login");
      } else {

        toast.error("Error resetting password.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (


    <div className="flex items-center justify-center mt-5 mb-10 bg-white">
      <div className="bg-white p-8 rounded-lg w-[400px]">
        <h1 className="text-2xl font-semibold font-serif mb-6 text-center text-customGray">Reset Password</h1>
        <form onSubmit={handleSubmit} >
          <div className="mb-6 relative">
            <label className="block text-gray-700 font-medium mb-2 font-serif" htmlFor="password">
              Enter new Password
            </label>
            <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"} 
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            </div>
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 font-medium mb-2 font-serif" htmlFor="password">
              Confirm new Password
            </label>
            <div className="relative w-full">
            <input
             type={showconfirmPassword ? "text" : "password"}
              id="repassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGold"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center justify-center"
              onClick={() => setShowconfirmpassword(!showconfirmPassword)}
            >
              {showconfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-custom-gradient text-white font-bold py-2"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>

  );
};

export default ResetPassword;
