import React, { useState } from 'react';
import Modal from './Modal'; // Importing the Modal component
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setServiceData }  from "../features/serviceSlice"

const Card = ({ name, price, description, discount, serviceId, category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const maxLength = 30; // Maximum length for the description before truncating
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // console.log(category+"sdfsdfsdf")
  const gotoDates = () => {
    dispatch(setServiceData({ serviceId, name, price }));
    navigate("/patient/dates"); //bring you to the date page 
    // navigate(`${category==="Physio"?"/bookphysio":"/bookbloodtest"}`);
  };
  

  return (
    <div className="card bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-6 w-[300px] border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Product Title */}
      {serviceId && <span>Service ID:- {serviceId}</span>}
      <h2 className="text-2xl font-semibold text-[#8f1b1b] text-center">{name}</h2>
      
      {/* Product Description */}
      <p className="text-gray-600 text-center mb-4">
        {description.length > maxLength ? description.slice(0, maxLength) + '...' : description}
      </p>
      
      {/* Price Section */}
      <div className="flex items-center space-x-2 justify-center">
        <span className="text-lg font-bold text-[#8f1b1b]">₹{price}</span>
        {discount && (
          <span className="text-sm text-green-500 bg-green-100 rounded-full px-2 py-1">
            {discount}
          </span>
        )}
      </div>

      {/* Button Section */}
      <div className="flex flex-col items-center space-y-4 mt-4 w-full">
        <button className="px-6 py-2 bg-[#8f1b1b] text-white rounded-lg hover:bg-[#a22d2d] transition-all duration-300 w-full" onClick={gotoDates}>
          Book Now
        </button>
        {description.length > maxLength && (
          <button
            className="text-sm text-[#8f1b1b] hover:underline"
            onClick={handleOpenModal}
          >
            Read More
          </button>
        )}
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <Modal
          name={name}
          price={price}
          description={description}
          discount={discount}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Card;
