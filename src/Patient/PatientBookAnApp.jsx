import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../PricingAndCart/Card";
import { BaseUrl } from "../Components/BaseUrl";

const BloodTest = ({ specialityCard }) => {
  return (
    <>
      <div className="heading font-bold text-gray-700 text-4xl flex justify-center align-middle p-5">
        Blood Tests
      </div>
      <div className="heading text-gray-700 text-xl flex justify-center align-middle p-1">
        Book your test now
      </div>
      <div className="justify-center align-middle grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:p-5 py-5">
        {specialityCard.length > 0 ? (
          specialityCard.map((card, index) => (
            <div className="py-2 flex justify-center " key={index}>
              <Card
                serviceId={card.serviceId}
                name={card.name}
                price={`₹${card.price}`}
                description="Provides essential health services."
                discount="10% off"
              />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No blood tests available.</div>
        )}
      </div>
    </>
  );
};

const Physio = ({ commonHealthCard }) => {
  return (
    <>
      <div className="Speciality-wise-cards bg-custom-graybg">
        <div className="heading font-bold text-gray-700 text-4xl flex justify-center align-middle p-5">
          Physio Concerns
        </div>
        <div className="heading text-gray-700 text-xl flex justify-center align-middle p-1">
          Consult a physiotherapist online for any health issue
        </div>
        <div className="justify-center align-middle grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:p-5 py-5">
          {commonHealthCard.length > 0 ? (
            commonHealthCard.map((card, index) => (
              <div className="py-2 flex justify-center " key={index}>
                <Card
                  serviceId={card.serviceId}
                  name={card.name}
                  price={`₹${card.price}`}
                  description="Provides essential health services."
                  discount="10% off"
                />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No physiotherapy services available.</div>
          )}
        </div>
      </div>
    </>
  );
};

const PatientBookAnApp = () => {
  const [specialityCard, setSpecialityCard] = useState([]);
  const [commonHealthCard, setCommonHealthCard] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const location = useLocation(); // Hook to get current route

  // Load user details from local storage
  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setLoggedInUser(JSON.parse(storedUserDetails));
    }
  }, []);

  // Fetch data from API when JWT is available
  useEffect(() => {
    if (!loggedInUser.jwt) {
      console.error("No JWT found in loggedInUser");
      return;
    }

    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/services/getAllServices`, {
          headers: {
            Authorization: `Bearer ${loggedInUser.jwt}`,
          },
        });

        const { data } = response.data;

        if (data && data.length > 0) {
          setSpecialityCard(data.filter((service) => service.category === "blood"));
          setCommonHealthCard(data.filter((service) => service.category === "Physio"));
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [loggedInUser]);

  return (
    <>
      {location.pathname === "/bookbloodtest" ? (
        <BloodTest specialityCard={specialityCard} />
      ) : location.pathname === "/bookphysio" ? (
        <Physio commonHealthCard={commonHealthCard} />
      ) : (
        <div className="text-center text-gray-500">Please select a valid category.</div>
      )}
    </>
  );
};

export default PatientBookAnApp;
