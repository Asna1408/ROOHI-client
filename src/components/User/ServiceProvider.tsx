
import axios from 'axios';  
import React, { useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';  

interface Service {
  _id: string;
  service_name: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  provider_id: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
  };
}

const ServiceProvider: React.FC = () => {  
  const { providerId } = useParams<{ providerId: string }>();  
  const [services, setServices] = useState<Service[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState("");  
  const [showProfile, setShowProfile] = useState(false);  

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const response = await axios.get(`https://perfect-bride.shop/user/getallpost/${providerId}`);
        console.log("Provider Details:", response.data);
        setServices(response.data.services); 
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchProviderData();
  }, [providerId]);

  const service = services[0]; 

  const handleProfileToggle = () => {  
    setShowProfile(!showProfile);  
  };  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (  
    <div className="h-full bg-white-100 p-5">  
      <div className="max-w-6xl mx-auto bg-white p-5 flex font-serif">  
        {service && service.provider_id && (  
          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">  
            <div className="flex flex-col items-center p-5">  
              <img   
                src={service.images[0]}   
                alt={service.provider_id.name}   
                className="w-32 h-32 rounded-full border-4 border-customGold mb-4"   
              />  
              <h1 className="text-xl font-semibold text-gray-800">{service.provider_id.name}</h1>  
              <div className="flex flex-col w-full mt-4">  
                <ul className="space-y-2">  
                  <li>  
                    <button   
                      className="flex items-center justify-between p-3 text-left text-gray-600 hover:bg-gray-100 rounded-lg"   
                      onClick={() => setShowProfile(false)}  
                    >  
                      <span>📋</span>
                      <span>Services</span>  
                    </button>  
                  </li>  
                  <li>  
                    <button   
                      className="flex items-center justify-between p-3 text-left text-gray-600 hover:bg-gray-100 rounded-lg"   
                      onClick={handleProfileToggle}  
                    >  
                      <span>👤</span>
                      <span>Profile</span>  
                    </button>  
                  </li>  
                </ul>  
              </div>  
            </div>  
          </div>  
        )}
        <div className="flex-1 pl-4">  
          {!showProfile ? (  
            <div className="bg-gray-50 shadow-lg rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">  
                {services.map((service) => (  
                  <div key={service._id} className="bg-gray-50 border border-gray-300 rounded-lg p-4">  
                    <img src={service.images[0]} alt={service.service_name} className="w-full h-40 object-cover rounded-md mb-2"/>  
                    <h2 className="text-xl font-semibold">{service.service_name}</h2>  
                    <p className="text-lg font-medium">₹{service.price.toFixed(2)}</p>  
                    <p className="text-gray-600">{service.provider_id.name}</p>  
                    <button className="mt-2 bg-custom-gradient text-white py-2 px-4 rounded hover:bg-green-600">  
                      Book Now  
                    </button>  
                  </div>  
                ))}  
              </div>  
            </div>
          ) : (  
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <h2 className="text-xl font-semibold">Profile</h2>
              <form>
                <div className="mt-2">
                  <label className="block">Name:</label>
                  <input 
                    type="text" 
                    value={service.provider_id.name} 
                    disabled 
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full bg-gray-100"
                  />
                </div>
                <div className="mt-2">
                  <label className="block">Email:</label>
                  <input 
                    type="email" 
                    value={service.provider_id.email} 
                    disabled 
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full bg-gray-100"
                  />
                </div>
                <div className="mt-2">
                  <label className="block">Mobile:</label>
                  <input 
                    type="tel" 
                    value={service.provider_id.phone} 
                    disabled 
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full bg-gray-100"
                  />
                </div>
                <div className="mt-2">
                  <label className="block">Address:</label>
                  <input 
                    type="text" 
                    value={service.provider_id.location} 
                    disabled 
                    className="mt-1 border border-gray-300 rounded-lg p-2 w-full bg-gray-100"
                  />
                </div>
              </form>
            </div>
          )}  
        </div>  
      </div>  
    </div>  
  );  
};  

export default ServiceProvider;
