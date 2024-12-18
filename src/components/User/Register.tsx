import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { REGEX, VALIDATION_MESSAGES } from '../../constant/validation'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInSuccess } from "../../redux/user/UserSlice";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from '../../firebase/firebase';


type UserType = {
  name: string;
  email: string;
  phone: string; 
  password: string;
  rePassword: string;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Partial<UserType>>({});
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<UserType>({
    name: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',
  });

  console.log(formData)

  

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
  
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const { displayName, email } = resultsFromGoogle.user;
  
      // Send the name and email to the backend using Axios
      const response = await axios.post("/user/googleAuth", {
        name: displayName,
        email: email,
      });
  
      const data = response.data;
  
      if (response.status === 200) {
        if (data.alreadyRegistered) {
          toast.info("User is already registered. You can log in using the login page.");
        } else {
          toast.success("User successfully registered and logged in!");
          dispatch(signInSuccess(data));
          navigate("/"); // Navigate to the landing page
        }
      } else {
        toast.error("An error occurred during registration.");
      }
    } catch (error) {
      toast.error("An error occurred during Google authentication.");
      console.error("Error during Google authentication:", error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserType> = {};

    // Name Validation
    if (!formData.name) {
      newErrors.name = VALIDATION_MESSAGES.NAME.REQUIRED;
    } else if (!REGEX.NAME.test(formData.name)) {
      newErrors.name = VALIDATION_MESSAGES.NAME.INVALID;
    }

    // Email Validation
    if (!formData.email) {
      newErrors.email = VALIDATION_MESSAGES.EMAIL.REQUIRED;
    } else if (!REGEX.EMAIL.test(formData.email)) {
      newErrors.email = VALIDATION_MESSAGES.EMAIL.INVALID;
    }

    // Phone Validation
    if (!formData.phone) {
      newErrors.phone = VALIDATION_MESSAGES.MOBILE.REQUIRED;
    } else if (!REGEX.MOBILE.test(formData.phone)) {
      newErrors.phone = VALIDATION_MESSAGES.MOBILE.INVALID;
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = VALIDATION_MESSAGES.PASSWORD.REQUIRED;
    } else if (!REGEX.PASSWORD.test(formData.password)) {
      newErrors.password = VALIDATION_MESSAGES.PASSWORD.INVALID;
    }

    // Confirm Password Validation
    if (!formData.rePassword) {
      newErrors.rePassword = VALIDATION_MESSAGES.CONFIRM_PASSWORD.REQUIRED;
    } else if (formData.password !== formData.rePassword) {
      newErrors.rePassword = VALIDATION_MESSAGES.CONFIRM_PASSWORD.MISMATCH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log(e)
    // if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.rePassword) {
    //   toast('Please fill in all the fields.');
    //   return;
    // }
    // if (!REGEX.NAME.test(formData.name)) {
    //   toast.error(VALIDATION_MESSAGES.NAME.INVALID);
    //   return;
    // }
    // if (!formData.name) {
    //   toast.error(VALIDATION_MESSAGES.NAME.REQUIRED);
    //   return;
    // }
    // // Email Validation
    // if (!formData.email) {
    //   toast.error(VALIDATION_MESSAGES.EMAIL.REQUIRED);
    //   return;
    // }
    // if (!REGEX.EMAIL.test(formData.email)) {
    //   toast.error(VALIDATION_MESSAGES.EMAIL.INVALID);
    //   return;
    // }

    // if (!formData.phone) {
    //   toast.error(VALIDATION_MESSAGES.MOBILE.REQUIRED);
    //   return;
    // }
    // if (!REGEX.MOBILE.test(formData.phone)) {
    //   toast.error(VALIDATION_MESSAGES.MOBILE.INVALID);
    //   return;
    // }
    
    // // Password Validation
    // if (!formData.password) {
    //   toast.error(VALIDATION_MESSAGES.PASSWORD.REQUIRED);
    //   return;
    // }
    // if (!REGEX.PASSWORD.test(formData.password)) {
    //   toast.error(VALIDATION_MESSAGES.PASSWORD.INVALID);
    //   return;
    // }

    // // Confirm Password Validation
    // if (!formData.rePassword) {
    //   toast.error(VALIDATION_MESSAGES.CONFIRM_PASSWORD.REQUIRED);
    //   return;
    // }
    // if (formData.password !== formData.rePassword) {
    //   toast.error(VALIDATION_MESSAGES.CONFIRM_PASSWORD.MISMATCH);
    //   return;
    // }
    // if (formData.password !== formData.rePassword) {
    //   toast.error('Passwords do not match.');
    //   return;
    // }

    const res = await axios.post('/user/signup', {
      formData
    });

    if (res.data) {
      navigate(`/verifyOtp?email=${res?.data?.email}`);
    }
  };

  return (
<div className="flex items-center justify-center bg-white min-h-screen">
      <div className="bg-white p-8 rounded-lg w-[400px] ">
      <h1 className="text-2xl font-semibold font-serif text-center text-customGray">Register</h1>
        <div className=" mt-6 flex justify-center">
          <button
            onClick={handleGoogleClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center">
            <FcGoogle className="w-6 h-6 mr-3" />
            <span className="font-medium">Sign in with Google</span>
          </button>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-400 font-semibold">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2 font-serif">
              Name
            </label>
            <input
             
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGold"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2 font-serif" >
              Email
            </label>
            <input
              
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGold"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2 font-serif" >
              Mobile
            </label>
            <input
         
              id="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGold"
              value={formData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />         
               {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 font-medium mb-2 font-serif" >
              Password
            </label>
            <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGold"
              value={formData.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 font-medium mb-2 font-serif" htmlFor="password">
              Confirm Password
            </label>
            <div className="relative w-full">
            <input
              
              id="repassword"
              className="w-full px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGold"
              value={formData.rePassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, rePassword: e.target.value }))
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center justify-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            </div>
            {errors.rePassword && <p className="text-red-500 text-sm mt-1">{errors.rePassword}</p>}

          </div>
          <div className="items-center">
            <button
              type="submit"
              className="w-full bg-custom-gradient hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-2 fond-serif  "
            >
              SIGNUP
            </button>
            <div className="mt-6 text-center">
              <a href="/login" className="text-md text-gray-600 font-serif hover:text-gray-900">
                Already have an account? Sign In
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Register;