import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import aboutImage from "./images/background.png";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const controls = useAnimation(); // Animation controls

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
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

  useEffect(() => {
    if (isVisible) {
      controls
        .start({
          opacity: 1,
          x: 0,
          transition: { duration: 1 },
        })
        .then(() => {
          // Apply floating animation after the initial animation
          controls.start({
            y: [0, -10, 0], // Move vertically between 0 and -10px
            x: [0, 10, 0], // Move horizontally between 0 and 10px
            transition: {
              repeat: Infinity,
              repeatType: "mirror",
              duration: 4, // Duration of one complete float cycle
            },
          });
        });
    } else {
      controls.start({ opacity: 0, x: -100 });
    }
  }, [isVisible, controls]);

  return (
    <div
      id="aboutus"
      ref={ref}
      className="flex flex-col md:flex-row items-center justify-center h-screen p-4 md:p-8"
    >
      {/* Image on the left */}
      <motion.div
        className="md:w-1/2 w-full h-full flex justify-center mb-4 md:mb-0"
        initial={{ opacity: 0, x: -100 }}
        animate={controls} // Use animation controls
      >
        <img
          src={aboutImage}
          alt="About Us"
          className="w-full md:w-3/4 h-auto object-cover rounded-lg"
        />
      </motion.div>

      {/* Text on the right */}
      <motion.div
        className="md:w-1/2 w-full p-4 flex flex-col justify-center text-center md:text-left"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 100 }}
        transition={{ duration: 1 }}
      >
        <h1
          className="text-4xl text-black font-bold mb-4"
          style={{
            fontFamily: "Times New Roman",
            fontWeight: "900",
            textAlign: "center",
            marginBottom: "80px",
          }}
        >
          About Us
        </h1>
        <p
          className="text-lg text-gray-700"
          style={{
            fontFamily: "Times New Roman",
            fontWeight: "500",
          }}
        >
          We are dedicated to helping you manage your tasks with ease. Our goal
          is to make sure you can stay organized and stress-free while tracking
          all your important to-dos. Stay productive with our comprehensive task
          management tools!
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
