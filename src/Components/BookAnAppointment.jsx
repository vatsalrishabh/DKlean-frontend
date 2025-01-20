import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import ConsultCard from "./ConsultCard";
import axios from "axios";
import {BaseUrl} from './BaseUrl';

const BookAnAppointment = () => {
  const [specialityCard, setSpecialityCard] = useState([]);  // blood services
  const [commonHealthCard, setCommonHealthCard] = useState([]);   // physio services 
  const [loggedInUser, setLoggedInUser] = useState({});

  

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
      
      console.log("JWT: ", loggedInUser); // Debug: Check JWT value

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
          console.log(data);
          const specialityServices = data.filter(
            (service) => service.category === "blood"
          );
          const commonHealthServices = data.filter(
            (service) => service.category  === "Health"
          );

          setSpecialityCard(specialityServices);   // blood sevices 
          setCommonHealthCard(commonHealthServices); // physio services 
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [loggedInUser]); // Depend on loggedInUser to ensure the JWT is ready

  return (
    <div className="BookAnAppointment">
      {/* Speciality wise list starts */}
      <div className="Speciality-wise-cards bg-custom-graybg">
        {/* Breadcrumb starts */}
        <div className="p-8">
          <Breadcrumb aria-label="Default breadcrumb example">
          <Link to="/patientlogin">
          <BreadcrumbItem icon={HiHome}>
              Home
            </BreadcrumbItem>
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
        <div className="justify-center align-middle grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 lg:p-5 py-5">
          {specialityCard && specialityCard.length > 0 ? (
            specialityCard.map((card, index) => (
              <ConsultCard
                key={index}
                specialityImg={card.serviceImg}
                specialityName={card.name}
                specialityServiceId={card.serviceId}
                specialityRate={card.price}
              />
            ))
          ) : (
            <div>No speciality services available.</div>
          )}
        </div>
      </div>
      {/* Speciality wise list ends */}

      {/* Common Health Concerns starts */}
      <div className="Speciality-wise-cards bg-custom-graybg">
        <div className="heading font-bold text-gray-700 text-4xl flex justify-center align-middle p-5">
          Common Health/Physio Concerns
        </div>
        <div className="heading text-gray-700 text-xl flex justify-center align-middle p-1">
          Consult a physiotherapist online for any health issue
        </div>
        <div className="justify-center align-middle grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 lg:p-5 py-5">
          {commonHealthCard && commonHealthCard.length > 0 ? (
            commonHealthCard.map((card, index) => (
              <ConsultCard
                key={index}
                specialityImg={card.serviceImg}
                specialityName={card.name}
                specialityServiceId={card.serviceId}
                specialityRate={card.price}
              />
            ))
          ) : (
            <div>No common health services available.</div>
          )}
        </div>
      </div>
      {/* Common Health Concerns ends */}
    </div>
  );
};

export default BookAnAppointment;
