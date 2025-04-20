import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faBrain, faWheelchair } from '@fortawesome/free-solid-svg-icons';
import bigdoctor from "../assets/home/bigdoctor.webp";
import { Link } from 'react-router-dom';
import 'animate.css';

const DoctorSlider = () => {
  const card = [
    { icon: faStethoscope, heading: "Diagnosis", descriptions: "Examination & Diagnosis", link: "/diagnosis" },
    { icon: faBrain, heading: "Neurology", descriptions: "Expert neurological care", link: "/neurology" },
    { icon: faWheelchair, heading: "Rehabilitation", descriptions: "Assistance for recovery", link: "/rehabilitation" },
    { icon: faStethoscope, heading: "Cardiology", descriptions: "Heart-related treatment", link: "/cardiology" },
    { icon: faBrain, heading: "Psychiatry", descriptions: "Mental health support", link: "/psychiatry" },
    { icon: faWheelchair, heading: "Physiotherapy", descriptions: "Physical therapy sessions", link: "/physiotherapy" }
  ];

  return (
    <div className="Doctor-Slider lg:h-[100vh] w-full flex justify-center items-center">
      <div className="w-full p-10 flex items-center lg:gap-10">
        {/* Left Section */}
        <div className="left lg:w-4/6 sm:w-full space-y-8">
          <div className="the-Heading">
            <div className="text-gray-500 text-sm uppercase tracking-wider">Why Choose Dklean Health Care Public Charitable Trust (N.G.O.)</div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-[#8f1b1b]">The Best</h1>
              <h1 className="text-3xl font-semibold text-gray-800">For Your Health</h1>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6">
            {card.map((item, index) => (
              <Link to={item.link} key={index}>
                <div
                  className="group card flex items-start p-6 bg-blue-200 hover:bg-[#7a1616] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="icon text-[#8f1b1b] group-hover:text-white mr-4">
                    <FontAwesomeIcon icon={item.icon} size="2x" />
                  </div>
                  <div className="content space-y-2">
                    <h1 className="text-xl font-semibold text-gray-900 group-hover:text-white">{item.heading}</h1>
                    <h2 className="text-sm text-gray-700 group-hover:text-white">{item.descriptions}</h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div
          className="right bg-cover bg-center lg:h-[80vh] lg:w-[30vw] rounded-xl hidden lg:block animate__animated animate__backInRight"
          style={{ backgroundImage: `url(${bigdoctor})` }}
        ></div>
      </div>
    </div>
  );
};

export default DoctorSlider;
