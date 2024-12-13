import React, { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import EditConsultCard from "./EditConsultCard";
import {BaseUrl} from '../Components/BaseUrl'
import axios from "axios";

const EditBookAnAppointment = () => {
    const [physioServices, setPhysioServices] = useState([]);
    const [bloodServices, setBloodServices] = useState([]);

    // Fetch all services on component mount
    const fetchAllServices = async () => {
        try {
            // Fetch the physiotherapy services
            const physioResponse = await axios.get(`${BaseUrl}/api/services/getAllServices`);
            setPhysioServices(physioResponse.data); // Assuming services is the key returned

            
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    // Fetch services when the component is mounted
    useEffect(() => {
        fetchAllServices();
    }, []);

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
                    {physioServices.map((card, index) => (
                        <EditConsultCard
                            key={index}
                            specialityImg={card.specialityImg}
                            specialityName={card.specialityName}
                            specialityServiceId={card.specialityServiceId}
                            specialityRate={card.specialityRate}
                        />
                    ))}
                </div>
            </div>
            {/* Speciality wise list ends */}

            {/* Common Health Concerns list starts */}
            <div className="Speciality-wise-cards bg-custom-graybg">
                <div className="heading font-bold text-gray-700 text-4xl flex justify-center align-middle p-5">
                    Common Health Concerns
                </div>
                <div className="heading text-gray-700 text-xl flex justify-center align-middle p-1">
                    Consult a doctor online for any health issue
                </div>
                <div className="justify-center align-middle grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 lg:p-5 py-5">
                    {bloodServices.map((card, index) => (
                        <EditConsultCard
                            key={index}
                            specialityImg={card.commonHealthImg}
                            specialityName={card.commonHealthName}
                            specialityServiceId={card.commonHealthServiceId}
                            specialityRate={card.commonHealthRate}
                        />
                    ))}
                </div>
            </div>
            {/* Common Health Concerns list ends */}
        </div>
    );
};

export default EditBookAnAppointment;
