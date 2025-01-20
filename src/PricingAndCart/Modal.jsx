import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

const Modal = ({ name, price, description, discount, onClose }) => {
  return (
    <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-4">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <CancelIcon sx={{fontSize:60, color:"#8f1b1b"}}/>
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold text-[#8f1b1b] text-center">{name}</h2>

        {/* Full Description */}
        <p className="text-gray-600">{description}</p>

        {/* Price Section */}
        <div className="flex items-center space-x-2 justify-center">
          <span className="text-lg font-bold text-[#8f1b1b]">{price}</span>
          {discount && (
            <span className="text-sm text-green-500 bg-green-100 rounded-full px-2 py-1">
              {discount}
            </span>
          )}
        </div>

        {/* Book Now Button */}
        <button
          className="px-6 py-2 bg-[#8f1b1b] text-white rounded-lg hover:bg-[#a22d2d] transition-all duration-300 w-full"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Modal;
