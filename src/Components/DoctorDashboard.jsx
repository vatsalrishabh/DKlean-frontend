import React, { useEffect, useState } from "react";
import LeftDrawer from "./LeftDrawer";
import RightDashboard from "./RightDashboard";
import { useLocation } from "react-router-dom";
import ContactUs from "./ContactUs";
import EditAllServices from "../Doctor/EditAllServices";
import { BreadCrumb } from "./DoctorDashboard/BreadCrumb";
import AdminManageApp from "../Admin/AdminManageApp";

const DoctorDashboard = () => {

   const [loggedInUser, setLoggedInUser] = useState({});
     useEffect(() => {
       const loadUserDetails = () => {
         const details = localStorage.getItem("doctorDetails");
         if (details) {
           setLoggedInUser(JSON.parse(details));
         }
       };
       loadUserDetails();
     }, []);


  const location = useLocation();
  console.log(location.pathname);

  const menuItems = [
    { name: "Dashboard", link: "/doctorlogin" },
    // { name: "Edit Appointments", link: "/doctor/UpcomingApp" },
    { name: "Manage Appointment", link: "/doctor/manageApp" },
  
  ];

  const dashboardCards = [
    {
      title: "Edit Appoint.",
      description: "Schedule a new appointment with your preferred doctor.",
      iconType: "CalendarToday",
      link: "/doctor/manageApp",
      buttonText: "Edit Now",
    },
    {
      title: "Manage Appoint..",
      description: "View details of your past appointments and treatments.",
      iconType: "History",
      link: "/doctor/manageApp",
      buttonText: "View Details",
    },
   
    
  ];

  // Function to render the right content based on the route
  const renderContent = () => {
    if (location.pathname === "/doctorlogin") {
      return (
        <RightDashboard
          cardsData={dashboardCards}
          breadCrumbs={{
            first: "Doctor Dashboard",
            second: "",
            firstLink: "/doctorlogin",
            secondLink: "/",
          }}
        />
      );
    } else if (location.pathname === "/doctor") {
      return <div>
        <ContactUs/>
      </div>;
    }else if (location.pathname === "/doctor/UpcomingApp") {
      return <div>
        <BreadCrumb
                    first="Doctor Dashboard"
                    second="Edit Services"
                    firstLink="/doctorlogin"
                    secondLink="/doctor/UpcomingApp"
                  />
        <EditAllServices/>
      </div>;
    }else if (location.pathname === "/doctor/manageApp") {
      return <div>
        <BreadCrumb
                    first="Doctor Dashboard"
                    second="Manage Appointment"
                    firstLink="/doctorlogin"
                    secondLink="/doctor/manageApp"
                  />
        <AdminManageApp/>
      </div>;
    }

     else {
      return <div>404 - Page Not Found</div>; // Fallback for unknown routes
    }
  };

  return (
    <div className="flex">
      <LeftDrawer
        loggedInUser={loggedInUser}
        avatarType="Doctor"
        menuItems={menuItems}
      />
      {renderContent()} 
    </div>
  );
};

export default DoctorDashboard;
