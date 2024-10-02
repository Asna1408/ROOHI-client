import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-200 text-customGray p-10 sm:p-20">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20">
        
       
        <div>
          <span className="text-xl font-extrabold font-serif">PERFECT BRIDE</span>
          <p className="mt-4 italic font-serif">
            Perfect Day provides a focused approach towards the wedding planning segment.
            With years of experience in the event industry, we stand on a stronger base
            with the most creative, enthusiastic and committed team members, who have
            developed their expertise in the wedding industry.
          </p>
        </div>


        <div className="flex flex-col sm:flex-row justify-between space-y-10 sm:space-y-0 sm:space-x-20 font-serif">
     
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Our Story</a></li>
              <li><a href="#" className="hover:underline">Services</a></li>
            </ul>
          </div>

     
          <div>
            <h3 className="font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" >
                <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
              </a>
              <a href="#" >
                <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
