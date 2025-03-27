import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faBrain, faWheelchair } from '@fortawesome/free-solid-svg-icons';

const HomeSmall = () => {
  const items = [
    { title: 'Diagnose', subtitle: 'Examination & Diagnosis', icon: faStethoscope, size: '3x' },
    { title: 'Treatment', subtitle: 'Treatment of the disease', icon: faBrain, size: '4x' },
    { title: 'Care Healthy', subtitle: 'Care and Recuperation', icon: faWheelchair, size: '5x' },
  ];

  return (
    <div className="Home-Small lg:h-[40vh] flex justify-center items-center w-full mt-5 mb-10">
      <div className="w-4/6 grid lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="fourco flex flex-col items-center space-y-4 text-center bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="icon text-[#8f1b1b]">
              <FontAwesomeIcon icon={item.icon} size={item.size} />
            </div>
            <div className="Heading-Subheading">
              <h1 className="text-xl font-bold">{item.title}</h1>
              <h2 className="text-gray-600">{item.subtitle}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSmall;
