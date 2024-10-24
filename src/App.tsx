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
import Datespage from "./pages/User/Datespage";
import Successbookpage from "./pages/User/Successbookpage";
import BookingByUserPage from "./pages/User/BookingByUserPgae";
import BookingByServicePage from "./pages/User/BookingByServicePage";
import Bookeddetailpage from "./pages/User/Bookeddetailpage";
import AdminBooking from "./pages/Admin/AdminBooking";
import Adminbookingsingle from "./pages/Admin/Adminbookingsingle";




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
                <Route path='/artist/:id' element={<Artist />} />
                <Route path='/post' element={<PostTablepage />} />
                <Route path='/addpost' element={<PostPage />} />
                <Route path='/editpost/:postId' element={<EditPostPage />} />
                <Route path='/bookdate/:serviceId' element={<Datespage />} />
                <Route path='/bookingform' element={<Booking />} />
                <Route path='/booking/success' element={<Successbookpage />} />
                <Route path='/bookingdetailsByUser' element={<BookingByUserPage />} />
                <Route path='/bookingdetailsByProvider' element={<BookingByServicePage />} />
                <Route path='/bookingdetail/:BookingId' element={<Bookeddetailpage />} />
                

                

             
             
              
                

                //admin routes
                <Route path="/Superadmin/login" element={<AdminLogin />} />
               
                <Route path="/Superadmin/dashboard" element={<AdminDashboard />} />
                <Route path="/Superadmin/UserList" element={<AdminUser />} />
                <Route path="/Superadmin/ServiceList" element={<AdminService/>} />
                <Route path="/Superadmin/AddServiceCategory" element={<AddServiceCategory/>} />
                <Route path="/Superadmin/EditServiceCategory/:id" element={<EditServiceCategory />} />
                <Route path="/Superadmin/BookingList" element={<AdminBooking />} />
                <Route path="/Superadmin/BookingList/:bookingId" element={<Adminbookingsingle />} />
                
            </Routes>
    </Router>
    </>
  );
}

export default App;





