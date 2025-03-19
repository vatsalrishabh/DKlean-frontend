import { Carousel } from "@material-tailwind/react";

export default function Slider() {
  return (
    <Carousel autoplay loop className="xl">
      <img
        src="https://chestermeremedicalclinic.com/wp-content/uploads/slider/cache/fb39997792b813bd00cbdcd0c6b1233f/doctor-slider.jpg"
        alt="Image 1"
        className="lg:h-[70vh] w-full object-cover"
      />
      <img
        src="https://medical.lmu.edu.ng/wp-content/uploads/sites/33/2017/08/slider-1.jpg"
        alt="Image 2"
        className="lg:h-[70vh] w-full object-cover"
      />
      <img
        src="https://www.drdijeshshah.com/images/slider/slider1.jpg"
        alt="Image 3"
        className="lg:h-[70vh] w-full object-cover"
      />
    </Carousel>
  );
}
