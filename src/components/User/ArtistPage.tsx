import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const ArtistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [rating, setRating] = useState<number>(0); // State for rating
  const [review, setReview] = useState<string>(""); 
  const [submitError, setSubmitError] = useState<string>(""); 
  const [reviews, setReviews] = useState<any[]>([]);
  const navigate = useNavigate()
  const { currentUser } = useSelector((state: any) => state.user);



  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/user/servicedetails/${id}`); 
        if (!response.ok) {
          throw new Error("Service not found");
        }
        const data = await response.json();
        setService(data);
      } catch (err) {
        if (err instanceof Error) {
         console.log(err)
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };


    const fetchReviews = async () => {
      try {
        const response = await fetch(`/user/service/${id}/reviews`); // Fetch reviews for the service
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data); // Update state with reviews
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchService();
    fetchReviews();
  }, [id]);

  

  const handleSubmitReview = async () => {
    if (rating === 0 || review.trim() === "") {
      toast.error("Please provide a rating and review.");
      return;
    }

    try {
      const response = await fetch('/user/review/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id:currentUser._id,
          service_id: id, // assuming the service ID is needed for the review
          rating,
          review,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      // Clear the form after successful submission
      setRating(0);
      setReview("");
      setSubmitError("");
      toast.success("Review submitted successfully!");
    } catch (err) {
      if (err instanceof Error) {
       
      } else {
        setSubmitError("An unknown error occurred");
      }
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

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 mt-7">
      {/* Left Section: Images */}
      <div className="md:w-1/2">
        <div className="w-full flex justify-center">
          <img
            src={images[0]} // Main product image
            alt={service.service_name}
            className=" w-[436px] h-[436px] object-content"
          />
        </div>

        {/* Thumbnails */}
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
{/* Reviews Section */}
<div className="mt-6">
          <h2 className="font-bold text-lg font-serif text-customGray">Reviews</h2>
          <div className="space-y-4">
            {reviews && reviews.length > 0 ? (
             reviews.map((review: any, index: number) => (
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
          {/* Review & Rating Section */}
          
        </div>
      </div>






      {/* Right Section: Product Details */}
      <div className="md:w-1/2 space-y-4">
      
        <div className="flex justify-center mb-4">
            <img src="ROOHI-client-main\src\assets\user\category\olive_branch.png" alt="Decorative Design" className="w-16 h-auto" />
          </div>
        <h1 className="text-3xl text-customGray font-bold font-serif">{service.service_name}</h1>

      
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
          <button  className="mt-4 bg-custom-gradient text-white py-2 px-4 ">
             Send Message
          </button>
        </div>
        <div className="mt-5">
            <h2 className="font-bold text-lg mt-20 pt-20 pb-5 font-serif text-customGray">Review & Rating</h2>
            <div className="bg-gray-100 p-4 rounded">
              <div className="flex items-center space-x-2">
                {/* Stars for rating */}
                {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`cursor-pointer ${
                    i < rating ? "text-customGold" : "text-gray-400"
                  }`}
                  onClick={() => setRating(i + 1)}
                >
                  ★
                </span>
              ))}
              </div>
              <textarea
              placeholder="Share your experience about us"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="mt-4 w-full p-2 bg-white border rounded"
            />
            {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
            <button
              className="mt-4 bg-custom-gradient text-white py-2 px-4"
              onClick={handleSubmitReview}
            >
              Submit
            </button>
            </div>
          </div>
      </div>
       

      
    </div>
  );
};

export default ArtistPage;
