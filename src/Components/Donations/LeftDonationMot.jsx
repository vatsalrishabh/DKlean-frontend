import React from 'react';
import { FaHeart, FaHandsHelping, FaStethoscope, FaDonate } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LeftDonationMot = () => {
  return (
    <div className="bg-custom-graybg lg:p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold text-custom-maroon mb-4 font-cursive">How will your donation help Dklean?</h2>
      
      <p className="text-lg text-gray-700 mb-4">
        In a world where health and wellness are more important than ever, Dklean provides essential physiotherapy and blood work services to those in need. By donating, you directly support our mission to make healthcare accessible, affordable, and effective for marginalized communities. Your donation helps us provide essential health services that can transform lives.
      </p>

      <h3 className="text-xl font-semibold text-custom-maroon mb-3 font-cursive">Why Donate to Dklean?</h3>
      <p className="text-lg text-gray-700 mb-4">
        Dklean is committed to providing high-quality physiotherapy and blood work services to underserved populations. Your donation helps fund treatment sessions, medical tests, and the purchase of necessary equipment for patients in need. By supporting Dklean, you ensure that individuals can receive the care they need to recover, live healthier lives, and gain access to critical healthcare services.
      </p>

      <h3 className="text-xl font-semibold text-custom-maroon mb-3 font-cursive">How Your Donation Helps:</h3>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
        <li><FaHandsHelping className="inline mr-2 text-custom-maroon" />Providing physiotherapy treatments to individuals with chronic pain or injury.</li>
        <li><FaStethoscope className="inline mr-2 text-custom-maroon" />Supporting patients who need blood work for diagnosing serious conditions.</li>
        <li><FaHeart className="inline mr-2 text-custom-maroon" />Ensuring that medical tests and therapies are accessible to low-income communities.</li>
        <li><FaDonate className="inline mr-2 text-custom-maroon" />Providing mobility aids and physical therapy equipment to those in need.</li>
      </ul>

      <h3 className="text-xl font-semibold text-custom-maroon mb-3 font-cursive">Your Donation Can Change Lives:</h3>
      <p className="text-lg text-gray-700 mb-4">
        Every donation helps us offer physical rehabilitation and diagnostic services to those who otherwise might not be able to afford them. Whether it’s aiding in post-surgery recovery or detecting life-threatening conditions through blood tests, your generosity directly impacts the well-being of individuals in need.
      </p>

      <h3 className="text-xl font-semibold text-custom-maroon mb-3 font-cursive">Why Donate Online?</h3>
      <p className="text-lg text-gray-700 mb-4">
        Donating online is fast, easy, and secure. Your donation will fund critical healthcare services, equipment, and resources that directly improve patients' lives. You can make a one-time contribution or set up a recurring donation to ensure ongoing support for Dklean's initiatives.
      </p>

      <div className="text-center mt-6">
        <Link to="/donorlogin">
        <button className="bg-custom-maroon text-white py-2 px-6 rounded-full text-xl font-semibold hover:bg-custom-maroon2 transition">
          Login and Donate
        </button>
        </Link> 
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p className="text-sm">
          Every donation counts towards providing essential physiotherapy and blood work services to those who need them the most. Donate today and help improve someone's health.
        </p>
      </div>
    </div>
  );
};

export default LeftDonationMot;
