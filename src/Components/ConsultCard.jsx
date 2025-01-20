import { useState,useEffect } from "react";
import { Card } from "flowbite-react";



export default function ConsultCard(props) {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      // console.log(userDetails);
      // console.log(loggedInUser.isloggedIn);
      setLoggedInUser(userDetails);
    }
  }, []);

  const handleBookAppointment = () => {
  
    const url = `/schedulepage`; // Replace with your desired URL
    const width = 1000;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      url,
      'popup',
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
  };

  return (
    <div  className="p-3">
       <Card
          className="max-w-sm"
          imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
          imgSrc={props.specialityImg}
        >
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.specialityName}
            </h5>
          </a>
          <div>
            Service ID: {props.specialityServiceId}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{props.specialityRate}</span>
            <div
              onClick={handleBookAppointment}

              className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
            Consult
            </div>
          </div>
        </Card>
    </div>
     
  );
}
