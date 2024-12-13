import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import CircularProgress from '@mui/material/CircularProgress';
import FinalSelect from "./FinalSelect";

// Custom styled Box component for content styling
const ContentBox = styled(Box)(({
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  marginBottom: "1.5rem",
}));

const TimeSlots = (props) => {
  const [data, setData] = useState([]); // Store all booking data from server
  const [selectedDateData, setSelectedDateData] = useState([]); // Filtered slots for selected date(single)

  // Fetch all booking data on component mount
  useEffect(() => {
    const fetchAllDates = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/bookings/allbookings`);
        if (response.data) {
          setData(response.data.data); // Set data
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchAllDates();
  }, []); // Run once when component mounts

  // Filter slots based on selected date whenever the selected date or data changes
  useEffect(() => {
    const filteredSlots = data.filter(
      (item) => item.date === props.selectedDate // Directly use props.selectedDate
    );
    setSelectedDateData(filteredSlots); // Update filtered slots
    // console.log(selectedDateData+" "+"selected date data")
    // console.log(selectedDateData[0].date+" "+"selected date date")
    // console.log(selectedDateData.doctor+" "+"selected date slots")
  }, [props.selectedDate, data]); // Re-filter when data or selected date changes

  // Handle doctor booking
  const handleBookDoctor = (slotId) => {
    console.log("Booking doctor with slotId:", slotId);
    // API call to book the doctor (use slotId to book a doctor)
  };

  return (
    <div className="container mx-auto px-4 py-8">
   
      {/* Show selected date's available doctors */}
      <h2 className="text-3xl font-semibold text-center mb-6">
        Available Doctors for {props.selectedDate}
      </h2>

      {/* Render the selected date's slots and availability */}
      {selectedDateData.length > 0 ? (
        selectedDateData.map((item) => (
          <ContentBox key={item._id}>
            <div className="pb-5">
              <Typography variant="h6" className="text-xl font-semibold mb-4">
               Date: {item.date}   
              </Typography>
            </div>
            <ul className="space-y-4 overflow-y-auto max-h-96">
              {" "}
              {/* Adjust max-h-96 to your preferred height */}
              {item.slots.map((slot) => (
                <li
                  key={slot._id}
                  className="flex justify-between items-center py-4 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <span className="text-lg font-medium flex justify-between">
                 <div>{slot.time}</div>   <div><FinalSelect time={slot.time} doctors={slot.doctors} date={item.date} /> </div>  
                 </span>
                  
                </li>
              ))}
            </ul>
          </ContentBox>
        ))
      ) : (
        <Typography variant="h6" className="text-red-500 text-center flex justify-center align-middle">
          <CircularProgress color="secondary" size={40} />
        </Typography>
      )}
    </div>
  );
};

export default TimeSlots;
