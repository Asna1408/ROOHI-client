import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import oliveBranch from '../../assets/user/category/olive_branch.png'
import axios from "axios";
import axiosInstance from "../../constant/axiosInstance";


const ArtistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [, setBookingStatus] = useState<string | null>(null); // State for booking status

  const navigate = useNavigate()
  const { currentUser } = useSelector((state: any) => state.user);




  useEffect(() => {


    const fetchService = async () => {
      try {
        const response = await axios.get(`https://perfect-bride.shop/user/servicedetails/${id}`);
        setService(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message || 'Service not found');
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };


    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://perfect-bride.shop/user/service/${id}/reviews`);
        setReviews(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message || 'Failed to fetch reviews');
        } else {
          setError('An unknown error occurred');
        }
      }
    };


    const fetchBookingStatus = async () => {
      try {
        const response = await axiosInstance.get(`https://perfect-bride.shop/user/booking/${currentUser._id}/${id}/status`);
        console.log(response.data, 'booking status');
        setBookingStatus(response.data.bookingStatus?.status || null);
      } catch (err) {
        console.error('Error fetching booking date', err);
      }
    };

    fetchService();
    fetchReviews();
    fetchBookingStatus();
  }, [id,currentUser]);

  const handleCreateConversation = async () => {
    if (!currentUser) {
      toast.error("Please sign in to start a conversation.");
      return;
    }
  
    try {
      const response = await fetch('https://perfect-bride.shop/user/create-conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: currentUser._id,
          receiverId: service.provider_id, 
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to start conversation");
      }
  
      const data = await response.json();
      console.log("conversationId", data._id);
  
      if (data._id) {
        navigate(`/chat?conId=${data._id}&providerId=${service.provider_id._id}&providerName=${service.provider_id.name}`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };
  
 
  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit' as const,
      month: 'short' as const,
      year: 'numeric' as const,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); 
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  
  const images = service.images || [];

  // const canShowReviewSection = bookingDate && new Date(bookingDate) <= new Date();

  return (
    <>
    <div className="flex flex-col md:flex-row gap-8 p-6 mt-7">
      <div className="md:w-1/2">
        <div className="w-full flex justify-center">
          <img
            src={images[0]} 
            alt={service.service_name}
            className=" w-[436px] h-[436px] object-content"
          />
        </div>
        <div className="flex gap-2 mt-4 justify-center">
          {images.map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-1/5 h-20 object-cover  cursor-pointer  ${
                images[0] === img ? "border-2 border-customGold" : ""
              }`}
              onClick={() => setService({ ...service, images: [img, ...images.filter((_: any, i: number) => i !== index)] })}
            />
          ))}
        </div>
      </div>

      {/* Right Section: Product Details */}
      <div className="md:w-1/2 space-y-4">
      
        <div className="flex justify-center mb-4">
            <img src={oliveBranch} alt="Decorative Design" className="w-16 h-auto" />
          </div>
        <h1 className="text-3xl text-customGray font-bold font-serif">{service.service_name}</h1>
        {service.provider_id && (
          <a 
            href={`/provider/${service.provider_id._id}`} 
            className="text-3xl text-customGray font-bold font-serif"
          >
            {service.provider_id.name}
          </a>
        )}
        <div className="text-3xl font-semibold text-customGold font-serif">₹{service.price}</div>
        <div className="text-gray-700 font-serif">
          <p>{service.description}</p>
        </div>
        <div className="flex items-center gap-2 text-customGray font-serif">
  <FaMapMarkerAlt className="text-xl text-customGold" /> 
  <span className="text-customGray"> {service.location}</span>
</div>
        <div className="flex items-center gap-2 text-customGray font-serif">
  <FaCalendarAlt className="text-xl text-customGold" />
  <span className="text-customGray">
    Available on: 
    {service.availability && service.availability.length > 0 
      ? service.availability.map((date: string | number | Date, index: number) => (  
          <span key={index}>
            {formatDate(date)}
            {index < service.availability.length - 1 ? ", " : ""}
          </span>
        ))
      : "No dates available"}  
  </span>        
</div>
      <div className="flex gap-4 mt-4">
        <button
            className="mt-4 bg-custom-gradient text-white py-2 px-4"
            onClick={() => navigate(`/bookdate/${id}`)} 
          >
            Book Now
          </button>
          <button  className="mt-4 bg-custom-gradient text-white py-2 px-4 "
          onClick={handleCreateConversation}>
             Send Message
          </button>
        </div>
      </div>
    </div>
    <div className="p-6 bg-white rounded-lg shadow-md">

{/* Reviews Section */}
<div className="mt-6">
  <h2 className="font-bold text-lg font-serif text-customGray">Reviews</h2>
  <div className="space-y-4">
    {reviews && reviews.length > 0 ? (
      reviews.map((review, index) => (
        <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded">
          <div>
            <p className="font-semibold">{review.user_id.name}</p>
            <p className="text-gray-600">{review.review}</p>
          </div>
          <div className="flex items-center">
            <p className="font-semibold text-customGold mr-2">{review.rating}</p>
            <span className="text-customGold">★</span>
          </div>
        </div>
      ))
    ) : (
      <p>No reviews yet.</p>
    )}
  </div>
</div>
</div>

     </>
  );
};

export default ArtistPage;
