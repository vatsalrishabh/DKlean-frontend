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

const FinalSelect = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBookClick = (doctor) => {
    console.log({
      date: props.date,
      time: props.time,
      bookingId: doctor.bookingId,
      doctorId: doctor.doctorId,
      doctorName: doctor.doctorName,
      bookedBy: "CurrentUserId", // Replace with actual user ID if available
    });
  };

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

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
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

              {props.doctors.map((doc) => (
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
                      color="secondary"
                      size="small"
                      sx={{
                        minWidth: "60px",
                        maxWidth: "100px",
                        fontSize: "0.8rem",
                      }}
                      disabled={doc.status !== "available"}
                      onClick={() => handleBookClick(doc)}
                    >
                      Book
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Modal>
    </div>
  );
};

export default FinalSelect;
