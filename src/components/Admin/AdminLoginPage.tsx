
import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {REGEX,VALIDATION_MESSAGES} from '../../constant/validation'
import { signInSuccess } from '../../redux/admin/AdminSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosInstance from '../../constant/axiosInstanceAdmin';


const Login: React.FC = () => {

const [email,setEmail] = useState<string>("");
const[password,setPassword] = useState<string>("")
const [showPassword, setShowPassword] = useState(false); 
const [emailError, setEmailError] = useState<string | null>(null);
const [passwordError, setPasswordError] = useState<string | null>(null);
const navigate = useNavigate();
const dispatch = useDispatch();
const { currentAdmin } = useSelector((state: any) => state.admin);


useEffect(()=>{
    if(currentAdmin){
      navigate('/Superadmin/login');
    }
},[])

const validateFields = (): boolean => {
  let isValid = true;

  if (!email) {
    setEmailError(VALIDATION_MESSAGES.EMAIL.REQUIRED);
    isValid = false;
  } else if (!REGEX.EMAIL.test(email)) {
    setEmailError(VALIDATION_MESSAGES.EMAIL.INVALID);
    isValid = false;
  } else {
    setEmailError(null);
  }

  if (!password) {
    setPasswordError(VALIDATION_MESSAGES.PASSWORD.REQUIRED);
    isValid = false;
  } else if (!REGEX.PASSWORD.test(password)) {
    setPasswordError(VALIDATION_MESSAGES.PASSWORD.INVALID);
    isValid = false;
  } else {
    setPasswordError(null);
  }

  return isValid;
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateFields()) {
    return;
  }

  try {
  const res = await axiosInstance.post('/admin/admin_login',{
    email,
    password
  })


  if(res.data == 'Invalid'){
    toast.error("Invalid credential")
    navigate("/Superadmin/login")
    return 
  }
  if(res.data !== 'Invalid'){
    dispatch(signInSuccess(res.data))
    toast.success("Login Successfull")
    navigate("/Superadmin/dashboard");

    
}else{
  toast.error(res.data);
}

} catch (err) {
 console.log(err)   
  }
};

  return (
 <>
 <div className="bg-white py-10 px-4 shadow-lg ">
      <div className="flex justify-between items-center">

        <div className="w-1/3 ">
          <a href="/">
            <span className="text-2xl font-extrabold text-customGray font-serif">PERFECT BRIDE</span>
          </a>
        </div>
      </div>

    </div>
    <div className="flex items-center justify-center pt-10 bg-white">
        <div className="bg-white p-8 rounded-lg w-[400px]">
          <h1 className="text-2xl font-semibold font-serif text-center text-customGray">Login</h1>
          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 font-serif">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGold"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

            </div>

            <div className="mb-6 relative">
              <label className="block text-gray-700 font-medium mb-2 font-serif" htmlFor="password">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGold"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center justify-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

            </div>

            <button
              type="submit"
              className="w-full bg-custom-gradient hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-2 fond-serif  "
            >
              LOGIN
            </button>
          </form>
        </div>
      </div></>

  
  );
};

export default Login;
