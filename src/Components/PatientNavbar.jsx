import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import pulsecarelogo from "../assets/Puslecarelogo/PulseCare.png";

const PatientNavbar = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const loadUserDetails = () => {
      const details = localStorage.getItem(props.localstorage);
      if (details) {
        setLoggedInUser(JSON.parse(details));
      }
    };
    loadUserDetails();
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    const dropdown = document.getElementById("user-dropdown");
    const button = document.getElementById("user-menu-button");
    if (
      dropdown &&
      !dropdown.contains(event.target) &&
      button &&
      !button.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Remove user details from localStorage
    localStorage.clear();
    // Optionally, redirect to the login page or perform other actions
    window.location.href = "/home"; // Adjust the URL as needed
  };

  return (
    <nav className="bg-custom-maroon border-gray-200 dark:bg-gray-900 block lg:hidden">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={pulsecarelogo}
            height={100}
            width={100}
            alt="PulseCare Logo"
          />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={dropdownOpen}
            onMouseEnter={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <Avatar sx={{ bgcolor: "red" }}>
              {loggedInUser?.name?.slice(0, 1) || "N"}
            </Avatar>
          </button>

          {/* Dropdown menu starts*/}
          <div
            className={` z-50  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 dark:divide-gray-600 absolute lg:right-6 lg:top-16 right-6 top-14 mt-2 ${
              dropdownOpen ? "block" : "hidden"
            }`}
            id="user-dropdown"
          >
            <ul className="py-1" aria-labelledby="user-menu-button">
              {props.linkOne && (
                <li>
                  <Link
                    to={props.linkOne}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {props.oneName}
                  </Link>
                </li>
              )}

              {props.linkTwo && (
                <li>
                  <Link
                    to={props.linkTwo}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {props.twoName}
                  </Link>
                </li>
              )}
              {props.linkThree && (
                <li>
                  <Link
                    to={props.linkThree}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {props.threeName}
                  </Link>
                </li>
              )}

              {props.linkFour && (
                <li>
                  <Link
                    to={props.linkFour}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {props.fourtName}
                  </Link>
                </li>
              )}

              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PatientNavbar;
