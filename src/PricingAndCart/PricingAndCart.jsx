import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../Components/BaseUrl';

const PricingAndCart = () => {
  const [specialityCard, setSpecialityCard] = useState([]); //physio
    const [commonHealthCard, setCommonHealthCard] = useState([]); // blood 
    const [allServices, setAllServices] = useState([]); // all physio and blood
    const [loggedInUser, setLoggedInUser] = useState({});
    const location = useLocation(); // Hook to get current route
  
    // Load user details from local storage
    useEffect(() => {
      const storedUserDetails = localStorage.getItem("userDetails");
      if (storedUserDetails) {
        setLoggedInUser(JSON.parse(storedUserDetails));
      }
    }, []);
  
    // Fetch data from API when JWT is available
    useEffect(() => {
    
      const fetchServices = async () => {
        try {
          const response = await axios.get(`${BaseUrl}/api/services/getAllServices`);
  
          const { data } = response.data;
          setAllServices(data);
          console.log(allServices)
          if (data && data.length > 0) {
            setSpecialityCard(data.filter((service) => service.category === "blood"));
            setCommonHealthCard(data.filter((service) => service.category === "Physio"));
            console.log(specialityCard);
          }
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      };
  
      fetchServices();
    }, [loggedInUser]);
  // Sample card data
  const cards = [
    {
      name: "Basic Health Checkup",
      description: "CBC, Blood Sugar, Cholesterol, Kidney Function",
      price: "399",
      homeCollection: "Yes",
    },
    {
      name: "Full Body Checkup (70+)",
      description: "70+ Tests (CBC, LFT, KFT, Thyroid, Sugar, Liver)",
      price: "999",
      homeCollection: "Yes",
    },
    {
      name: "Diabetes Care Package",
      description: "Sugar Test, HbA1c, Kidney Profile, Thyroid",
      price: "699",
      homeCollection: "Yes",
    },
    {
      name: "Advanced Physiotherapy ",
      description: "Consultation + 3 Therapy Sessions",
      price: "899",
      homeCollection: "Yes",
    },
    {
      name: "Essential Vitamin Checkup",
      description: "Vitamin D, B12, Iron, Calcium, CBC",
      price: "599",
      homeCollection: "Yes",
    },
  ];

console.log(allServices)


  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + 4 < cards.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="Pricing-Cart">
      <div className="heading flex flex-col items-center text-center mb-10">
        <div className="text-gray-500 text-sm uppercase tracking-wider">Pricing List</div>
        <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-2">
          <h1 className="text-[40px] font-bold text-[#8f1b1b]">Our </h1>
          <h1 className="text-[40px] text-gray-800">Packages</h1>
        </div>
      </div>
      <div className="bodyyy flex flex-wrap justify-center gap-6">
        {allServices.slice(startIndex, startIndex + 4).map((card, index) => (
          <Card
            key={index}
            name={card?.name}
            price={card?.price}
            description={card?.description||"description"}
            discount={card?.discount}
            category={card?.category}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-4 mb-4">
        <button 
          onClick={handlePrevious} 
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
          disabled={startIndex === 0}
        >
          Previous
        </button>
        <button 
          onClick={handleNext} 
          className="px-4 py-2 bg-[#8f1b1b] text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          disabled={startIndex + 4 >= cards.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PricingAndCart;
