import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';


const ArtistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate()


  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/user/servicedetails/${id}`); // Update with your API endpoint
        if (!response.ok) {
          throw new Error("Service not found");
        }
        const data = await response.json();
        setService(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);


  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit' as const,
      month: 'short' as const,
      year: 'numeric' as const,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); // Format: 20 Oct 2024
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  

  // Defaulting to empty array if service.images is undefined
  const images = service.images || [];

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 mt-7">
      {/* Left Section: Images */}
      <div className="md:w-1/2">
        <div className="w-full flex justify-center">
          <img
            src={images[0]} // Main product image
            alt={service.service_name}
            className=" w-[436px] h-[436px] object-content" // Set fixed dimensions
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
      </div>

      {/* Right Section: Product Details */}
      <div className="md:w-1/2 space-y-4">
        {/* Service Name */}
        <div className="flex justify-center mb-4">
            <img src="ROOHI-client-main\src\assets\user\category\olive_branch.png" alt="Decorative Design" className="w-16 h-auto" />
          </div>
        <h1 className="text-3xl text-customGray font-bold font-serif">{service.service_name}</h1>

        {/* Price */}
        <div className="text-3xl font-semibold text-customGold font-serif">₹{service.price}</div>

        {/* Service Description */}
        <div className="text-gray-700 font-serif">
          <p>{service.description}</p>
        </div>

        {/* Service Location */}
        <div className="flex items-center gap-2 text-customGray font-serif">
  <FaMapMarkerAlt className="text-xl text-customGold" /> {/* Location icon */}
  <span className="text-customGray"> {service.location}</span>
</div>
        {/* Available Dates */}
        <div className="flex items-center gap-2 text-customGray font-serif">
  <FaCalendarAlt className="text-xl text-customGold" />
  <span className="text-customGray">
    Available on: 
    {service.availability && service.availability.length > 0 
      ? service.availability.map((date: string | number | Date, index: number) => (  // Change the type of index to number
          <span key={index}>
            {formatDate(date)}
            {index < service.availability.length - 1 ? ", " : ""}
          </span>
        ))
      : "No dates available"}
  </span>
</div>


        {/* Return Policy */}
        

        {/* Actions */}
        <div className="flex gap-4 mt-4">
        <button
            className="mt-4 bg-custom-gradient text-white py-2 px-4"
            onClick={() => navigate(`/bookdate/${id}`)} // Navigate to available dates page
          >
            Book Now
          </button>
          <button  className="mt-4 bg-custom-gradient text-white py-2 px-4 ">
             Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
