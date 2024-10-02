import React from 'react';
import Otp from '../../components/User/Otp';
import Header from '../../components/User/Header'
import Footer from '../../components/User/Footer';



const App: React.FC = () => {
  return (
    <div>
       <Header/>
      <Otp />
      <Footer/>
    </div>
  );
};

export default App;