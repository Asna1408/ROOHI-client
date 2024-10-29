import axios from 'axios';
import React from 'react';
import { FaBars, FaSearch, FaCog, FaBell } from 'react-icons/fa';
import { signoutSuccess } from '../../redux/admin/AdminSlice';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Define the props with their appropriate types
interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, toggleSidebar }) => {

  const navigate = useNavigate();
  const  dispatch = useDispatch();
  
  const handleSignout = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("logout")
        try {
          const res = await axios.get('/admin/logout');
          if (res.data.message === 'success') {
            dispatch(signoutSuccess());
            Swal.fire({
              title: 'Logged out!',
              text: 'You have been successfully logged out.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
              navigate('/Superadmin/login');
          }
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong during logout. Please try again.',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
          });
        }
      }
    });
  };

  return (
    <header className={`flex items-center justify-between p-4 shadow transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-4'}`}>
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar}>
          <FaBars className="text-gray-600 text-2xl" />
        </button>
        <FaSearch className="text-gray-600 text-2xl" />
      </div>
      <div className="flex items-center space-x-4">
      <button   className="whitespace-nowrap bg-custom-gradient hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-2 px-4 font-serif"
                            onClick={handleSignout}
                        >LOGOUT
                        </button> 
        <FaCog className="text-gray-600 text-2xl" />
        <FaBell className="text-gray-600 text-2xl" />
      </div>
    </header>
  );
};

export default Navbar;
