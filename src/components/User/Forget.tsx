import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { REGEX, VALIDATION_MESSAGES } from "../../constant/validation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const protocol = window.location.protocol;
  const host = window.location.host;
  const url = `${protocol}//${host}/reset_password?email=${email}`;

  console.log(url)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error(VALIDATION_MESSAGES.EMAIL.REQUIRED);
      return;
    }
    if (!REGEX.EMAIL.test(email)) {
      toast.error(VALIDATION_MESSAGES.EMAIL.INVALID);
      return;
    }

    try {
      const res = await axios.post("/user/forgot-password", {
        email : email,
        link: url
      });

      if (res.data) {
        toast.success("Password reset link has been sent to your email.");
      } else {
      
        toast.error("Error sending password reset email.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
<div className="flex items-center justify-center mt-5 mb-10 bg-white">
      <div className="bg-white p-8 rounded-lg w-[400px]">
        <h1 className="text-2xl font-semibold font-serif text-center text-customGray">Forget Password</h1>
        <p className="text-center text-gray-500 font-serif mt-2 mb-5">
          Enter your Email
        </p>
        <form onSubmit={handleSubmit} >
          <div className="flex space-x-3 mb-6">

              <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGold"
               type="email"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
              />
            
          </div>
          <button
            type="submit"
            className="w-full bg-custom-gradient text-white font-bold py-2"
          >
           Send Reset Link
          </button>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
