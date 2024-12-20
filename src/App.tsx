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
import BookeddetailsServicePage from "./pages/User/BookeddetailsServicePage";
import ChatAppPage from "./pages/User/ChatAppPage";
import ServiceProviderPage from "./pages/User/ServiceProviderPage";
import Banner from "./pages/Admin/Banner";
import AddBannerForm from "./pages/Admin/AddBannerForm";
import EditBannerPage from "./pages/Admin/EditBannerPage";
import AdminPayout from "./pages/Admin/AdminPAYOUT";
import EditProfilePage from "./pages/User/EditProfilePage";
import ProtectUser from "./components/User/ProtectUser";

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
                <Route path='/artist/:id' element={<Artist />} />
                <Route path="/provider/:providerId" element={<ServiceProviderPage />} />


            <Route element={<ProtectUser />}>
                <Route path='/profile' element={<Profilepage />} />
                <Route path="/editProfile/:userId" element={<EditProfilePage />} />
                <Route path='/post' element={<PostTablepage />} />
                <Route path='/addpost' element={<PostPage />} />
                <Route path='/editpost/:postId' element={<EditPostPage />} />
                <Route path='/bookdate/:serviceId' element={<Datespage />} />
                <Route path='/bookingform' element={<Booking />} />
                <Route path='/booking/success' element={<Successbookpage />} />
                <Route path='/bookingdetailsByUser' element={<BookingByUserPage />} />
                <Route path='/bookingdetailsByProvider' element={<BookingByServicePage />} />
                <Route path='/bookingdetail/:BookingId' element={<Bookeddetailpage />} />
                <Route path='/bookingRequestdetail/:BookingId' element={<BookeddetailsServicePage />} />
                <Route path='/chat' element={<ChatAppPage />} />
            </Route>

                //admin routes
                <Route path="/superadmin/login" element={<AdminLogin />} />
                <Route element={<AdminPrivateRoute />}>
                   <Route path="/superadmin/dashboard" element={<AdminDashboard />} />
                   <Route path="/superadmin/UserList" element={<AdminUser />} />
                   <Route path="/superadmin/ServiceList" element={<AdminService/>} />
                   <Route path="/superadmin/AddServiceCategory" element={<AddServiceCategory/>} />
                   <Route path="/superadmin/EditServiceCategory/:id" element={<EditServiceCategory />} />
                   <Route path="/superadmin/BookingList" element={<AdminBooking />} />
                   <Route path="/superadmin/BookingList/:bookingId" element={<Adminbookingsingle />} />
                   <Route path="/superadmin/banner" element={<Banner />} />
                   <Route path="/superadmin/banner/AddBanner" element={<AddBannerForm />} />
                   <Route path='/superadmin/banner/:BannerId' element={<EditBannerPage />} />
                   <Route path='/superadmin/Payout' element={<AdminPayout/>} />
                </Route>
          </Routes>
    </Router>
    </>
  );
}

export default App;





