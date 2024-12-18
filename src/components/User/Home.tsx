import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUsers, faReceipt, faDriversLicense } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from "axios";

interface Banner {
  _id: number;
  title: string;
  description: string;
  images: string[];
}


const Home: React.FC = () => {

  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('/user/home-banners'); 
        setBanners(response.data); 
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
  
    fetchBanners();
  }, []);
  

  return (
    <div>
      <main>
      <section>
      <Carousel
    showThumbs={false}
    infiniteLoop={true}
    autoPlay={true}
    interval={5000}
    stopOnHover={true}
    showStatus={false}
    showIndicators={true}
  >
    {banners.length > 0 ? (
      // Wrap the mapped content in an array
      banners.map((banner) => (
        <div
          key={banner._id}
          className="bg-cover bg-center py-40"
          style={{ backgroundImage: `url(${banner.images[0]})` }}
        >
          <div className="container mx-20 text-left">
            <p className="text-2xl py-2 italic font-serif mb-4">{banner.title}</p>
            <h1 className="text-7xl font-semibold text-customGray font-serif mb-4 ">
              {banner.description}
            </h1>
            <button className="border-2 border-customGold mt-4 text-customGray px-6 py-3 bg-transparent">
              Contact Us
            </button>
          </div>
        </div>
      ))
    ) : (
      
      [
        <div key="fallback" className="text-center text-2xl text-customGray">
          <p>No banners available at the moment.</p>
        </div>,
      ]
    )}
  </Carousel>
        </section>
        <section className="container mx-auto px-4 py-10">
          <div className="flex justify-center mb-4">
            <img 
            // src="src/assets/user/category/olive_branch.png" 
            src="./public/olive_branch.png" 

            alt="Decorative Design" className="w-16 h-auto" />
          </div>
          <h2 className="text-5xl font-bold mb-20 mt-10 text-center font-serif text-customGray">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <img
                src="./public/mehendi.jpg"
                alt="Planning Binders"
                className="w-full h-[575px] object-cover mb-4 opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
              <h3 className="text-lg font-semibold text-customGray font-serif">BRIDAL MEHENDI</h3>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="./public/makeup.jpg"
                alt="Wicked Bride Planner"
                className="w-full h-[575px] object-cover mb-4 opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
              <h3 className="text-lg font-semibold text-customGray font-serif">BRIDAL MAKEUP</h3>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="./public/bridal.jpg"
                alt="Mini Planner"
                className="w-full h-[575px]  mb-4 opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
              <h3 className="text-lg font-semibold text-customGray font-serif">BRIDAL WEAR</h3>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-16 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-4">
              <img
                src="./public/olive_branch.png"
                alt="Decorative Design"
                className="w-12 sm:w-16 h-auto"
              />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-10 sm:mb-20 mt-6 sm:mt-10 text-center font-serif text-customGray">
              Our Advantages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="advantage-item text-center p-6 bg-white shadow-lg rounded-lg">
                <div className="icon-wrapper mb-4">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-customGold mx-auto w-12 h-12 sm:w-16 sm:h-16"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 font-serif text-customGray">
                  Save Time
                </h3>
                <div className="underline mx-auto mb-4 w-8 sm:w-10 h-1 bg-customGold"></div>
                <p className="text-customGray font-serif italic">
                  The services provided by our wedding planners can save you a lot of time.
                </p>
              </div>
              <div className="advantage-item text-center p-6 bg-white shadow-lg rounded-lg">
                <div className="icon-wrapper mb-4">
                  <FontAwesomeIcon
                    icon={faDriversLicense}
                    className="text-customGold mx-auto w-12 h-12 sm:w-16 sm:h-16"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 font-serif text-customGray">
                  Professional Approach
                </h3>
                <div className="underline mx-auto mb-4 w-8 sm:w-10 h-1 bg-customGold"></div>
                <p className="text-customGray font-serif italic">
                  We will thoroughly plan every element of your wedding.
                </p>
              </div>
              <div className="advantage-item text-center p-6 bg-white shadow-lg rounded-lg">
                <div className="icon-wrapper mb-4">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="text-customGold mx-auto w-12 h-12 sm:w-16 sm:h-16"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 font-serif text-customGray">
                  Team of Wedding Experts
                </h3>
                <div className="underline mx-auto mb-4 w-8 sm:w-10 h-1 bg-customGold"></div>
                <p className="text-customGray font-serif italic">
                  Perfect Day employs the best wedding experts in Los Angeles.
                </p>
              </div>
              <div className="advantage-item text-center p-6 bg-white shadow-lg rounded-lg">
                <div className="icon-wrapper mb-4">
                  <FontAwesomeIcon
                    icon={faReceipt}
                    className="text-customGold mx-auto w-12 h-12 sm:w-16 sm:h-16"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 font-serif text-customGray">
                  Acceptable Prices
                </h3>
                <div className="underline mx-auto mb-4 w-8 sm:w-10 h-1 bg-customGold"></div>
                <p className="text-customGray font-serif italic">
                  Our clients value our affordable pricing policy and great service.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4">

            <div className="flex justify-center mb-10 mt-10">
              <img
                src="./public/olive_branch.png"
                alt="Decorative Design"
                className="w-12 sm:w-16 h-auto"
              />
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold mb-10 mt-10 text-center font-serif text-customGray">
              Featured Sellers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16 sm:mt-24 mb-16 sm:mb-32 justify-items-center">
              <img
                src="./public/mehdi.jpeg"
                alt="Partner 1"
                className="h-32 sm:h-48 w-full sm:w-auto object-cover"
              />

              <img
                src="./public/le paris.png"
                alt="Partner 2"
                className="h-32 sm:h-48 w-full sm:w-auto object-cover"
              />

              <img
                src="./public/kulz.png"
                alt="Partner 3"
                className="h-32 sm:h-48 w-full sm:w-auto object-cover"
              />
            </div>
          </div>
        </section>

        <section className="relative bg-cover bg-center py-32" style={{ backgroundImage: "url('./public/banner2.jpg')" }}>
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <div className="container mx-auto text-center relative z-10">
            <div className="flex justify-center mb-4">
              <img src="./public/olive_branch.png" alt="Decorative Icon" className="w-16 h-auto" />
            </div>
            <h2 className="text-5xl font-bold mb-10 mt-4 text-center font-serif text-customGray">Newsletter</h2>
            <p className="text-gray-600 italic font-serif mb-8">
              Sign up to our newsletter and be the first to know about the latest news and wedding planning tips.
            </p>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-4 w-1/2 max-w-md text-gray-700 focus:outline-none"
              />
              <button className="px-8 py-4 bg-customGold text-white font-semibold rounded-r-lg">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

