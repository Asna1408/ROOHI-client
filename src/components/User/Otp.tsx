import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Otp: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const [seconds, setSeconds] = useState(30);
  const location = useLocation();
  
  const navigate = useNavigate();

  
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const emailFromUrl = query.get('email');
    console.log("Extracted email:", emailFromUrl); 

    setEmail(emailFromUrl);
  }, [location]);


  // Handle OTP input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }

    // Automatically focus the next input field
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle OTP submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = code.join('');

    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }

    try {
      const res = await axios.post('https://perfect-bride.shop/user/verify_otp', { email, otp });

      if (res.data) {
        toast.success('OTP verified successfully!');
        navigate('/login');
      } else {
        toast.error('OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('An error occurred during OTP verification.');
    }
  };

  // Handle OTP resend
  const handleResendOtp = async () => {

    if(!email){
      toast.error("email is missing");
      console.error('Email is undefined or null.');

      return;      
    }

    try {
      console.log("Sending email to backend:", email); 

      const res = await axios.post('https://perfect-bride.shop/user/resendOtp', { email });

      if (res.data.success) {
        toast.success('OTP resent successfully.');
        setSeconds(30); 
      } else {
        toast.error(res.data.message || 'Error resending OTP.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('An error occurred while resending OTP.');
    }
  };

  return (
    <div className="flex items-center justify-center mt-5 mb-10 bg-white">
      <div className="bg-white p-8 rounded-lg w-[400px]">
        <h1 className="text-2xl font-semibold text-center text-customGray">Email Verification</h1>
        <p className="text-center text-gray-500 mt-2">
          Enter the 6-digit verification code sent to your email.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center">
          <div className="flex space-x-3 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-xl bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-custom-gradient text-white font-bold py-2"
          >
            Verify Account
          </button>
          <p className="mt-4 text-center text-gray-500">
            Didn't receive the code?{" "}
            <button
              type="button"
              disabled={seconds > 0}
              onClick={handleResendOtp}
              className="text-customGold hover:underline"
            >
              {seconds > 0 ? `Resend OTP in ${seconds}s` : "Resend OTP"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Otp;
