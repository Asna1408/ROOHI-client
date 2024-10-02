// src/pages/LoginPage.tsx
import React from 'react';
import Login from "../../components/User/Login"
import Header from '../../components/User/Header';
import Footer from '../../components/User/Footer';

const Loginpage: React.FC = () => {
  return (
    <>
    <Header />

        <Login />
        
      
    <Footer/>
    </>
  );
};

export default Loginpage;
