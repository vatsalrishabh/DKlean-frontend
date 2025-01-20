import React from 'react';
import Card from './Card';

const PricingAndCart = () => {
  // Sample card data
  const cards = [
    {
      serviceId: 1,
      name: "Basic Health Care",
      price: "₹99",
      description: "Provides essential health services.",
      discount: "10% off",
    },
    {
      serviceId: 2,
      name: "Premium Health Care",
      price: "₹199",
      description: "Comprehensive health care services with additional benefits.",
      discount: "15% off",
    },
    {
      serviceId: 3,
      name: "Family Health Care",
      price: "₹299",
      description: "Health care services for the entire family.",
      discount: "20% off",
    },
  ];

  return (
    <div className="Pricing-Cart">
      <div className="heading flex flex-col items-center text-center mb-10">
        <div className="text-gray-500 text-sm uppercase tracking-wider">Pricing List</div>
        <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-2">
          <h1 className="text-[40px] font-bold text-[#8f1b1b]">Protect </h1>
          <h1 className="text-[40px] text-gray-800">With Health Care Card</h1>
        </div>
      </div>
      <div className="bodyyy flex flex-wrap justify-center gap-6">
        {cards.map((card) => (
          <Card
            key={card.serviceId}
            name={card.name}
            price={card.price}
            description={card.description}
            discount={card.discount}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingAndCart;
