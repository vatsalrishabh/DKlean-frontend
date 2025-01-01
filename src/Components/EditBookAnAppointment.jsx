import React, { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import EditConsultCard from "./EditConsultCard";
import axios from "axios";
import { BaseUrl } from "./BaseUrl";

const EditBookAnAppointment = () => {
  const [specialityCard, setSpecialityCard] = useState([]);
  const [commonHealthCard, setCommonHealthCard] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});

  

  useEffect(() => {
    // Load user details from local storage immediately
    const loadUserDetails = () => {
      const storedUserDetails = localStorage.getItem("adminDetails");
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
      if (!loggedInUser.isloggedIn) {
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
          const specialityServices = data.filter(
            (service) => service.category === "physio"
          );
          const commonHealthServices = data.filter(
            (service) => service.category !== "physio"
          );

          setSpecialityCard(specialityServices);
          setCommonHealthCard(commonHealthServices);
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
            <BreadcrumbItem href="/" icon={HiHome}>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem>Book an appointment</BreadcrumbItem>
          </Breadcrumb>
        </div>
        {/* Breadcrumb ends */}

        <div className="heading font-bold text-gray-700 text-4xl flex justify-center align-middle p-5">
          25+ Specialities
        </div>
        <div className="heading text-gray-700 text-xl flex justify-center align-middle p-1">
          Consult with top doctors across specialities
        </div>
        <div className="justify-center align-middle grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 lg:p-5 py-5">
          {specialityCard && specialityCard.length > 0 ? (
            specialityCard.map((card, index) => (
              <EditConsultCard
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
          Common Health Concerns
        </div>
        <div className="heading text-gray-700 text-xl flex justify-center align-middle p-1">
          Consult a doctor online for any health issue
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
            <div><EditConsultCard/></div>
          )}
        </div>
      </div>
      {/* Common Health Concerns ends */}
    </div>
  );
};

export default EditBookAnAppointment;
