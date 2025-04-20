import React, { useEffect, useState } from 'react';
import { FaHeart, FaHandsHelping, FaStethoscope, FaDonate } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import "animate.css";

const LeftDonationMot = () => {
  const [loggedInDonor, setLoggedInDonor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDetails = localStorage.getItem('donorDetails');
    if (storedDetails) {
      const parsedDetails = JSON.parse(storedDetails);
      setLoggedInDonor(parsedDetails);
      if (parsedDetails.isloggedIn) {
        navigate("/donorlogin");
      }
    }
  }, []);

  return (
    <div className="bg-custom-graybg lg:p-6 rounded-lg shadow-md w-full">
      <div className='flex justify-between'>
        <h2 className="text-2xl font-semibold text-custom-maroon mb-4 font-cursive">
          How Will Your Donation Help Dklean Health Care Public Charitable Trust (N.G.O.)?
        </h2>
        <div className="text-center animate__animated animate__bounce animate__infinite">
          {
            !loggedInDonor?.isloggedIn && (
              <Link to="/donorlogin">
                <button className="bg-custom-maroon text-white py-2 px-6 rounded-full text-xl font-semibold hover:bg-custom-maroon2 transition">
                  Login and Donate
                </button>
              </Link>
            )
          }
        </div>
      </div>

      <p className="text-lg text-gray-700 mb-4">
        Dklean Health Care Public Charitable Trust (N.G.O.) is dedicated to providing essential physiotherapy and Blood Test / Path Lab Work services to underserved communities. Your donation helps us bring quality healthcare to those who need it the most, ensuring access to proper treatment, early diagnosis, and rehabilitation support.
      </p>

      <h3 className="text-xl font-semibold text-custom-maroon mb-3 font-cursive">
        Why Donate to Dklean Health Care Public Charitable Trust (N.G.O.)?
      </h3>
      <p className="text-lg text-gray-700 mb-4">
        Your contribution supports physiotherapy sessions, essential medical tests, and the procurement of necessary healthcare equipment. By donating, you empower individuals to regain mobility, detect medical conditions early, and improve their overall quality of life.
      </p>

      <h3 className="text-xl font-semibold text-custom-maroon mb-3 font-cursive">
        How Your Donation Helps:
      </h3>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
        <li><FaHandsHelping className="inline mr-2 text-custom-maroon" />Providing physiotherapy treatments for individuals with chronic pain or injury.</li>
        <li><FaStethoscope className="inline mr-2 text-custom-maroon" />Supporting patients who require Blood Test / Path Lab Work for diagnosing critical conditions.</li>
        <li><FaHeart className="inline mr-2 text-custom-maroon" />Ensuring that medical tests and therapies remain accessible to low-income communities.</li>
        <li><FaDonate className="inline mr-2 text-custom-maroon" />Supplying mobility aids and rehabilitation equipment to those in need.</li>
      </ul>

      <h3 className="text-xl font-semibold text-custom-maroon mb-3 font-cursive">
        Your Donation Can Change Lives:
      </h3>
      <p className="text-lg text-gray-700 mb-4">
        Every donation contributes to providing crucial physiotherapy and diagnostic services to individuals who might otherwise struggle to afford them. Whether it’s post-surgery rehabilitation or early disease detection through Blood Test / Path Lab Work, your generosity makes a tangible difference.
      </p>

      <h3 className="text-xl font-semibold text-custom-maroon mb-3 font-cursive">
        Why Donate Online?
      </h3>
      <p className="text-lg text-gray-700 mb-4">
        Online donations are fast, secure, and effective in funding our healthcare initiatives. Your support ensures that we can continue providing essential medical care, treatment, and diagnostic services to those in need. Choose to make a one-time donation or set up recurring contributions to sustain our mission.
      </p>

      {
        !loggedInDonor?.isloggedIn && (
          <div className="text-center mt-6 animate__animated animate__pulse animate__infinite">
            <Link to="/donorlogin">
              <button className="bg-custom-maroon text-white py-2 px-6 rounded-full text-xl font-semibold hover:bg-custom-maroon2 transition">
                Login and Donate
              </button>
            </Link>
          </div>
        )
      }

      <div className="mt-8 text-center text-gray-600">
        <p className="text-sm">
          Every donation helps provide essential physiotherapy and Blood Test / Path Lab Work services to those who need them the most. Donate today and help transform lives.
        </p>
      </div>
    </div>
  );
};

export default LeftDonationMot;
