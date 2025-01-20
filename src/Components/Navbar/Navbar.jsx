import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../../assets/Puslecarelogo/PulseCare.png";
import { Link } from "react-router-dom";
import SmartNavbar from "./SmartNavbar";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (status) => {
    setIsDropdownOpen(status);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="hidden lg:bg-custom-maroon lg:h-[8vh] lg:border-b lg:border-gray-400 lg:flex lg:items-center lg:px-6">
        <div className="flex items-center w-1/2">
          <LocationOnIcon sx={{ fontSize: 18, color: "#c4d5db" }} />
          <span className="ml-2 text-gray-300 text-sm">
            <b>ADDRESS:</b> 568 Elizaberth Str, London, UK
          </span>
        </div>
        <div className="flex items-center justify-end w-1/2 space-x-4">
          <TwitterIcon
            sx={{
              fontSize: 20,
              color: "white",
              transition: "color 0.3s ease",
              "&:hover": { color: "#1DA1F2", cursor: "pointer" },
            }}
          />
          <InstagramIcon
            sx={{
              fontSize: 20,
              color: "white",
              transition: "color 0.3s ease",
              "&:hover": { color: "#E1306C", cursor: "pointer" },
            }}
          />
          <LinkedInIcon
            sx={{
              fontSize: 20,
              color: "white",
              transition: "color 0.3s ease",
              "&:hover": { color: "#0077B5", cursor: "pointer" },
            }}
          />
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="hidden lg:block lg:bg-custom-maroon lg:h-[17vh]">
        <div className="flex justify-center items-center h-[12vh]">
          <div className="flex justify-between items-center w-4/5">
            {/* Logo Section */}
            <div className="w-1/5 flex justify-center">
              <img src={logo} height={100} width={100} alt="PulseCare Logo" />
            </div>

            {/* Working Hours */}
            <div className="w-1/5 flex items-center space-x-2">
              <QueryBuilderIcon sx={{ fontSize: 26, color: "white" }} />
              <div className="pl-2">
                <div className="uppercase text-sm text-gray-300">
                  Working Hours
                </div>
                <div className="font-semibold text-white">
                  MON - FRI: 9.00 - 21.00
                </div>
              </div>
            </div>

            {/* Hotline */}
            <div className="w-1/5 flex items-center space-x-2">
              <CallIcon sx={{ fontSize: 26, color: "white" }} />
              <div className="pl-2">
                <div className="uppercase text-sm text-gray-300">
                  Hotline 24/7
                </div>
                <div className="text-white">+0962-58-58-258</div>
              </div>
            </div>

            {/* Email */}
            <div className="w-1/5 flex items-center space-x-2">
              <MailIcon sx={{ fontSize: 26, color: "white" }} />
              <div className="pl-2">
                <div className="uppercase text-sm text-gray-300">Email Us</div>
                <div className="text-white">support@clenora.com.uk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="tabs-bookanapp flex">
          <div className="flex justify-center items-center h-[5vh] w-1/2">
            <div className="flex space-x-10 h-full">
              {["Home", "About", "Services", "Gallery", "Contact Us", "Donate"].map((tab) => (
                <div className="hover:border-b-2 hover:border-white">
                  <Link
                    to={`/${tab.toLowerCase().replace(" ", "-")}`}
                    key={tab}
                    className="text-white text-sm font-semibold relative group hover:text-gray-200 transition-all duration-300"
                  >
                    {tab}
                  </Link>
                </div>
              ))}

              {/* Dropdown for Login */}
              <div
                className="relative text-white text-sm group cursor-pointer"
                onMouseEnter={() => toggleDropdown(true)}
                onMouseLeave={() => toggleDropdown(false)}
              >
                <span className="hover:text-gray-200 transition-all duration-300 font-semibold">
                  Login
                </span>
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-5 w-40 bg-white shadow-lg rounded-md">
                    <Link
                      to="/patientlogin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Patient Login
                    </Link>
                    <Link
                      to="/doctorlogin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Doctor Login
                    </Link>
                    <Link
                      to="/donorlogin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Donor Login
                    </Link>
                    <Link
                      to="/adminlogin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Admin Login
                    </Link>

                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Book Appointment Button */}
          <div className="flex justify-center w-1/2">
            <button className="bg-[#6d0101] text-white px-6 py-2 text-sm font-semibold hover:bg-black transition duration-300 transform">
              Book An Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Smartphone Navbar */}
      <div className="sm:block lg:hidden">
        <SmartNavbar />
      </div>
    </>
  );
};

export default Navbar;
