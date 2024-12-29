import React, { useEffect, useState } from 'react'

const DoctorDashboard = () => {
  const [loggedInDoctor, setLoggedInDoctor] = useState({}); 

  useEffect(()=>{

    // load user details from local storage immediately
    const loadUserDetails = () => {
        const Details = localStorage.getItem('userDetails');
        if (Details) {
          const Details = JSON.parse(Details); //json banao string se
          setLoggedInDoctor(Details); //  const [loggedInUser, setLoggedInUser] = useState({});
        }
      };
      loadUserDetails();
  // loaduserdeails immediatellly

  },[])

  return (
    <div className=''>
        
    </div>
  )
}

export default DoctorDashboard
