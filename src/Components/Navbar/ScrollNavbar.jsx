import React from 'react'
import logo from "../../assets/Puslecarelogo/PulseCare.png";
import { Link } from 'react-router-dom';

const ScrollNavbar = () => {
  return (
    <div className='Scrollnav-white w-full flex bg-white'>
        <div className="w-5/6 flex justify-center align-middle">
        <div className="w-1/2 flex">
        <div className="logo">
 <img src={logo} height={100} width={100} alt="PulseCare Logo" />
        </div>
      <Link to="about">
      <div className='hover:bg-custom-maroon2 hover:border bottom-1'>About</div>
      </Link> 
      <Link to="patientlogin">
      <div className='hover:bg-custom-maroon2 hover:border bottom-1'>About</div>
      </Link> 
      <Link to="patientlogin">
      <div className='hover:bg-custom-maroon2 hover:border bottom-1'>About</div>
      </Link> 
      <Link to="patientlogin">
      <div className='hover:bg-custom-maroon2 hover:border bottom-1'>About</div>
      </Link> 
      <Link to="patientlogin">
      <div className='hover:bg-custom-maroon2 hover:border bottom-1'>About</div>
      </Link> 
  
            <div className='hover:bg-custom-maroon2 hover:border bottom-1'>Gallery</div>
            <div className='hover:bg-custom-maroon2 hover:border bottom-1'>Contact Us</div>
            <div className='hover:bg-custom-maroon2 hover:border bottom-1'>Donate</div>
            <div className='hover:bg-custom-maroon2 hover:border bottom-1'>Login</div>
        </div>
        <div className="w-1/2">
        <button className="bg-[#6d0101] text-white px-6 py-2 text-sm font-semibold hover:bg-black transition duration-300 transform">
              Book An Appointment
            </button>
        </div>
        </div>
     
    </div>
  )
}

export default ScrollNavbar
