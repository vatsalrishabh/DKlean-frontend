import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faBrain, faWheelchair } from '@fortawesome/free-solid-svg-icons';
import bigdoctor from "../assets/home/bigdoctor.webp";
import 'animate.css';

const DoctorSlider = () => {
  const card = [
    { icon: faStethoscope, heading: 'Diagnosis', descriptions: 'Examination & Diagnosis' },
    { icon: faBrain, heading: 'Neurology', descriptions: 'Expert neurological care' },
    { icon: faWheelchair, heading: 'Rehabilitation', descriptions: 'Assistance for recovery' },
    { icon: faStethoscope, heading: 'Cardiology', descriptions: 'Heart-related treatment' },
    { icon: faBrain, heading: 'Psychiatry', descriptions: 'Mental health support' },
    { icon: faWheelchair, heading: 'Physiotherapy', descriptions: 'Physical therapy sessions' },
  ];

  return (
    <div className="Doctor-Slider lg:h-[100vh] w-full flex justify-center items-center ">
      <div className="w-full p-10 flex items-center lg:gap-10">
        {/* Left Section */}
        <div className="left lg:w-4/6 sm:w-full space-y-8">
          <div className="the-Heading">
            <div className="text-gray-500 text-sm uppercase tracking-wider">Why Choose DKlean</div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-[#8f1b1b]">The Best</h1>
              <h1 className="text-3xl font-semibold text-gray-800">For Your Health</h1>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6">
            {card.map((item, index) => (
              <div
                key={index}
                className="card flex items-start p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="icon text-[#8f1b1b] mr-4">
                  <FontAwesomeIcon icon={item.icon} size="2x" />
                </div>
                <div className="content space-y-2">
                  <h1 className="text-xl font-semibold text-gray-800">{item.heading}</h1>
                  <h2 className="text-sm text-gray-600">{item.descriptions}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div
          className="right bg-cover bg-center lg:h-[80vh] lg:w-[30vw] rounded-xl  hidden lg:block animate__animated animate__backInRight "
          style={{ backgroundImage: `url(${bigdoctor})` }}
        ></div>
      </div>
    </div>
  );
};

export default DoctorSlider;
