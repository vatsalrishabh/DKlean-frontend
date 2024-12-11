import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel, Badge } from '@mui/material';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TimeSlots = (props) => {
  // Sample data for time slots and availability
  const data = {
    date: '12-12-2024',
    slots: [
      {
        bookingId: 'slot1',
        time: '09:00 AM to 09:30 AM',
        doctors: [
          { doctorId: 'doc1', status: 'booked' },
          { doctorId: 'doc2', status: 'booked' },
        ],
        bookedBy: 'patient1',
        bookedOn: '12-12-2024',
      },
      {
        bookingId: 'slot2',
        time: '10:00 AM to 10:30 AM',
        doctors: [
          { doctorId: 'doc1', status: 'not available' },
          { doctorId: 'doc2', status: 'available' },
        ],
        bookedBy: 'NA',
        bookedOn: 'NA',
      },
      {
        bookingId: 'slot3',
        time: '11:00 AM to 11:30 AM',
        doctors: [
          { doctorId: 'doc1', status: 'available' },
          { doctorId: 'doc2', status: 'available' },
        ],
        bookedBy: 'NA',
        bookedOn: 'NA',
      },
    ],
  };

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [bookedBy, setBookedBy] = useState('loggedInUserId');

  // Function to get the color based on doctor status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <Badge color="success" variant="dot" />;
      case 'not available':
        return <Badge color="error" variant="dot" />;
      case 'booked':
        return <Badge color="gray" variant="dot" />;
      default:
        return <Badge color="default" />;
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setOpenDialog(true);
  };

  const handleBook = () => {
    if (selectedDoctor) {
      console.log({
        bookedBy,
        date: data.date,
        timeSlot: selectedSlot.time,
        doctor: selectedDoctor,
      });
      setOpenDialog(false);
    } else {
      alert('Please select a doctor.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-xl font-semibold mb-6">
        Available Time Slots for {props.selectedDate || data.date}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.slots.map((slot) => (
          <div key={slot.bookingId} className="bg-white p-4 rounded-lg shadow-md">
            <div
              className={`cursor-pointer p-4 border-2 rounded-lg ${
                slot.bookedBy === 'NA' ? 'border-blue-500' : 'border-gray-300'
              }`}
              onClick={() => handleSlotClick(slot)}
            >
              <div className="font-bold text-lg">{slot.time}</div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        onClose={() => setOpenDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Select a Doctor</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="doctor-select-label" className="p-3">
              Select Doctor
            </InputLabel>
            <Select
              labelId="doctor-select-label"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              label="Select Doctor"
            >
              {selectedSlot &&
                selectedSlot.doctors.map((doctor) => (
                  <MenuItem key={doctor.doctorId} value={doctor.doctorId}>
                    <div className="flex justify-between items-center">
                      <span>{doctor.doctorId}</span>
                      {getStatusBadge(doctor.status)}
                    </div>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBook} color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TimeSlots;
