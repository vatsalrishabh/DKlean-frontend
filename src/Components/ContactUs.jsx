import React from "react";

const ContactUs = () => {
  return (
    <div className="w-full">
      {/* 1. Google Map Section */}
      <div className="map-container w-full h-[80vh] flex justify-center items-center p-4 pb-0">
        <iframe
          title="Dklean Health Care Public Charitable Trust (N.G.O.)"
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.382747608241!2d77.03285819999999!3d28.6182887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05df90671067%3A0xfc69115db1265dbe!2sDklean%20Path%20Lab%20And%20Collection%20Center!5e0!3m2!1sen!2sin!4v1747326436442!5m2!1sen!2sin" 
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* 2. Contact Information Section */}
      <div className="contact-holder h-[30vh] w-full flex justify-center items-center py-16 relative">
        <div className="contactBox bg-custom-maroon2 text-white lg:w-4/6 grid lg:grid-cols-2 gap-6 p-6 rounded-lg shadow-lg absolute bottom-20">
          {/* Left Section - Address & Email */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">Delhi, India</h1>
            <div>
              <h4 className="text-lg font-semibold">Full Address:</h4>
              <p className="text-sm">
                E-8/6, kh No.26/19, Begum Vihar Ext, Block-E, Magadh Society Area, 
                Magadh Chouk, Begumpur, Delhi-86, Near Rohini, Sec-23
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Email:</h4>
              <p className="text-sm">dkleanhealthcare@gmail.com</p>
            </div>
          </div>

          {/* Right Section - Call & Office Details */}
          <div className="space-y-3">
            <div>
              <h4 className="text-lg font-semibold">Call Directly:</h4>
              <p className="text-lg font-bold text-yellow-300">+91 9355647906</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold">Working Hours:</h4>
              <p className="text-sm">Monday - Saturday: 9 AM - 6 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
