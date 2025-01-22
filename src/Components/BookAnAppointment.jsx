import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import Card from "../PricingAndCart/Card";
import axios from "axios";
import { BaseUrl } from "./BaseUrl";
import {
  Drawer,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const BookAnAppointment = () => {
  const [specialityCard, setSpecialityCard] = useState([]); // Blood services
  const [commonHealthCard, setCommonHealthCard] = useState([]); // Physio services
  const [loggedInUser, setLoggedInUser] = useState({});
  const [hideLeftDrawer, setHideDrawer] = useState(false); // Manage left drawer visibility

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 960) {
        setHideDrawer(true);
      } else {
        setHideDrawer(false);
      }
    };

    handleResize(); // To set the initial state
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Load user details from local storage immediately
    const loadUserDetails = () => {
      const storedUserDetails = localStorage.getItem("userDetails");
      if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails);
        setLoggedInUser(userDetails);
      }
    };
    loadUserDetails();
  }, []);

  useEffect(() => {
    // Fetch data from API
    const fetchServices = async () => {
      if (!loggedInUser.jwt) {
        console.error("No JWT found in loggedInUser");
        return;
      }

      try {
        const response = await axios.get(
          `${BaseUrl}/api/services/getAllServices`,
          {
            headers: {
              Authorization: `Bearer ${loggedInUser.jwt}`,
            },
          }
        );

        const { data } = response.data;

        if (data && data.length > 0) {
          const specialityServices = data.filter(
            (service) => service.category === "blood"
          );
          const commonHealthServices = data.filter(
            (service) => service.category === "Health"
          );

          setSpecialityCard(specialityServices); // Blood services
          setCommonHealthCard(commonHealthServices); // Physio services
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [loggedInUser]); // Depend on loggedInUser to ensure the JWT is ready
const logout = ()=>{
  localStorage.clear();
  location.reload();
}
  

  return (
    <div className="flex">
      <div className="left">
        {/* Left Drawer for Navigation */}
        <Drawer
          className={`${hideLeftDrawer ? "hidden" : ""}`}
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
              backgroundColor: "#9e1b1b",
              color: "#fff",
              transition: "all 0.3s ease-in-out",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <div className="flex flex-col items-center mt-6">
            <Avatar sx={{ bgcolor: "#d01212", width: 100, height: 100 }}>
              {loggedInUser?.name?.slice(0, 1) || "N"}
            </Avatar>
            <Typography variant="h6" className="font-semibold text-white mt-2">
              {loggedInUser?.name || "Guest"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {loggedInUser?.email || "No email available"}
            </Typography>
          </div>

          <List>
            <ListItem button component={Link} to="/bookAp">
              <ListItemText primary="Book Appointment" />
            </ListItem>
            <ListItem button component={Link} to="/pApp">
              <ListItemText primary="Previous Appointments" />
            </ListItem>
            <ListItem button component={Link} to="/profileSettings">
              <ListItemText primary="Profile Settings" />
            </ListItem>
            <ListItem button component={Link} to="/contactSupport">
              <ListItemText primary="Contact Support" />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      </div>

      <div className="BookAnAppointment w-full">
        {/* Speciality-wise list starts */}
        <div className="Speciality-wise-cards bg-custom-graybg">
          {/* Breadcrumb starts */}
          <div className="p-8">
            <Breadcrumb aria-label="Default breadcrumb example">
              <Link to="/patientlogin">
                <BreadcrumbItem icon={HiHome}>Home</BreadcrumbItem>
              </Link>
              <BreadcrumbItem>Book an appointment</BreadcrumbItem>
            </Breadcrumb>
          </div>
          {/* Breadcrumb ends */}

          <div className="heading font-bold text-gray-700 text-4xl flex justify-center align-middle p-5">
            Blood Tests
          </div>
          <div className="heading text-gray-700 text-xl flex justify-center align-middle p-1">
            Book your test now
          </div>
          <div className="justify-center align-middle grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:p-5 py-5">
            {specialityCard && specialityCard.length > 0 ? (
              specialityCard.map((card, index) => (
                <Card
                  key={index}
                  serviceId={card.serviceId}
                  name={card.name}
                  price={`₹${card.price}`}
                  description="Provides essential health services."
                  discount="10% off"
                />
              ))
            ) : (
              <div>No speciality services available.</div>
            )}
          </div>
        </div>
        {/* Speciality-wise list ends */}

        {/* Common Health Concerns starts */}
        <div className="Speciality-wise-cards bg-custom-graybg">
          <div className="heading font-bold text-gray-700 text-4xl flex justify-center align-middle p-5">
            Common Health/Physio Concerns
          </div>
          <div className="heading text-gray-700 text-xl flex justify-center align-middle p-1">
            Consult a physiotherapist online for any health issue
          </div>
          <div className="justify-center align-middle grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:p-5 py-5">
            {commonHealthCard && commonHealthCard.length > 0 ? (
              commonHealthCard.map((card, index) => (
                <div className="py-2">
                  <Card
                    key={index}
                    serviceId={card.serviceId}
                    name={card.name}
                    price={`₹${card.price}`}
                    description="Provides essential health services."
                    discount="10% off"
                  />
                </div>
              ))
            ) : (
              <div>No common health services available.</div>
            )}
          </div>
        </div>
        {/* Common Health Concerns ends */}
      </div>
    </div>
  );
};

export default BookAnAppointment;
