import { useEffect, useState } from "react";

export function Caraousal() {
    const imgSrc = [
        "https://medi-pedia.com/wp-content/uploads/2016/08/medical-hd-photo-1080p-hdwallwide.com_.jpg",
        "https://img.freepik.com/premium-photo/doctor-hold-icon-health-electronic-medical-record-interface-digital-healthcare-network_34200-712.jpg",
        "https://img.freepik.com/premium-photo/healthcare-medical-concept-medicine-doctor-with-stethoscope-hand-patients-come_34200-313.jpg"
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Set up an interval to change the image every 3 seconds
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % imgSrc.length);
        }, 3000); // 3000ms = 3 seconds

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [imgSrc.length]);

    return (
        <div className="h-[50vh] w-full flex items-center justify-center overflow-hidden">
            <img 
                src={imgSrc[activeIndex]} 
                alt={`Image ${activeIndex}`} 
                className="w-full h-full object-cover"
            />
             
        </div>
    );
}
