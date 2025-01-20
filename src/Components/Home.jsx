import React, { useEffect, useState } from "react";
import image6 from "../assets/home/image6.webp";
import image7 from "../assets/home/image7.webp";
import "./Chatbot.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Animation from "./HomePage/Animation";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [bg, setBg] = useState([image6, image7]);
  const [currentImage, setCurrentImage] = useState(bg[0]); // Set initial background image
  const [animationDirection, setAnimationDirection] = useState(null); // To store animation direction

  // Function to change the background image with animation
  const changeImage = (direction) => {
    setAnimationDirection(direction);
    setCurrentImage((prevImage) => {
      if (direction === "left") {
        return prevImage === bg[0] ? bg[1] : bg[0];
      } else {
        return prevImage === bg[1] ? bg[0] : bg[1];
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationDirection("right"); // Animation direction for auto-transition
      setCurrentImage((prevImage) => (prevImage === bg[0] ? bg[1] : bg[0]));
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [bg]);

  return (
    <div className="Home bg-white">
      {/* Background with Animated Content */}
      <div
        className={`img-container h-[90vh] bg-cover bg-center w-full flex justify-between items-center relative ${
          animationDirection === "left"
            ? "slideLeft"
            : animationDirection === "right"
            ? "slideRight"
            : ""
        }`}
        style={{ backgroundImage: `url(${currentImage})` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Arrow */}
        <div
          className={`leftArrow grid place-content-center cursor-pointer bg-white rounded-full p-2 md:ml-8 ml-2 transition-transform duration-500 ${
            isHovered
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          }`}
          onClick={() => changeImage("left")}
        >
          <ArrowBackIcon
            sx={{ color: "black", fontSize: 30 }}
            className="hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Animated Text and Buttons */}
        <div className="lg:w-2/5 md:w-3/5 sm:w-4/5 w-full text-center space-y-4 px-4">
          {/* First Line Animation */}
          <div className="animate-fade-in-down">
            <h1 className="text-white text-base md:text-xl font-medium">
              FEEL THE DIFFERENCE WITH US.
            </h1>
          </div>

          {/* Second Line Animation */}
          <div className="animate-fade-in-down delay-[400ms]">
            <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
              Your Health Is Our Priority.
            </h1>
          </div>

          {/* Buttons Animation */}
          <div className="flex justify-center gap-2 sm:gap-4 mt-6 animate-fade-in-up delay-[800ms] flex-wrap">
            <button className="bg-[#6d0101] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-md text-xs sm:text-sm font-semibold hover:bg-black hover:scale-105 transition duration-300">
              Book An Appointment
            </button>
            <button className="bg-transparent backdrop-blur-md border border-white text-white px-4 sm:px-6 py-3 sm:py-4 rounded-md text-xs sm:text-sm font-semibold hover:bg-white hover:text-black hover:scale-105 transition duration-300">
              Our Services
            </button>
          </div>
        </div>

        {/* Right Arrow */}
        <div
          className={`rightArrow grid place-content-center cursor-pointer bg-white rounded-full p-2 md:mr-8 mr-2 transition-transform duration-500 ${
            isHovered ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
          onClick={() => changeImage("right")}
        >
          <ArrowForwardIcon
            sx={{ color: "black", fontSize: 30 }}
            className="hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Animation Section */}
      <div className="w-full">
        <div className="pb-2 pt-1">
          <Animation />
        </div>
      </div>
    </div>
  );
};

export default Home;
