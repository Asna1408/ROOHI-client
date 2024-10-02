// src/pages/LoginPage.tsx
import React from 'react';
import Register from "../../components/User/Register"
import Header from '../../components/User/Header';
import Footer from '../../components/User/Footer';

const Registerpage: React.FC = () => {
  return (
    <>
      <Header/>
          <Register />
      <Footer/>
    </>
  );
};

export default Registerpage;
