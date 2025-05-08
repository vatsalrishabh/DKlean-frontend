import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Heart Icon for Cholesterol
import WaterDropIcon from '@mui/icons-material/WaterDrop'; // Blood Drop Icon
import OpacityIcon from '@mui/icons-material/Opacity'; // CBC Icon
import FilterAltIcon from '@mui/icons-material/FilterAlt'; // Kidney Function Icon
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const iconMap = {
  "CBC": <OpacityIcon sx={{ fontSize: 30, color: "#8f1b1b" }} />,
  "Blood Sugar": <WaterDropIcon sx={{ fontSize: 30, color: "#8f1b1b" }} />,
  "Cholesterol": <FavoriteIcon sx={{ fontSize: 30, color: "#8f1b1b" }} />,
  "Kidney Function": <FilterAltIcon sx={{ fontSize: 30, color: "#8f1b1b" }} />,
};

const Modal = ({ name, price, description, discount, onClose }) => {
  const navigate = useNavigate();
  // Convert description string into an array and trim spaces
  const descriptionArr = description.split(',').map((item) => item.trim());

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div 
        className="modal-content relative bg-white p-6 rounded-xl shadow-2xl w-[450px] space-y-5"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <CancelIcon sx={{ fontSize: 36, color: "#8f1b1b" }} />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold text-[#8f1b1b] text-center mt-2">{name}</h2>

        {/* Divider */}
        <hr className="border-gray-300" />

        {/* Description Section - Display each test separately with icons */}
        <div className="space-y-3">
          {descriptionArr.map((test, index) => (
            <div key={index} className="flex items-center space-x-4 p-2">
              {iconMap[test] || <DescriptionIcon sx={{ fontSize: 30, color: "#8f1b1b" }} />}
              <span className="text-gray-700 text-[15px]">{test}</span>
            </div>
          ))}
        </div>

        {/* Price Section */}
        <div className="flex items-center space-x-4 p-2">
          <PriceCheckIcon sx={{ fontSize: 30, color: "#8f1b1b" }} />
          <span className="text-lg font-semibold text-gray-900">₹{price}</span>
        </div>

        {/* Discount Section (if available) */}
        {discount && (
          <div className="flex items-center space-x-4 p-2">
            <LocalOfferIcon sx={{ fontSize: 30, color: "green" }} />
            <span className="text-md bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {discount} Off
            </span>
          </div>
        )}

        {/* Book Now Button */}
        <button
          className="w-full py-3 bg-[#8f1b1b] text-white font-semibold rounded-lg hover:bg-[#a22d2d] transition-all duration-300 flex items-center justify-center space-x-2"
          onClick={() => navigate("/bookphysio")}
        >
          Book Now
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;
