import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";


const FinalSelect = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const serviceFromRedux = useSelector(state=>state.service);
  const navigate = useNavigate();

  const handleBookClick = (doctor) => {
    console.log({
      blocked:props.blocked,
      date: props.date,
      time: props.time,
      bookingId: doctor.bookingId,
      doctorId: doctor.doctorId,
      doctorName: doctor.doctorName,
      bookedBy: "CurrentUserId", 
      serviceFromRedux , // this the servive id name and price for the service selected
    });

    localStorage.setItem('paymentData', JSON.stringify({
        date: props.date,                // Ensure props.date has a valid value
        time: props.time,                // Ensure props.time has a valid value
        bookingId: doctor.bookingId,     // Ensure doctor.bookingId is defined
        doctorId: doctor.doctorId,       // Ensure doctor.doctorId is defined
        doctorName: doctor.doctorName,   // Ensure doctor.doctorName is defined
        serviceFromRedux ,
        bookedBy: "Anonymous", // Replace with actual user ID; fallback to "Anonymous"
      }));

      navigate("/patient/payment");
  };
   

  // Media query for mobile devices (small screens)
  const isMobile = useMediaQuery("(max-width:600px)");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%", // Adjusted width for small screens
    maxWidth: "500px",
    bgcolor: "background.paper",
    border: "1px solid #ccc",
    boxShadow: 24,
    borderRadius: "12px",
    p: 2,
  };
// console.log(props.doctors)

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#8f1b1b",
          "&:hover": {
            backgroundColor: "#a33232",
          },
          fontSize: isMobile ? "0.8rem" : "1rem", // Smaller font size on mobile
          padding: isMobile ? "8px 16px" : "10px 20px", // Adjust padding for mobile
        }}
        onClick={handleOpen}
      >
        View Slot Details
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              textAlign="center"
              gutterBottom
              sx={{
                fontSize: isMobile ? "1.25rem" : "1.5rem", // Larger title for desktops, smaller for mobile
              }}
            >
              Slot Details
            </Typography>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <EventIcon color="primary" />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body1">
                  <strong>Date:</strong> {props.date}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <AccessTimeIcon color="primary" />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body1">
                  <strong>Time:</strong> {props.time}
                </Typography>
              </Grid>
            </Grid>

            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Doctors & Availability
              </Typography>

              {props.doctors.map((doc,index) => (
          <div key={doc.bookingId || index}  className={doc.blocked?`hidden ${index}`:" "} >
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  key={doc.bookingId}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    mb: 2,
                    p: 1.5,
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Name:</strong> {doc.doctorName}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="center">
                    {doc.status === "available" && (
                      <CheckCircleOutlineIcon color="success" />
                    )}
                    {doc.status === "notavailable" && (
                      <CancelIcon color="error" />
                    )}
                    {doc.status === "booked" && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                      >
                        Booked
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                      background:"#8f1b1b",
                        minWidth: "60px",
                        maxWidth: "100px",
                        fontSize: isMobile ? "0.75rem" : "0.9rem", // Smaller font size on mobile
                        padding: isMobile ? "6px 12px" : "8px 16px", // Adjust padding for mobile
                      }}
                      disabled={doc.status !== "available"}
                      onClick={() => handleBookClick(doc)}
                    >
                      Book
                    </Button>
                  </Grid>
                </Grid>
          </div>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Modal>
    </div>
  );
};

export default FinalSelect;
