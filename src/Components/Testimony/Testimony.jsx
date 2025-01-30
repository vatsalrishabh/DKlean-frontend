import React, { useState } from "react";
import testimonybg from "../../assets/home/testimony.webp";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "animate.css";

const testimonials = [
  {
    text: "It’s been an absolute pleasure to work with Hope. Their response to our brief exceeded expectations, and the execution was efficient, professional, and very reassuring. I’d fully recommend them.",
    name: "John Doe",
    address: "CEO, Example Inc.",
    image: "https://qph.cf2.quoracdn.net/main-qimg-545bed00c6e452fadbd2bc03941b7d72-lq",
  },
  {
    text: "Working with this team was a fantastic experience! The delivery was on point, and their professionalism was unmatched.",
    name: "Jane Smith",
    address: "Manager, Business Co.",
    image: "https://i.pinimg.com/564x/24/47/d9/2447d9d84433f038fc50632875128601.jpg",
  },
];

const Testimony = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState("animate__fadeIn"); // Initial animation class

  const changeImage = (direction) => {
    setAnimation("animate__fadeOut"); // Trigger fade-out animation

    setTimeout(() => {
      // Change index after the fade-out animation
      if (direction === "left") {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
      } else {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
      }
      setAnimation("animate__fadeIn"); // Trigger fade-in animation
    }, 500); // Match the duration of the fade-out animation
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div
    className=" relative Testimony h-[100vh] flex flex-col md:flex-row justify-center items-center text-center px-4"
    style={{ backgroundImage: `url(${testimonybg})`, backgroundSize: "cover", backgroundPosition: "center" }}
  >
    {/* Left Arrow */}
    <div
      className="leftArrow grid place-content-center cursor-pointer bg-white rounded-full p-4 md:ml-10 ml-2 md:mb-0 mb-4 transition-transform duration-500 shadow-lg"
      aria-label="Previous Testimonial"
      onClick={() => changeImage("left")}
      style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }}
    >
      <ArrowBackIosIcon
        sx={{ color: "black", fontSize: 30 }}
        className="hover:scale-125 transition-transform duration-300"
      />
    </div>
  
    {/* Testimonial Content */}
    <div className={`mid max-w-3xl animate__animated ${animation} px-4`}>
      <h2 className="text-lg mb-4 text-[#999999]">Testimonial</h2>
      <div className="text-2xl mb-6 flex flex-col md:flex-row align-middle justify-center">
        <div className="pr-2 text-5xl font-bold text-[#8f1b1b]">Trusted</div>
        <div className="pl-2 text-5xl">by Our Clients</div>
      </div>
  
      <div className="client images rounded-full overflow-hidden w-28 h-28 md:w-36 md:h-36 mx-auto mb-4 shadow-lg">
        <img src={currentTestimonial.image} alt={`${currentTestimonial.name}'s photo`} />
      </div>
  
      <blockquote className="testimony text-lg md:text-xl italic text-gray-700 mb-4">
        “{currentTestimonial.text}”
      </blockquote>
  
      <div className="name-address text-gray-900">
        <h3 className="font-semibold text-xl md:text-2xl">{currentTestimonial.name}</h3>
        <p className="text-base md:text-lg">{currentTestimonial.address}</p>
      </div>
    </div>
  
    {/* Right Arrow */}
    <div
      className="rightArrow grid place-content-center cursor-pointer bg-white rounded-full p-4 md:mr-10 mr-2 md:mb-0 mb-4 transition-transform duration-500 shadow-lg"
      aria-label="Next Testimonial"
      onClick={() => changeImage("right")}
      style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)" }}
    >
      <ArrowForwardIosIcon
        sx={{ color: "black", fontSize: 30 }}
        className="hover:scale-125 transition-transform duration-300"
      />
    </div>
  </div>
  
  );
};

export default Testimony;
