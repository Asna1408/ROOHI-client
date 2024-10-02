import React, { useState } from 'react';  
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  
    import { faUser } from '@fortawesome/free-solid-svg-icons';  
    import { faBars } from '@fortawesome/free-solid-svg-icons';  
    import { faTimes } from '@fortawesome/free-solid-svg-icons';  
import { useDispatch,useSelector } from 'react-redux';
import { signoutSuccess } from '../../redux/user/UserSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

    const Header: React.FC = () => {  
        const navigate = useNavigate();
         const  dispatch = useDispatch();

        const [isMenuOpen, setIsMenuOpen] = useState(false);  

        const currentUser = useSelector((state: any) => state.user.currentUser);
       console.log('CurrentUser:',currentUser)

        const toggleMenu = () => {  
            setIsMenuOpen(!isMenuOpen);  
        };  


        const handleSignout = async () => {
          // Show a confirmation alert before logging out
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
              try {
                const res = await axios.get('/user/logout');
        
                if (res.data.message === 'success') {
                  // Dispatch signout action
                  dispatch(signoutSuccess());
        
                  // Show a success alert
                  Swal.fire({
                    title: 'Logged out!',
                    text: 'You have been successfully logged out.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                  });
        
                  // Redirect to login page after successful logout
                  navigate('/login');
                }
              } catch (error) {
                // Show an error alert in case of failure
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
            <header className="bg-white py-10 px-4 shadow-lg">  
                <div className="flex justify-between items-center">  

                    <div className="w-1/3 ">  
                        <a href="/">  
                            <span className="text-2xl font-extrabold text-customGray font-serif">PERFECT BRIDE</span>  
                        </a>  
                    </div>  

                    <div className="flex lg:hidden">  
                        <button onClick={toggleMenu} className="text-xl">  
                            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />  
                        </button>  
                    </div>  

                 
         
                    <div className="hidden lg:flex justify-end items-center space-x-5 ">  
                    <a href="/" className="text-sm font-bold text-customGold font-serif">HOME</a>  
                        <a href="/about" className="text-sm font-bold text-customGold font-serif">ABOUT</a>  
                        <a href="/contact" className="text-sm font-bold text-customGold font-serif">CONTACT</a>  
                        <a href="/services" className="text-sm font-bold text-customGold font-serif">SHOP</a> 

                        
                        
                        {currentUser ? (
                      <>
                        <a href="/profile" className="flex items-center space-x-2">  
                          <FontAwesomeIcon icon={faUser} className="h-3 w-3 text-customGold" />
                          <span className="text-sm font-bold text-customGold font-serif">{currentUser.name}</span>
                        </a> 
                        <button   className="whitespace-nowrap bg-custom-gradient hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-2 px-4 font-serif"
                            onClick={handleSignout}
                        >LOGOUT
                        </button>       
                        </>
                      ) : (
                        <>
                        <button
                         className="whitespace-nowrap bg-custom-gradient hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-2 px-4 font-serif"
                            onClick={() => navigate('/login')}
                        >
                           LOGIN
                        </button>
                        <button
                            className="whitespace-nowrap bg-custom-gradient hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-2 px-4 font-serif"
                            onClick={() => navigate('/register')}
                        >
                           SIGN UP
                        </button>
                        </>

                        
                      )}
                      
                        </div>  
                   
                </div>  
          
                {/* Responsive Menu */}  
                {isMenuOpen && (  
                    <div className="block lg:hidden mt-4">  
                        <div className="flex flex-col space-y-2">  
                            <a href="/" className="text-xl font-bold text-customGold">HOME</a>  
                            <a href="/about" className="text-xl font-bold text-customGold">ABOUT</a>  
                            <a href="/contact" className="text-xl font-bold text-customGold">CONTACT</a>  
                            <a href="/shop" className="text-xl font-bold text-customGold">SHOP</a>  
                            {currentUser ? (
                      <>
                        <a href="/profile">  
                            <FontAwesomeIcon icon={faUser} className="h-3 w-3 text-customGold" />{currentUser}
                        </a>  
                        <button className="text-xl font-bold text-customGold font-serif" onClick={handleSignout}>LOGOUT</button>  
                        </>
                      ) : (
                        <>
                        <a href="/login" className="text-xl font-bold text-customGold font-serif">LOGIN</a>  
                        <a href="/register" className="text-xl font-bold text-customGold font-serif">SIGN UP</a>  
                        </>
                      )}
                        </div>  
                    </div>  
                )}  
            </header>  
        );  
    };  

    export default Header;  
