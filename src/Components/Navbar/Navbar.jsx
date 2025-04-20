import React, { useEffect, useState } from "react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
// import logo from "../../assets/Puslecarelogo/PulseCare.png";
import logo from "../../assets/Puslecarelogo/dkleanlogo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import SmartNavbar from "./SmartNavbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";

const Navbar = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
 
  const roleBasedLinks = {
    user: [
      { to: "/patientlogin", name: "Book Appointment" },
      { to: "/pApp", name: "All Appointments" },
      { to: "/patientprofile", name: "Profile Setting" },
      // { to: "/contactSupport", name: "Contact Support" }
    ],
    donor: [
      { to: "/donate", name: "Donate Now" },
    ],
    doctor: [
      { to: "/doctorDashboard", name: "Doctor Dashboard" },
      { to: "/appointments", name: "Appointments" },
      { to: "/doctorProfile", name: "Profile" }
    ],
    admin: [
      { to: "/adminDashboard", name: "Admin Panel" },
      { to: "/manageUsers", name: "Manage Users" },
      { to: "/reports", name: "Reports & Analytics" }
    ]
  };
  

  useEffect(() => {
    const loadDetails = () => {
      // const storedDetails = localStorage.getItem(props.userType||"userDetails");
      const storedDetails = localStorage.getItem(
        [props.userType, "userDetails", "donorDetails", "doctorDetails", "adminDetails"]
          .find(key => localStorage.getItem(key))// ek ek value pe function chalya
      );
      // console.log(storedDetails);
      if (storedDetails) { //jisme value null nahi ayi use useState me bhej diya
        setLoggedInUser(JSON.parse(storedDetails));
        console.log(loggedInUser);
      }
    };
    loadDetails();
    // console.log(loggedInUser.isloggedIn+"sdkhaldfkhasdlkh");
    if(loggedInUser.isloggedIn===undefined){
      setIsDropdownOpen(false);
    }
  }, [props.userType, loggedInUser.isloggedIn]);



  const logout = ()=>{
    localStorage.clear();
    location.href="/"
  }

  return (
    <>
      {/* Top Navbar */}

      {/* Bottom Navbar */}
      <div className="hidden lg:block lg:bg-custom-maroon lg:h-[19vh]">
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
                  MON - SAT: 8.00 - 16.00
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
                <div className="text-white">+91-9355647906</div>
              </div>
            </div>

            {/* Email */}
            <div className="w-1/5 flex items-center space-x-2">
              <MailIcon sx={{ fontSize: 26, color: "white" }} />
              <div className="pl-2">
                <div className="uppercase text-sm text-gray-300">Email Us</div>
                <div className="text-white">
                dkleanhealthcare@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="tabs-bookanapp flex">
          <div className="flex justify-center items-center h-[5vh] w-1/2">
            <div className="flex space-x-8 h-full items-center">
              {["Home", "About", "Services", "Gallery", "Contact Us"].map(
                (tab) => (
                  <div
                    className="hover:border-b-2 hover:border-white"
                    key={tab}
                  >
                    <Link
                      to={`/${tab.toLowerCase().replace(" ", "-")}`}
                      className="text-white text-sm font-semibold relative group hover:text-gray-200 transition-all duration-300"
                    >
                      {tab}
                    </Link>
                  </div>
                )
              )}
              <div className="flex items-center p-2 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-all duration-300">
                <FavoriteIcon sx={{ color: "white", fontSize: 20 }} />
                <Link
                  to="/donate"
                  className="text-white text-sm font-semibold ml-2 hover:text-gray-200 transition-all duration-300"
                >
                  Donate
                </Link>
              </div>
            </div>
          </div>

          {/* Book Appointment Button */}
          <div className="flex  justify-center w-1/2 items-center space-x-6">
            <Link to="/patientlogin">
              <button className="bg-[#6d0101] text-white px-6 py-2 text-sm font-semibold rounded-md hover:bg-black transition duration-300 transform">
                Book An Appointment
              </button>
            </Link>
            <div
              className={!loggedInUser.isloggedIn ? "block" : "hidden"}
            ></div>
            {loggedInUser.isloggedIn ? (
              <Avatar sx={{ bgcolor: "red" }} onClick={() => setIsDropdownOpen((prevState) => !prevState)}>
                {loggedInUser.name?.charAt(0) || "N"}
              </Avatar>
            ) : (
              <Link to="/patientlogin" >
                <span className="text-white transition-all duration-300 font-semibold border border-white p-2 rounded-md hover:bg-gray-200 hover:text-black ">
                  Login / Signup
                </span>
              </Link>
            )}
          </div>

          {
  isDropdownOpen && (
    <div className="z-50 bg-custom-maroon text-white absolute right-56 top-36 rounded-lg shadow-lg animate-fadeIn" sx={{ bgcolor: "red" }} onClick={() => setIsDropdownOpen((prevState) => !prevState)}>
       {loggedInUser?.role === "user" && (
    <>
   {roleBasedLinks[loggedInUser?.role]?.map((link, index) => (
  <Link key={index} to={link.to} className="block p-2 hover:bg-custom-maroon2 transition duration-300">
    {link.name}
  </Link>
))}
    </>
  )}
   {loggedInUser?.role === "donor" && (
    <>
   {roleBasedLinks[loggedInUser?.role]?.map((link, index) => (
  <Link key={index} to={link.to} className="block p-2 hover:bg-custom-maroon2 transition duration-300">
    {link.name}
  </Link>
))}
    </>
  )}
   {loggedInUser?.role === "admin" && (
    <>
   {roleBasedLinks[loggedInUser?.role]?.map((link, index) => (
  <Link key={index} to={link.to} className="block p-2 hover:bg-custom-maroon2 transition duration-300">
    {link.name}
  </Link>
))}
    </>
  )}
   {loggedInUser?.role === "doctor" && (
    <>
   {roleBasedLinks[loggedInUser?.role]?.map((link, index) => (
  <Link key={index} to={link.to} className="block p-2 hover:bg-custom-maroon2 transition duration-300">
    {link.name}
  </Link>
))}
    </>
  )}
     
      <div onClick={logout} className="block p-2 hover:bg-custom-maroon2 transition duration-300">
        Logout
      </div>
    </div>
  )
}

        </div>
      </div>

      {/* Smartphone Navbar */}

      {
        !loggedInUser.isloggedIn&& <div className="sm:block lg:hidden md:hidden">
        <SmartNavbar />
      </div>
      }
     
    </>
  );
};

export default Navbar;
