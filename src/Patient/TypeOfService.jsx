import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { Link } from "react-router-dom";

const services = [
  {
    title: 'Physiotherapy',
    description: 'Pain relief and better mobility through physiotherapy',
    imageUrl: 'https://regencyhealthcare.in/wp-content/uploads/2018/06/How-physiotherapy-can-help-with-pain-relief-and-better-mobility-1-1200x800.png',
    link: "/bookphysio",
  },
  {
    title: 'Blood Test',
    description: 'Comprehensive blood tests for accurate diagnosis',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9nu9n8oKCQlKsBHFSczSVrR-qXPEeSOFnaA&s',
    link: "/bookbloodtest",
  },
];

const TypeOfService = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-blue-gray-50">
      {/* Title */}
      <div className='lg:pb-10 pb-5'>
        <Typography
          variant="h4"
          className="font-extrabold text-4xl text-center text-custom-maroon hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 mb-8"
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Add text shadow for a glowing effect
          }}
        >
          Services We Offer
        </Typography>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <Card
            key={index}
            className="w-[400px] h-[500px] bg-cover bg-center shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            style={{ backgroundImage: `url(${service.imageUrl})` }}
          >
            <Box className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-end p-6 rounded-lg">
              {/* Service Title */}
              <Typography variant="h5" className="text-white font-semibold text-2xl mb-2">
                {service.title}
              </Typography>

              {/* Service Description */}
              <Typography variant="body1" className="text-white mb-4">
                {service.description}
              </Typography>

              {/* Book Now Button */}
              <Link to={service.link}>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4"
                  style={{
                    backgroundColor: '#f44336', // You can change the button color here
                    padding: '12px 24px',
                    fontSize: '16px',
                  }}
                >
                  Book Now
                </Button>
              </Link>
            </Box>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TypeOfService;
