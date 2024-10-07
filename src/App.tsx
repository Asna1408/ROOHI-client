import "./index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Homepage from "./pages/User/Homepage";
import Registerpage from "./pages/User/Registerpage";
import Loginpage from "./pages/User/Loginpage";
import Otppage from "./pages/User/Otppage";
import Forgetpage from "./pages/User/Forgetpage";
import Resetpage from "./pages/User/Resetpage";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUser from "./pages/Admin/AdminUser";
import AdminService from "./pages/Admin/AdminService";
import Servicepage from "./pages/User/Servicepage";
import Artist from "./pages/User/Artist";
import Booking from "./pages/User/Booking";
import Profilepage from "./pages/User/Profilepage";
import PostPage from "./pages/User/PostPage";
import AddServiceCategory from "./pages/Admin/AddServiceCategory";
import EditServiceCategory from "./pages/Admin/EditServiceCategory";
import AdminPrivateRoute from "./components/Admin/AdminPrivateRoute";
import PostTablepage from "./pages/User/PostTablepage";
import EditPostPage from "./pages/User/EditPostPage";




const App = () => {
  return (
    <>
    <ToastContainer />
    <Router>
    <Routes>
                //user routes
                <Route path='/' element={<Homepage />} />
                <Route path='/register' element={<Registerpage />} />
                <Route path='/login' element={<Loginpage />} />
                <Route path='/verifyOtp' element={<Otppage />} />
                <Route path='/forget_password' element={<Forgetpage />} />
                <Route path='/reset_password' element={<Resetpage />} />
                <Route path='/services' element={<Servicepage />} />
                <Route path='/profile' element={<Profilepage />} />
                <Route path='/artist' element={<Artist />} />
                <Route path='/booknow' element={<Booking />} />
                <Route path='/post' element={<PostTablepage />} />
                <Route path='/addpost' element={<PostPage />} />
                <Route path='/editpost/:postId' element={<EditPostPage />} />
             
             
              
                

                //admin routes
                <Route path="/Superadmin/login" element={<AdminLogin />} />
               
                <Route path="/Superadmin/dashboard" element={<AdminDashboard />} />
                <Route path="/Superadmin/UserList" element={<AdminUser />} />
                <Route path="/Superadmin/ServiceList" element={<AdminService/>} />
                <Route path="/Superadmin/AddServiceCategory" element={<AddServiceCategory/>} />
                <Route path="/Superadmin/EditServiceCategory/:id" element={<EditServiceCategory />} />
                
            </Routes>
    </Router>
    </>
  );
}

export default App;





