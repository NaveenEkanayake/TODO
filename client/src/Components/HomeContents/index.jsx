import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Video from "./Videos/HomeVideo.mp4";

const HomeContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Reset visibility if it goes out of view
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div id="home" className="block relative h-screen w-full" ref={ref}>
      {/* Video */}
      <video
        className="absolute top-0 left-0 h-full w-full object-cover"
        src={Video}
        autoPlay
        loop
        muted
        style={{ filter: "brightness(0.5)" }}
      ></video>
      {/* Heading */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <motion.h1
          className="text-white text-[50px] text-center font-newfont"
          style={{
            fontFamily: "Times New Roman",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: isVisible ? 0 : 50, opacity: isVisible ? 1 : 0 }} // Adjust based on visibility
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Stress Less, Track More: Manage Your Ongoing Tasks Here
        </motion.h1>
      </div>
    </div>
  );
};

export default HomeContent;
