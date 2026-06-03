"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
const Clients = ({ sub = true, title = "Chosen by Disruptors, Designed for Greatness" }) => {

  const clientLogos = [
    "",
    "/images/clients/client-logo-priority1.jpg",
    "/images/clients/client-logo-priority2.jpg",
    "/images/clients/client-logo-priority3.jpg",
    "/images/clients/client-logo-priority4.jpg",
    "/images/clients/client-logo-priority5.jpg",
    "/images/clients/client-logo-priority6.jpg",
    "/images/clients/client-logo-priority7.jpg",
    "",
    "/images/clients/client-logo-priority8.jpg",
    "/images/clients/client-logo-priority9.png",
    "",
    "/images/clients/client-logo-priority10.png",
    "/images/clients/client-logo-priority11.png",
    "/images/clients/client-logo-priority12.jpg",
    "/images/clients/client-logo-priority13.png",
    "/images/clients/client-logo-priority14.png",
    "/images/clients/client-logo-priority15.jpg",
    "/images/clients/client-logo-priority16.png",
    "/images/clients/client-logo-priority17.png",
  ];

  // Group items into rows (3 per row)
  const rows = [];
  for (let i = 0; i < clientLogos.length; i += 5) {
    rows.push(clientLogos.slice(i, i + 5));
  }

  useEffect(() => {
    const emptyItems = document.querySelectorAll(".empty-logo");

    emptyItems.forEach((item) => {
      const text = item.querySelector(".hover-text");
      let textIndex = 0;
      const texts = ["What's next?", "It's you", "Let's talk!"];
      let timeline = gsap.timeline({ paused: true });

      texts.forEach((word, i) => {
        timeline.to(text, {
          y: -40,
          opacity: 0,
          duration: 0,
          ease: "power2.out",
          onComplete: () => {
            text.innerText = texts[i]; // Cycle text
            gsap.set(text, { y: 40, opacity: 0 }); // Reset position
          },
        });

        timeline.to(text, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
        timeline.to(text, {}, "+=1.2"); // Hold for 1.5 sec before next change
      });

      item.addEventListener("mouseenter", () => {
        timeline.restart(); // Start cycling animation
      });

      item.addEventListener("mouseleave", () => {
        timeline.pause(); // Pause cycling animation
        gsap.to(text, {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            text.innerText = "What next?"; // Reset to "Hello"
            gsap.set(text, { y: 10, opacity: 0 });
          },
        });
      });
    });
  }, []);

  return (
    <div className="clients">
      <div className="cmpad py-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-4xl font-bold py-3">{title}</h2>
          {sub && <p className="text-gray-300 text-md sm:text-xl mt-2 py-3">Leading brands trust us to break barriers and redefine success.</p>}
        </div>

        {/* Render each row separately with its own animation */}
        <div className="flex flex-col gap-6">
          {rows.map((row, rowIndex) => {
            const rowRef = useRef(null);
            const isInView = useInView(rowRef, { once: true, margin: "-50px" });

            return (
              <motion.ul
                ref={rowRef}
                key={rowIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid grid-cols-3 gap-6 justify-items-center ">
                {row.map((item, index) => {
                  if (item.length > 0) {
                    return (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group cursor-pointer">
                        <img src={item} alt="" className="w-32 h-16 object-contain group-hover:scale-125 transition-transform duration-500" />
                      </motion.li>
                    );
                  } else {
                    return (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group cursor-pointer empty-logo">
                        <p className="hover-text text-black text-4xl opacity-0 max-w-[90px] "></p>
                      </motion.li>
                    );
                  }
                })}
              </motion.ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Clients;
