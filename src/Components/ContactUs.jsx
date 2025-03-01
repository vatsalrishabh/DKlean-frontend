import React from "react";

const ContactUs = () => {
  return (
    <div className="w-full">
      {/* 1. Google Map Section */}
      <div className="map-container w-full h-[80vh] flex justify-center items-center p-4 pb-0">
        <iframe
          title="NebulaNet Location"
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.002630609211!2d77.60635597461699!3d12.90755211628019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x44bb07227a52240b%3A0xc487f0d4e31ec0ac!2sNebulaNet%20(Website%20Apps%20Solutions)!5e0!3m2!1sen!2sin!4v1740068993946!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* 2. Contact Information Section */}
      <div className="contact-holder h-[30vh] w-full flex justify-center items-center py-16 relative">
        <div className="contactBox bg-custom-maroon2 text-white lg:w-4/6 grid lg:grid-cols-2 gap-6 p-6 rounded-lg shadow-lg absolute bottom-20 ">
          {/* Left Section - Address & Email */}
          <div className="headOfficeEmail space-y-2">
            <h1 className="text-2xl font-bold">Bangalore, Karnataka</h1>
            <h4 className="text-lg font-semibold">Full Address:</h4>
            <p className="text-sm">123, Example Street, Bangalore, India - 560001</p>
            <h5 className="text-lg font-semibold">Email:</h5>
            <p className="text-sm">contact@dkleanhealthcare.com</p>
          </div>

          {/* Right Section - Call & Office Details */}
          <div className="headOfficeEmail space-y-2">
            <h1 className="text-xl font-bold">Call Directly:</h1>
            <p className="text-lg font-semibold text-yellow-300">+91 81235 73660</p>
            <h3 className="text-lg font-semibold">Regional Office</h3>
            <p className="text-sm">XYZ Business Park, Bangalore</p>
            <h3 className="text-lg font-semibold">Working Hours</h3>
            <p className="text-sm">Monday - Saturday: 9 AM - 6 PM</p>
          </div>
        </div>
      </div>

      {/* 3. Send Message Form (Coming Soon) */}
    </div>
  );
};

export default ContactUs;
