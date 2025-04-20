// import s from "../assets/home/bgone.png"

import { Carousel } from "@material-tailwind/react";
import image from "../assets/home/bgone.png"

export default function Slider({ imgArray }) {
 
  return (
    <Carousel autoplay loop className="xl">
      {imgArray.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Image ${index + 1}`}
          className="lg:h-[70vh] w-full "
        />
      ))}
    </Carousel>
  );
}

