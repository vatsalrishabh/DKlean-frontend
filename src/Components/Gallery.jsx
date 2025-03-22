import React from "react";
import "tailwindcss/tailwind.css";

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIza6OqzpDtIFF-bmnI5zycYhuRrYl5plFQA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIMDmct-hBdS1q-uivEmIKdRG2mdjNvpnA6Q&s",
  "https://c1.wallpaperflare.com/preview/352/558/383/various-doctor-hospital-medical.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIza6OqzpDtIFF-bmnI5zycYhuRrYl5plFQA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIMDmct-hBdS1q-uivEmIKdRG2mdjNvpnA6Q&s",
  "https://c1.wallpaperflare.com/preview/352/558/383/various-doctor-hospital-medical.jpg",
];

const Gallery = () => {
  return (
    <div className="relative bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-light.png')" }}>
      <div className="p-6 max-w-6xl mx-auto backdrop-blur-sm bg-white/60 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 bg-white"
            >
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
