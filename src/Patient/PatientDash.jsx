import React, { useEffect, useState } from "react";
import LeftDrawer from "../Components/LeftDrawer";
import RightDashboard from "../Components/RightDashboard";
import { useLocation } from "react-router-dom";
import ContactUs from "../Components/ContactUs";
import { BreadCrumb } from "../Components/DoctorDashboard/BreadCrumb";
import PatientBookAnApp from "./PatientBookAnApp";
import AllAppointment from "./AllAppointment";
import PatientProfile from "./PatientProfile";
import ContactSupport from "../Components/ContactSupport";
import { Caraousal } from "../Components/Caraousal/Caraousal";
import TypeOfService from "./TypeOfService";
import Footer from "../Components/Footer"

const  PatientDash = () => {
  const location = useLocation();

    // load user data from localstorage for left drawer
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
     const loadUserDetails = () => {
       const storedUserDetails = localStorage.getItem("userDetails");
       if (storedUserDetails) {
         const userDetails = JSON.parse(storedUserDetails);
         console.log(storedUserDetails);
         setLoggedInUser(userDetails); // Set the logged-in user with the JWT
       }
     };
     loadUserDetails();
   }, []);
  // load user data from localstorage for left drawer

  const menuItems = [
    { name: "Book Appointment", link: "/bookAp" },
    { name: "All Appointments", link: "/pApp" },
    { name: "Profile Setting", link: "/patientprofile" },
    { name: "Contact Support", link: "/contactSupport" },
  ];

  const dashboardCards = [
    {
      title: "Book New Appointment",
      description: "Schedule a new appointment with your preferred doctor.",
      iconType: "CalendarToday",
      link: "/bookAp",
      buttonText: "Book Now",
    },
    {
      title: "All Appointments",
      description: "View details of your past appointments and treatments.",
      iconType: "History",
      link: "/pApp",
      buttonText: "View Details",
    },
    {
      title: "Profile Settings",
      description: "Manage your profile and account settings.",
      iconType: "Settings",
      link: "/doctorProfile",
      buttonText: "Manage",
    },
    {
      title: "Medical Reports",
      description: "Access your medical records and reports anytime.",
      iconType: "FileCopy",
      link: "/medicalReports",
      buttonText: "View Reports",
    },
    {
      title: "Contact Support",
      description: "Need help? Reach out to our support team.",
      iconType: "HelpOutline",
      link: "/contactSupport",
      buttonText: "Get Support",
    },
  ];

  // Function to render the right content based on the route
  const renderContent = () => {
    if (location.pathname === "/patientlogin") {
      return (
        <div className="">
                <BreadCrumb
        first="Patient Dashboard"
        second="Book Appointment"
        firstLink="/patientlogin"
        secondLink="/bookAp"
      />
      <Caraousal />
      <TypeOfService/>
      <Footer/>
      {/* <PatientBookAnApp /> */}
        </div>
      );
    } else if (location.pathname === "/profileSettings") {
      return (
        <div className="bg-gray-200 w-full">
          <BreadCrumb
            first="Patient Dashboard"
            second="Profile Setting"
            firstLink="/patientlogin"
            secondLink="/profileSettings"
          />
          <ContactUs />
        </div>
      );
    } else if (location.pathname === "/bookAp") {
      return (
        <div className="bg-gray-200 w-full">
          <BreadCrumb
            first="Patient Dashboard"
            second="Book Appointment"
            firstLink="/patientlogin"
            secondLink="/bookAp"
          />
          <PatientBookAnApp />
        </div>
      );
    }else if (location.pathname === "/pApp") {
      return (
        <div className="bg-gray-200 w-full">
          <BreadCrumb
            first="Patient Dashboard"
            second="Book Appointment"
            firstLink="/patientlogin"
            secondLink="/bookAp"
          />
         <AllAppointment />
        </div>
      );
    }else if (location.pathname === "/patientprofile") {
      return (
        <div className="bg-gray-200 w-full">
          <BreadCrumb
            first="Patient Dashboard"
            second="Patient Profile"
            firstLink="/patientlogin"
            secondLink="/patientprofile"
          />
<PatientProfile/>
        </div>
      );
    }else if (location.pathname === "/contactSupport") {
      return (
        <div className="bg-gray-200 w-full">
          <BreadCrumb
            first="Patient Dashboard"
            second="Contact Us"
            firstLink="/patientlogin"
            secondLink="/contactSupport"
          />
<ContactSupport />
        </div>
      );
    }
    else {
      return <div>404 - Page Not Found</div>; // Fallback for unknown routes
    }
  };

  return (
    <div className=" w-full">
      {/* <LeftDrawer
        loggedInUser={loggedInUser}
        avatarType="Patient"
        menuItems={menuItems}
      /> */}
      {renderContent()}
    </div>
  );
};

export default PatientDash;
