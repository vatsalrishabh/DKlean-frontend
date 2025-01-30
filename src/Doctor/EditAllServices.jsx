import React, { useState } from 'react';
import EditCard from '../PricingAndCart/EditCard';

const EditAllServices = () => {
  // Sample Data
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Web Development',
      price: '$500',
      description: 'Build responsive and dynamic websites.',
      discount: '10%',
    },
    {
      id: 2,
      name: 'App Development',
      price: '$1200',
      description: 'Create powerful mobile applications tailored to your needs.',
      discount: '',
    },
    {
      id: 3,
      name: 'Social Media Marketing',
      price: '$300',
      description: 'Grow your business with targeted social media strategies.',
      discount: '5%',
    },
  ]);

  // Function to handle updates
  const handleUpdateService = (id, updatedData) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, ...updatedData } : service
      )
    );
  };

  // Function to handle deletion
  const handleDeleteService = (id) => {
    setServices((prevServices) => prevServices.filter((service) => service.id !== id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {services.map((service) => (
        <EditCard
          key={service.id}
          initialName={service.name}
          initialPrice={service.price}
          initialDescription={service.description}
          initialDiscount={service.discount}
          onUpdate={(updatedData) => handleUpdateService(service.id, updatedData)}
          onDelete={() => handleDeleteService(service.id)}
        />
      ))}
    </div>
  );
};

export default EditAllServices;
