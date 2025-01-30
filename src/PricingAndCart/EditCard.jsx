import React, { useState } from 'react';
import EditModal from './EditModal'; // Assuming the EditModal is being used for editing purposes

const EditCard = ({ initialName, initialPrice, initialDescription, initialDiscount, initialCategory, onDelete, onUpdate, jwt, serviceId }) => {
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [description, setDescription] = useState(initialDescription);
  const [discount, setDiscount] = useState(initialDiscount);
  const [category, setCategory] = useState(initialCategory); // New state for category
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maxLength = 30; // Maximum length for the description before truncating

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateCard = () => {
    onUpdate({ name, price, description, discount, category }); // Pass the updated card details to the parent
    setIsModalOpen(false);
  };

  return (
    <div className="card bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-6 w-[300px] border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Product Title */}
      <h2 className="text-2xl font-semibold text-[#8f1b1b] text-center">{name}</h2>

      {/* Product Description */}
      <p className="text-gray-600 text-center mb-4">
        {description.length > maxLength ? description.slice(0, maxLength) + '...' : description}
      </p>

      {/* Price Section */}
      <div className="flex items-center space-x-2 justify-center">
        <span className="text-lg font-bold text-[#8f1b1b]">{price}</span>
        {discount && (
          <span className="text-sm text-green-500 bg-green-100 rounded-full px-2 py-1">
            {discount}
          </span>
        )}
      </div>

      {/* Button Section */}
      <div className="flex flex-col items-center space-y-4 mt-4 w-full">
        {/* Read More Button for long descriptions */}
        {description.length > maxLength && (
          <button
            className="text-sm text-[#8f1b1b] hover:underline"
            onClick={handleOpenModal}
          >
            Read More
          </button>
        )}

        {/* Edit Button to open the edit modal */}
        <button
          className="px-6 py-2 bg-[#8f1b1b] text-white rounded-lg hover:bg-[#a22d2d] transition-all duration-300 w-full"
          onClick={handleOpenModal}
        >
          Edit
        </button>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal
          name={name}
          price={price}
          description={description}
          discount={discount}
          category={category}
          onClose={handleCloseModal}
          onSave={handleUpdateCard}
          onNameChange={setName}
          onPriceChange={setPrice}
          onDescriptionChange={setDescription}
          onDiscountChange={setDiscount}
          onCategoryChange={setCategory} // Pass the category change handler
          serviceId={serviceId}
          jwt={jwt}
        />
      )}
    </div>
  );
};

export default EditCard;
