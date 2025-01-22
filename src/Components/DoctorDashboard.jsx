import React from "react";
import LeftDrawer from "./LeftDrawer";
import RightDashboard from "./RightDashboard";

const DoctorDashboard = () => {
  const menuItems = [
    { name: "Dashboard", link: "/patientlogin" },
    { name: "Upcoming Appointments", link: "/appointments" },
    { name: "Book an Appointment", link: "/selectDis" },
    { name: "Patient History", link: "/history" },
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
      title: "Previous Appointments",
      description: "View details of your past appointments and treatments.",
      iconType: "History",
      link: "/pApp",
      buttonText: "View Details",
    },
    {
      title: "Profile Settings",
      description: "Manage your profile and account settings.",
      iconType: "Settings",
      link: "/profileSettings",
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

  return (
    <div className="flex">
      <LeftDrawer
        localstorage="doctorDetails"
        avatarType="Doctor"
        menuItems={menuItems}
      />
      <RightDashboard cardsData={dashboardCards} />
    </div>
  );
};

export default DoctorDashboard;
