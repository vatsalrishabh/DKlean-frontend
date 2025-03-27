import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import FinalSelect from "./FinalSelect";
import UniversalPatientDetails from "../../Patient/UniversalPatientDetails";

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
  const [selectedDateData, setSelectedDateData] = useState([]); // Filtered slots for selected date

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
  }, []);

  // Filter slots based on selected date whenever the selected date or data changes
  useEffect(() => {
    const filteredSlots = data.filter(
      (item) => item.date === props.selectedDate
    );
    setSelectedDateData(filteredSlots);
  }, [props.selectedDate, data]);

  // Get current time in "HH:mm" 24-hour format
  const timeNow = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="container mx-auto px-4 pb-2">
      {/* Show selected date's available doctors */}
      <h2 className="text-3xl text-gray-700 font-semibold text-center mb-1">
        Available Doctors for {props.selectedDate}
      </h2>
      <div>
        <UniversalPatientDetails />
      </div>

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
              {item.slots.map((slot, index) => {
                const slotStartTime = slot.time.split(" - ")[0]; // Extracts start time from "HH:mm - HH:mm"
                return (
                  <li
                    key={`${item._id}-${slot.time}-${slot.doctors?.join("-") || "no-docs"}-${index}`} 
                    className="flex justify-between items-center py-4 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <span className="text-lg w-full font-medium flex justify-between">
                      <div>{slot.time}</div>
                      <div>
                        {
                          slotStartTime > timeNow ? (
                            <FinalSelect
                              time={slot.time}
                              doctors={slot.doctors}
                              date={item.date}
                            />
                          ) : (
                            <>Can not book</>
                          )
                        }
                      </div>
                    </span>
                  </li>
                );
              })}
            </ul>
          </ContentBox>
        ))
      ) : (
        <div className="flex justify-center items-center">
          <CircularProgress sx={{ color: "#8f1b1b" }} size={40} />
          <Typography variant="h6" className="text-red-500 ml-2">
            No available slots for this date
          </Typography>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
