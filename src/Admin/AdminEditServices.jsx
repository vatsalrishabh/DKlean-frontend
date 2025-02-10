import React, { useEffect, useState } from 'react';
import EditCard from '../PricingAndCart/EditCard';
import { BaseUrl } from '../Components/BaseUrl';
import axios from 'axios';
import { BreadCrumb } from '../Components/DoctorDashboard/BreadCrumb';

const AdminEditServices = () => {
  const [physioCard, setPhysioCard] = useState([]);
  const [bloodCard, setBloodCard] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("adminDetails"); 
    if (storedUserDetails) {
      setLoggedInUser(JSON.parse(storedUserDetails));
      // console.log(storedUserDetails);
    
    }
  }, []);

  // Fetch data from API when JWT is available
  useEffect(() => {
    if (!loggedInUser || !loggedInUser.jwt) {
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
          const filteredBloodServices = data.filter(service => service.category === "blood");
          const filteredPhysioServices = data.filter(service => service.category === "Physio");

          setBloodCard(filteredBloodServices);
          setPhysioCard(filteredPhysioServices);
        } else {
          console.log("No services available.");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [loggedInUser]);
  const addNewService = async () => {
    // Check if JWT is available
    if (!loggedInUser || !loggedInUser.jwt) {
      console.error('JWT is missing');
      return;
    }

    try {
      // Define the service data you want to send
      const serviceData = {
        name: 'New Service Name',  // Example data
        price: 100,                // Example data
        description: 'Service description', // Example data
        discount: 10               // Example data
      };
  
      // Make the POST request with the service data in the body
      const response = await axios.post(
        `${BaseUrl}/api/services/postNewService`,
        serviceData,  // Send the actual service data
        {
          headers: {
            Authorization: `Bearer ${loggedInUser.jwt}`,  // Add the JWT for authentication
          },
        }
      );
  
      // Handle the response if successful
      if (response.data.success) {
        console.log('Service added:', response.data);
        // Optionally, refresh the services list or add the new service to state
        setBloodCard(prev => [...prev, response.data.newService]);
        setPhysioCard(prev => [...prev, response.data.newService]);
      } else {
        console.log('Failed to add service:', response.data.message);
      }
  
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };
  
  

  return (
    <div className="AdminEditServices w-full px-6 py-8">
   <BreadCrumb first="Admin Dashboard" firstLink="/adminlogin"  second="Edit Services" secondLink="/admin/bookAp" />
   <div className='w-full flex justify-end'>
   <button onClick={addNewService} className='px-6 py-2 bg-[#8f1b1b] text-white rounded-lg hover:bg-[#a22d2d] transition-all duration-300 2/6'>Add new Service</button>
   </div>

      <div className="service-section mb-12">
        {/* Blood Services Section */}
        <h2 className="text-3xl font-semibold text-[#8f1b1b] mb-6">Blood Services</h2>
        <div className="blood-services grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bloodCard.length > 0 ? (
            bloodCard.map(service => (
              <EditCard
                key={service.serviceId}  // Ensure using _id consistently
                serviceId={service.serviceId} 
                initialName={service.name}
                initialPrice={service.price}
                initialDescription={service.description || "No description available"}
                initialDiscount={service.discount || ""}
                onDelete={() => console.log("Delete service", service._id)}
                onUpdate={(updatedService) => console.log("Update service", updatedService)}
                jwt={loggedInUser.jwt}
              />
            ))
          ) : (
            <p className="text-gray-500">No Blood services available at the moment.</p>
          )}
        </div>
      </div>

      <div className="service-section">
        {/* Physio Services Section */}
        <h2 className="text-3xl font-semibold text-[#8f1b1b] mb-6">Physio Services</h2>
        <div className="physio-services grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {physioCard.length > 0 ? (
            physioCard.map(service => (
              <EditCard
                key={service.serviceId}  // Ensure using _id consistently
                initialName={service.name}
                initialPrice={service.price}
                initialDescription={service.description || "No description available"}
                initialDiscount={service.discount || ""}
                onDelete={() => console.log("Delete service", service._id)}
                onUpdate={(updatedService) => console.log("Update service", updatedService)}
                serviceId={service.serviceId}
                jwt={loggedInUser.jwt}
              />
            ))
          ) : (
            <p className="text-gray-500">No Physio services available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEditServices;
