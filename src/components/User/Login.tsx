
import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from "../../firebase/firebase";
import {REGEX,VALIDATION_MESSAGES} from '../../constant/validation'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInSuccess } from "../../redux/user/UserSlice";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';



const Login: React.FC = () => {

const [email,setEmail] = useState<string>("");
const[password,setPassword] = useState<string>("")
const [showPassword, setShowPassword] = useState(false); 
const navigate = useNavigate();
const dispatch = useDispatch();
const { currentUser } = useSelector((state: any) => state.user);
console.log(currentUser,"Google user rrrrrrrrrrrrrrrrrr")


useEffect(()=>{
    if(currentUser){
      navigate('/');
    }
},[])



//new
// const handleGoogleClick = async () => {
//   try {
//     const provider = new GoogleAuthProvider();
//     provider.setCustomParameters({ prompt: "select_account" });

//     const resultsFromGoogle = await signInWithPopup(auth, provider);
//     const { displayName, email } = resultsFromGoogle.user;

//     // Send the name and email to the backend
//     const response = await axios.post("/user/googleAuth", {
//       name: displayName,
//       email: email,
//     });

//     const data = response.data;
//     console.log(data, "userdataaaaaaaaaaaa");

//     if (response.status === 200) {
//       if (data.alreadyRegistered) {
//         const { _id, name, email, phone } = data.existingUser;
//         console.log(name, "username");
//         toast.success("User successfully logged in!");

//         // Dispatch user data to the Redux store
//         dispatch(signInSuccess({ _id, name, email, phone }));

//         navigate("/");
//       } else {
//         toast.success("Account created successfully with Google!");
//         dispatch(signInSuccess(data)); // Dispatch the entire new user object
//         navigate("/");
//       }
//     } else {
//       toast.error("An error occurred during login.");
//     }
//   } catch (error) {
//     toast.error("An error occurred during Google authentication.");
//     console.log(error);
//   }
// };


const handleGoogleClick = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const resultsFromGoogle = await signInWithPopup(auth, provider);
    const { displayName, email } = resultsFromGoogle.user;

    const response = await axios.post("/user/googleAuth", {
      name: displayName,
      email: email,
    });

    const data = response.data;
    console.log(data, "userdataaaaaaaaaaaa");

    if (response.status === 200) {
      if (data.alreadyRegistered && data.existingUser.isBlocked) {
        toast.error("Your account is blocked. Please contact support.");
        navigate("/login"); 
        return; 
      }

      if (data.alreadyRegistered) {
        const { _id, name, email, phone } = data.existingUser;
        console.log(name, "username");
        toast.success("User successfully logged in!");
        dispatch(signInSuccess({ _id, name, email, phone }));
        navigate("/"); 
      } else {
        toast.success("Account created successfully with Google!");
        dispatch(signInSuccess(data)); 
        navigate("/"); 
      }
    } else {
      toast.error("An error occurred during login.");
    }
  } catch (error) {
    toast.error("An error occurred during Google authentication.");
    console.error(error);
  }
};


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

  if (!password) {
    toast.error(VALIDATION_MESSAGES.PASSWORD.REQUIRED);
    return;
  }
  if (!REGEX.PASSWORD.test(password)) {
    toast.error(VALIDATION_MESSAGES.PASSWORD.INVALID);
    return;
  }

  try {
  const res = await axios.post('/user/login',{
    email,
    password
  })

  if(res.data == 'Your Account is Blocked'){
    toast.error("Your Account has been Blocked")
    navigate("/login")
    return
  }

  if(res.data == 'Account not verified. Please verify your account before logging in.'){
    toast.error("User is not verified")
    navigate("/login")
    return 
  }
  if(res.data !== 'Invalid credential'){
    dispatch(signInSuccess(res.data))
    toast.success("Login Successfull")
    navigate("/");

    
}else{
  toast.error(res.data);
}

} catch (err) {
 console.log(err) 
   
}
  
};

  return (
    
<div className="flex  items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg w-[400px]">
      <h1 className="text-2xl font-semibold font-serif text-center text-customGray">Login</h1>
        <div className=" mt-6 flex justify-center">
    <button
      onClick={handleGoogleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center">
      <FcGoogle className="w-6 h-6 mr-3" />
      <span className="font-medium">Sign in with Google</span>
    </button>
  </div>

        {/* Separator */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-400 font-semibold">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2 font-serif" >
              Email
            </label>
            <input
             
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGold"
              value ={email}
              onChange={(e)=>setEmail(e.target.value)}
            
            />
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
              value ={password}
              onChange={(e)=>setPassword(e.target.value)}
            
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

          <button
            type="submit"
            className="w-full bg-custom-gradient hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-2 fond-serif  "
          >
            LOGIN
          </button>
          <div className="mt-6 text-center">
          <Link to="/forget_password" className="text-md text-gray-600 font-serif hover:text-gray-900">
          Forget Password?
          </Link>
        </div>
          
        </form>
      </div>
    </div>

  
  );
};

export default Login;
