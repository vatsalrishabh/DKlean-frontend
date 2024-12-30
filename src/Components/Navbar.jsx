import React, { useState } from "react";
import { Link } from "react-router-dom";
import WalletIcon from "@mui/icons-material/Wallet";
import PulseCare from "../assets/Puslecarelogo/PulseCare.png";
import WalletModal from "./WalletModal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Navbar = () => {
  const [displayDropdown, setDropdown] = useState(false); // For navbar dropdown
  const [openModal, setOpenModal] = useState(false); // For wallet modal
  const [loginDropDown, setLoginDrop] = useState(false); // For login dropdown

  const handleDropDown = () => {
    setDropdown(!displayDropdown); // Toggle navbar dropdown
  };

  const handleLoginDropdown = () => {
    setLoginDrop(!loginDropDown); // Toggle login dropdown
  };

  const handleWalletClick = () => {
    setOpenModal(true); // Open wallet modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close wallet modal
  };

  const walletData = {
    balance: 250.0,
    lastTransaction: 50.0,
    totalSpent: 100.0,
  };

  return (
    <div className="Navbar">
      <nav className="bg-custom-maroon border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-1">
          <Link to="/" className="flex items-center lg:w-1/3">
            <img src={PulseCare} className="h-14" alt="PulseCare Logo" />
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={handleDropDown}
            aria-controls="navbar-default"
            aria-expanded={displayDropdown ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              displayDropdown ? "block" : "hidden"
            } lg:w-2/3 w-full lg:block md:hidden`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-custom-maroon md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 dark:border-gray-700">
              <li className="lg:flex justify-center align-middle" >
                <Link
                  to="/home"
                  className="block py-2 px-3 font-bold text-white rounded hover:bg-red-500"
                  onClick={handleDropDown}
                >
                  Home
                </Link>
              </li>
              <li className="lg:flex justify-center align-middle" >
                <Link
                  to="/aboutus"
                  className="block py-2 px-3 font-bold text-white rounded hover:bg-red-500"
                  onClick={handleDropDown}
                >
                  About
                </Link>
              </li>
              <li className="lg:flex justify-center align-middle" >
                <Link
                  to="/services"
                  className="block py-2 px-3 font-bold text-white rounded hover:bg-red-500"
                  onClick={handleDropDown}
                >
                  Services
                </Link>
              </li>
              <li className="lg:flex justify-center align-middle" >
                <Link
                  to="/gallery"
                  className="block py-2 px-3 font-bold text-white rounded hover:bg-red-500"
                  onClick={handleDropDown}
                >
                  Gallery
                </Link>
              </li>
              <li className="lg:flex justify-center align-middle" >
                <Link
                  to="/contactus"
                  className="block py-2  font-bold text-white rounded hover:bg-red-500"
                  onClick={handleDropDown}
                >
                  Contact Us
                </Link>
              </li>
              <li className="lg:flex justify-center align-middle" >
                <Link
                  to="/donate"
                  className="block py-2 px-3 font-bold text-white rounded-lg bg-yellow-400 hover:bg-yellow-500"
                  onClick={handleDropDown}
                >
                  Donate
                </Link>
              </li>
              <li className="relative">
                <button
                  className="flex items-center py-2 px-3 font-bold text-white rounded hover:bg-red-500 focus:outline-none"
                  onClick={handleLoginDropdown}
                >
                  Login
                  <ArrowDropDownIcon className="ml-2" />
                </button>
                <div
                  className={`${
                    loginDropDown ? "block" : "hidden"
                  } absolute top-12 left-0 z-10 w-48 bg-white shadow-lg rounded-lg`}
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/patientlogin"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
                      >
                        Patient Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/doctorlogin"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
                      >
                        Doctor Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/donorlogin"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
                      >
                        Donor Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/adminlogin"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
                      >
                        Admin Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/subadminlogin"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white"
                      >
                        SubAdmin Login
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <WalletModal
        open={openModal}
        onClose={handleCloseModal}
        walletData={walletData}
      />
    </div>
  );
};

export default Navbar;
