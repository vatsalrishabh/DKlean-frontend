import React from 'react';

const EditModal = ({ name, price, description, discount, onClose, onSave, onNameChange, onPriceChange, onDescriptionChange, onDiscountChange }) => {
  return (
    <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-6 relative">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-semibold"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold text-[#8f1b1b] text-center">Edit Card</h2>

        {/* Edit Form */}
        <div>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </div>

          {/* Price Field */}
          <div className="mb-4">
            <label htmlFor="price" className="text-gray-700">Price</label>
            <input
              type="text"
              id="price"
              className="w-full p-2 border border-gray-300 rounded"
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label htmlFor="description" className="text-gray-700">Description</label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>

          {/* Discount Field */}
          <div className="mb-4">
            <label htmlFor="discount" className="text-gray-700">Discount</label>
            <input
              type="text"
              id="discount"
              className="w-full p-2 border border-gray-300 rounded"
              value={discount}
              onChange={(e) => onDiscountChange(e.target.value)}
            />
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex justify-between">
            <button
              onClick={onSave}
              className="px-6 py-2 bg-[#8f1b1b] text-white rounded-lg hover:bg-[#a22d2d] transition-all duration-300"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
