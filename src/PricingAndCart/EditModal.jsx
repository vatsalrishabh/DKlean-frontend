import React, { useState } from 'react';
import { BaseUrl } from '../Components/BaseUrl';
import axios from 'axios';

// Function to delete the service
const deleteService = async (serviceId, jwt) => {
  try {
    const response = await axios.delete(`${BaseUrl}/api/services/deleteService`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: { serviceId },
    });
    console.log('Service deleted:', response.data);
  } catch (error) {
    console.error('Error deleting service:', error);
  }
};

// Function to update the service
const editService = async (serviceId, updates, jwt) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/api/services/editAllServices`,
      { serviceId, updates },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    console.log('Service updated:', response.data);
  } catch (error) {
    console.error('Error updating service:', error);
  }
};

const EditModal = ({ name, price, description, discount, category, serviceId, onClose, onSave, jwt, onNameChange, onPriceChange, onDescriptionChange, onDiscountChange, onCategoryChange }) => {

  const handleSave = async () => {
    const updates = {
      name,
      price,
      description,
      discount,
      category, // Add category to the updates object
    };
    await editService(serviceId, updates, jwt);
    onSave(); // Close modal after saving
  };

  const handleDelete = async () => {
    await deleteService(serviceId, jwt);
    onClose(); // Close modal after deletion
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-semibold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-[#8f1b1b] text-center">Edit Card</h2>
        <div>
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
          <div className="mb-4">
            <label htmlFor="category" className="text-gray-700">Category</label>
            <select
              id="category"
              className="w-full p-2 border border-gray-300 rounded"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="blood">Blood</option>
              <option value="Physio">Physio</option>
            </select>
          </div>
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
          <div className="mb-4">
            <label htmlFor="description" className="text-gray-700">Description</label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>
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
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#8f1b1b] text-white rounded-lg hover:bg-[#a22d2d] transition-all duration-300"
            >
              Save
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Delete
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
