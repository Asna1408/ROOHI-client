import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/User/Header';
import Availabledates from '../../components/User/Availabledates';
import Footer from '../../components/User/Footer';

const Datespage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>(); // Extract serviceId from URL params

  return (
    <div>
      <Header />
      {serviceId ? <Availabledates serviceId={serviceId} /> : <p>No service selected.</p>}
      <Footer />
    </div>
  );
};

export default Datespage;
