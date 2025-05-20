import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import SummarizeIcon from '@mui/icons-material/Summarize';
import CloseIcon from '@mui/icons-material/Close';

const maroon = '#800000';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',       // Limit modal height
  display: 'flex',
  flexDirection: 'column',
};

export default function MonthlySummaryModal({ open, onClose, data }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="monthly-summary-title"
      aria-describedby="monthly-summary-description"
      closeAfterTransition
    >
      <Box sx={style} role="dialog" aria-modal="true" aria-label="Monthly donation summary modal">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography id="monthly-summary-title" variant="h6" component="h2" sx={{ color: maroon }}>
            Monthly Donation Summary
          </Typography>
          <IconButton onClick={onClose} sx={{ color: maroon }} aria-label="Close summary modal">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          id="monthly-summary-description"
          sx={{ overflowY: 'auto', flexGrow: 1, pr: 1 }}  // scrollable content
        >
          {data.map(({ month, successful, pending, total }) => (
            <Box
              key={month}
              sx={{
                border: `1px solid ${maroon}`,
                borderRadius: 2,
                p: 2,
                mb: 2,
                backgroundColor: '#fff0f0',
              }}
              aria-label={`Summary for month ${month}`}
            >
              <Typography variant="subtitle1" fontWeight="bold" mb={1} color={maroon}>
                {month}
              </Typography>

              <Box display="flex" alignItems="center" mb={1}>
                <CheckCircleIcon sx={{ color: maroon, mr: 1 }} aria-hidden="true" />
                <Typography>Successful: ₹{successful?.toLocaleString()}</Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={1}>
                <HourglassEmptyIcon sx={{ color: maroon, mr: 1 }} aria-hidden="true" />
                <Typography>Pending: ₹{pending?.toLocaleString()}</Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={1}>
                <SummarizeIcon sx={{ color: maroon, mr: 1 }} aria-hidden="true" />
                <Typography>Total: ₹{total?.toLocaleString()}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: maroon,
              '&:hover': {
                backgroundColor: '#660000',
              },
              color: 'white',
              px: 4,
            }}
            aria-label="Close summary modal button"
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
